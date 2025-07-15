import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const HotelCard = ({ room, index }) => {
  return (
    <Link
      to={`/rooms/${room._id}`}
      onClick={() => scrollTo(0, 0)}
      className="bg-white rounded-xl shadow-md overflow-hidden w-full max-w-[280px] sm:max-w-[300px] transition-all hover:shadow-lg"
    >
      <div className="relative">
        <img
          src={room.images[0]}
          alt="room"
          className="w-full h-52 object-cover"
        />
        {index % 2 === 0 && (
          <span className="absolute top-3 left-3 bg-white text-xs font-semibold px-3 py-1 rounded-full shadow text-gray-800">
            Best Seller
          </span>
        )}
      </div>

      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-base text-gray-900">
            {room.hotel.name}
          </h3>
          <div className="flex items-center gap-1 text-sm text-orange-500">
            <img src={assets.starIconFilled} alt="star" className="w-4 h-4" />
            <span>4.5</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-sm text-gray-500">
          <img src={assets.locationIcon} alt="location" className="w-4 h-4" />
          <span>{room.hotel.address}</span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <p className="text-gray-800 font-semibold">
            Ksh {room.pricePerNight}
            <span className="text-sm font-normal text-gray-600">/night</span>
          </p>
          <button className="px-4 py-1.5 border border-gray-800 text-gray-800 text-sm rounded-md hover:bg-gray-800 hover:text-white transition">
            Book Now
          </button>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;
