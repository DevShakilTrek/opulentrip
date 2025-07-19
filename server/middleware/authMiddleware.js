import User from "../models/User.js";

// Middleware to check if user is authenticated
export const protect = async (req, res, next) => {
  try {
    // FIX: Access userId using req.auth() as a function
    const { userId } = req.auth(); 

    if (!userId) {
      // If userId is not available after calling req.auth(), it means the user is not authenticated by Clerk.
      return res.status(401).json({ success: false, message: "Not authenticated. No user ID from Clerk." });
    }

    const user = await User.findById(userId);
    if (!user) {
      // If Clerk authenticates but user not found in your DB (e.g., webhook failed)
      return res.status(404).json({ success: false, message: "User record not found in database." });
    }

    req.user = user; // Attach the full user document to the request object
    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message || error);
    // Clerk errors might also come through here, so be general
    res.status(500).json({ success: false, message: error.message || "Server error during authentication." });
  }
};