// Get user data
// GET /api/user/
import User from "../models/User.js"; // Ensure User model is imported

export const getUserData = async (req, res) => {
  try {
    // `req.user` is populated by `protect` middleware, which already uses req.auth() internally.
    // So, no direct change to req.auth() here, but the protect middleware must be up-to-date.
    const { role, recentSearchedCities } = req.user;
    res.json({ success: true, role, recentSearchedCities });
  } catch (error) {
    console.error("Get user data error:", error.message || error);
    res.status(500).json({ success: false, message: error.message || "Failed to fetch user data." });
  }
};

// Store User Recent Searched Cities
// POST /api/user/store-recent-search
export const storeRecentSearchedCities = async (req, res) => {
  try {
    const { recentSearchedCity } = req.body;
    const user = req.user; // `req.user` is populated by `protect` middleware

    if (!recentSearchedCity) {
      return res.status(400).json({ success: false, message: "City is required to store recent search." });
    }

    // Ensure recentSearchedCities is initialized as an array if it's null/undefined
    if (!user.recentSearchedCities) {
      user.recentSearchedCities = [];
    }

    // Add city if not already present and manage array length
    if (!user.recentSearchedCities.includes(recentSearchedCity)) {
        if (user.recentSearchedCities.length >= 3) {
            user.recentSearchedCities.shift(); // Remove oldest
        }
        user.recentSearchedCities.push(recentSearchedCity); // Add newest
    }

    await user.save();
    res.status(200).json({ success: true, message: "Recent searched city updated." });
  } catch (error) {
    console.error("Store recent search error:", error.message || error);
    res.status(500).json({ success: false, message: error.message || "Failed to store recent search." });
  }
};