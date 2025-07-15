import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
  try {
    // Create a svix instance with Clerk webhook secret
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Get headers
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    // Verify headers and body
    await whook.verify(JSON.stringify(req.body), headers);

    // Get data from request body
    const { data, type } = req.body;

    const userData = {
      _id: data.id,
      email: data.email_addresses[0].email_address,
      username: `${data.first_name} ${data.last_name}`,
      image: data.image_url,
      recentSearchedCities: [], // Initialize as empty array
    };

    console.log("Webhook Event Type:", type);
    console.log("User Data to Save:", userData);

    // Switch cases for different events
    switch (type) {
      case "user.created":
        await User.create(userData);
        console.log("User created successfully");
        break;

      case "user.updated":
        await User.findByIdAndUpdate(data.id, userData, { new: true });
        console.log("User updated successfully");
        break;

      case "user.deleted":
        await User.findByIdAndDelete(data.id);
        console.log("User deleted successfully");
        break;

      default:
        console.log("Unhandled webhook event type:", type);
        break;
    }

    res.json({ success: true, message: "Webhook received and processed" });
  } catch (error) {
    console.error("Error in webhook processing:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export default clerkWebhooks;
