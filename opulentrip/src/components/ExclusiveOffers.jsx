import React from "react";
import Title from "./Title";
import { assets, exclusiveOffers } from "../assets/assets";

const ExclusiveOffers = () => {
  return (
    <section className="bg-white pt-20 pb-28 px-6 md:px-16 lg:px-24 xl:px-32">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-6">
        <Title
          align="left"
          title="Exclusive Offers"
          subTitle="Unlock handpicked deals crafted just for you from elegant stays to once-in-a-lifetime experiences, indulge in savings without compromising on style or comfort."
        />
        <button className="group flex items-center gap-2 text-gray-800 font-medium text-sm border-b border-transparent hover:border-gray-800 transition">
          View All Offers
          <img
            src={assets.arrowIcon}
            alt="arrow"
            className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
          />
        </button>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
        {exclusiveOffers.map((item) => (
          <div
            key={item.id}
            className="relative rounded-xl overflow-hidden bg-center bg-cover min-h-[280px] flex flex-col justify-end p-6 text-white transition-shadow shadow-md hover:shadow-xl"
            style={{ backgroundImage: `url(${item.image})` }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-0" />

            {/* Discount Tag */}
            <span className="absolute top-4 left-4 bg-white text-gray-800 text-xs font-semibold px-3 py-1 rounded-full shadow-sm z-10">
              {item.priceOff}% OFF
            </span>

            {/* Text Content */}
            <div className="relative z-10">
              <h3 className="font-playfair text-xl font-semibold mb-1">
                {item.title}
              </h3>
              <p className="text-sm text-white/90">{item.description}</p>
              <p className="text-xs text-white/70 mt-2">
                Expires {item.expiryDate}
              </p>
              <button className="mt-4 flex items-center gap-2 text-sm font-medium group">
                View Offers
                <img
                  src={assets.arrowIcon}
                  alt="arrow"
                  className="w-4 h-4 invert group-hover:translate-x-1 transition-transform duration-200"
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExclusiveOffers;
