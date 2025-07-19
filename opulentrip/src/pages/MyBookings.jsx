import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const MyBookings = () => {
  const { axios, getToken, user } = useAppContext();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true); // 🆕

  const fetchUserBookings = async () => {
    try {
      const { data } = await axios.get("/api/bookings/user", {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      });
      console.log("Fetched bookings:", data); // 🆕 Debug log
      if (data.success) {
        setBookings(data.bookings || []); // 🆕 Fallback to empty array
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false); // 🆕 Stop loading spinner
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserBookings();
    }
  }, [user]);

  return (
    <div className="py-28 md:py-32 px-4 md:px-16 lg:px-24 xl:px-32 text-gray-800">
      <Title
        title={
          <span className="honk-font text-4xl md:text-[40px]">My Bookings</span>
        }
        align="left"
        subTitle="Easily manage your past, current, and future upcoming hotel reservations in one place. Plan your trips seamlessly with just a few clicks."
      />

      <div className="max-w-6xl mx-auto mt-10 space-y-6">
        <div className="hidden md:grid grid-cols-[3fr_2fr_1fr] text-base font-medium text-gray-600 border-b border-gray-300 pb-3">
          <span>Hotels</span>
          <span>Date & Timings</span>
          <span>Payment</span>
        </div>

        {/* 🆕 Loading state */}
        {loading ? (
          <p className="text-center text-gray-500 mt-10">Loading bookings...</p>
        ) : (
          <>
            {Array.isArray(bookings) && bookings.length > 0 ? (
              bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] gap-6 md:gap-0 border-b border-gray-200 pb-6 pt-4"
                >
                  {/* Hotel Info */}
                  <div className="flex md:flex-row flex-col gap-4">
                    <img
                      src={booking.room?.images[0]}
                      alt="hotel"
                      className="w-full md:w-44 h-32 object-cover rounded shadow"
                    />
                    <div className="flex flex-col justify-between">
                      <p className="text-lg font-semibold">
                        {booking.hotel?.name}
                        <span className="text-sm text-gray-500 font-normal ml-1">
                          ({booking.room?.roomType})
                        </span>
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                        <img
                          src={assets.locationIcon}
                          alt="location"
                          className="w-4 h-4"
                        />
                        <span>{booking.hotel?.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                        <img
                          src={assets.guestsIcon}
                          alt="guests"
                          className="w-4 h-4"
                        />
                        <span>Guests: {booking.guests}</span>
                      </div>
                      <p className="text-base mt-2 font-medium">
                        Total: Ksh{booking.totalPrice}
                      </p>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="flex flex-col gap-3 justify-center md:items-center mt-4 md:mt-0 text-sm text-gray-600">
                    <div>
                      <p className="font-medium text-gray-700">Check-In:</p>
                      <p>
                        {new Date(booking.checkInDate).toDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Check-Out:</p>
                      <p>
                        {new Date(booking.checkOutDate).toDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Payment */}
                  <div className="flex flex-col justify-center md:items-start gap-3">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          booking.isPaid ? "bg-green-500" : "bg-red-500"
                        }`}
                      ></div>
                      <p
                        className={`text-sm font-medium ${
                          booking.isPaid ? "text-green-600" : "text-red-500"
                        }`}
                      >
                        {booking.isPaid ? "Paid" : "Unpaid"}
                      </p>
                    </div>
                    {!booking.isPaid && (
                      <button className="text-xs px-4 py-1.5 rounded-full border border-gray-400 hover:bg-gray-50 transition-all">
                        Pay Now
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 mt-10">
                No bookings found.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
