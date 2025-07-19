import Hotel from "../models/Hotel.js";
import User from "../models/User.js";

export const registerHotel = async (req, res) => {
  try {
    const { name, address, contact, city } = req.body;
    // FIX: Use req.auth() to get userId
    const { userId } = req.auth();

    if (!userId) {
      return res.status(401).json({ success: false, message: "Authentication required: User ID not found." });
    }
    if (!name || !address || !contact || !city) {
      return res.status(400).json({ success: false, message: "All hotel details (name, address, contact, city) are required." });
    }

    const hotel = await Hotel.findOne({ owner: userId });
    if (hotel) {
      return res.status(409).json({ success: false, message: "Hotel already registered by this user." }); // 409 Conflict
    }

    await Hotel.create({ name, address, contact, city, owner: userId }); // Use userId from Clerk
    await User.findByIdAndUpdate(userId, { role: "hotelOwner" }); // Update user role

    res.status(201).json({ success: true, message: "Hotel registered successfully!" });
  } catch (error) {
    console.error("Hotel registration failed:", error.message || error);
    res.status(500).json({ success: false, message: error.message || "Failed to register hotel due to a server error." });
  }
};