import React from "react";
import Title from "./Title";
import { testimonials } from "../assets/assets";
import StarRating from "./StarRating";

const Testimonial = () => {
  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 xl:px-32 bg-slate-50 pt-20 pb-20 overflow-hidden">
      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .marquee-inner {
          animation: marqueeScroll 30s linear infinite;
        }
        .marquee-reverse {
          animation-direction: reverse;
        }
      `}</style>

      <Title
        title="What Our Guests Say"
        subTitle="Experience the voices of our esteemed guests — hear firsthand why discerning travelers consistently choose Opulentrip for unforgettable journeys and world-class stays across Africa."
      />

      {/* Marquee Row 1 */}
      <div className="marquee-row w-full mx-auto max-w-6xl overflow-hidden relative mt-20">
        <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-slate-50 to-transparent"></div>
        <div className="marquee-inner flex transform-gpu min-w-[200%] gap-6 pb-6">
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow max-w-xs shrink-0"
            >
              <div className="flex items-center gap-3">
                <img
                  className="w-12 h-12 rounded-full"
                  src={testimonial.image}
                  alt={testimonial.name}
                />
                <div>
                  <p className="font-playfair text-xl">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm">{testimonial.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 mt-4">
                <StarRating />
              </div>
              <p className="text-gray-500 text-sm mt-4">
                "{testimonial.review}"
              </p>
            </div>
          ))}
        </div>
        <div className="absolute right-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-l from-slate-50 to-transparent"></div>
      </div>

      {/* Marquee Row 2 */}
      <div className="marquee-row w-full mx-auto max-w-6xl overflow-hidden relative">
        <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-slate-50 to-transparent"></div>
        <div className="marquee-inner marquee-reverse flex transform-gpu min-w-[200%] gap-6 pt-6">
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <div
              key={index + testimonials.length}
              className="bg-white p-6 rounded-xl shadow max-w-xs shrink-0"
            >
              <div className="flex items-center gap-3">
                <img
                  className="w-12 h-12 rounded-full"
                  src={testimonial.image}
                  alt={testimonial.name}
                />
                <div>
                  <p className="font-playfair text-xl">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm">{testimonial.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 mt-4">
                <StarRating />
              </div>
              <p className="text-gray-500 text-sm mt-4">
                "{testimonial.review}"
              </p>
            </div>
          ))}
        </div>
        <div className="absolute right-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-l from-slate-50 to-transparent"></div>
      </div>
    </div>
  );
};

export default Testimonial;
