import React from "react";

import HotelCard from "./HotelCard";
import Title from "./Title";

import { useAppContext } from "../context/AppContext";

const FeaturedDestination = () => {
  const {rooms, navigate} = useAppContext();
  

  return rooms.length > 0 && (
    <section className="bg-slate-50 py-20 px-6 md:px-16 lg:px-24 xl:px-32">
      {/* Title */}
      <div className="mb-12">
        <Title
          title="Featured Destinations"
          subTitle="Discover your next unforgettable stay"
        />
      </div>

      {/* Hotel Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
        {rooms.slice(0, 4).map((room, index) => (
          <HotelCard key={room._id} room={room} index={index} />
        ))}
      </div>

      {/* View All Button */}
      <div className="mt-16 flex justify-center">
        <button
          onClick={() => {
            navigate("/rooms");
            scrollTo(0, 0);
          }}
          className="px-5 py-2.5 border border-gray-800 text-sm font-medium text-gray-800 rounded-md hover:bg-gray-800 hover:text-white transition duration-200"
        >
          View All Destinations
        </button>
      </div>
    </section>
  );
};

export default FeaturedDestination;
