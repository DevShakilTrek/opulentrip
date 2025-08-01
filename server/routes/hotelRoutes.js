import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { registerHotel } from "../controllers/hotelController.js";

const hotelRouter = express.Router();

hotelRouter.post("/register", protect, registerHotel); // Fixed: Changed from GET to POST for registration

export default hotelRouter;
