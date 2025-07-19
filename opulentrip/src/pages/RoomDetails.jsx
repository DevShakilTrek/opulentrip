import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  assets,
  facilityIcons,
  roomCommonData,  
} from "../assets/assets";
import StarRating from "../components/StarRating";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const RoomDetails = () => {
  const { id } = useParams();
  const { rooms, navigate, getToken, axios} = useAppContext();
  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guests, setGuests] = useState(1);

  const [isAvailable, setIsAvailable] = useState(false);

  // check if the room is available
  const checkAvailability = async () => {
    try{
      // check is check-in date is greater than check-out date
      if(checkInDate >= checkOutDate){
        toast.error("Check-In Date should be less than check-out date")
        return;
      }
      const {data} = await axios.post("/api/bookings/check-availability", 
        {room: id, checkInDate, checkOutDate}
      )
      if (data.success){
        if(data.isAvailable){
          setIsAvailable(true)
          toast.success("Room is available")
        }else{
          setIsAvailable(false)
          toast.error("Room is not available")
        }
      }else{
        toast.error(data.message)
      }
        } catch(error){
          toast.error(error.message)  
        }
  }


  // onSubmithandler function to check availability & book the room
  const onSubmitHandler = async (e) => {
    try{
      e.preventDefault();
      if(!isAvailable){
        return checkAvailability();
      }else{
        const {data} = await axios.post("/api/bookings/book", {room: id,
          checkInDate, checkOutDate, guests, paymentMethod: "Pay At Hotel"
        }, {headers: {Authorization: `Bearer ${await getToken()}`}})
        if(data.success){
          toast.success(data.message)
          navigate("/bookings")
          scrollTo(0,0)
        }else{
          toast.error(data.message)
        }
      }
        } catch(error){
          toast.error(error.message)  
        }
  }

  useEffect(() => {
    const room = rooms.find((room) => room._id === id);    
      room && setRoom(room);
      room && setMainImage(room.images[0]);    
  }, [rooms]);
  

  return (
    room && (
      <div className="py-28 px-4 md:px-16 lg:px-24 xl:px-32 max-w-7xl mx-auto">

        {/* Title & Room Type */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
          <h1 className="text-3xl md:text-4xl font-playfair text-gray-800">
            {room.hotel.name}
            <span className="font-inter text-sm text-gray-500 ml-2">
              ({room.roomType})
            </span>
          </h1>
          <span className="text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full">
            20% OFF
          </span>
        </div>

        {/* Ratings & Address */}
        <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
          <StarRating />
          <span>200+ reviews</span>
        </div>

        <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
          <img src={assets.locationIcon} alt="location" className="w-4 h-4" />
          <span>{room.hotel.address}</span>
        </div>

        {/* Room Images */}
        <div className="flex flex-col lg:flex-row gap-6 mt-6">
          <div className="w-full lg:w-1/2">
            <img
              src={mainImage}
              alt="Main Room"
              className="w-full h-full rounded-xl object-cover shadow-md"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 w-full lg:w-1/2">
            {room.images.map((image, index) => (
              <img
                key={index}
                src={image}
                onClick={() => setMainImage(image)}
                alt={`room-${index}`}
                className={`w-full rounded-xl object-cover cursor-pointer transition-all duration-150 ${
                  mainImage === image ? "ring-4 ring-orange-500" : "shadow-sm"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Highlights & Price */}
        <div className="flex flex-col md:flex-row md:justify-between items-start mt-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-playfair text-gray-800">
              Experience Luxury Like Never Before
            </h2>
            <div className="flex flex-wrap gap-3 mt-4 mb-6">
              {room.amenities.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-100 text-sm text-gray-700 shadow-sm"
                >
                  <img
                    src={facilityIcons[item]}
                    alt={item}
                    className="w-5 h-5"
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="text-xl md:text-2xl font-semibold text-gray-700 mt-4 md:mt-0">
            Ksh {room.pricePerNight}{" "}
            <span className="text-base font-normal text-gray-500">/night</span>
          </div>
        </div>

        {/* Check Availability Form */}
        <form onSubmit={onSubmitHandler} className="mt-12 p-6 rounded-xl bg-white shadow-md flex flex-col md:flex-row flex-wrap items-start md:items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-600 flex-wrap w-full md:w-auto">
            {/* Check In */}
            <div className="flex flex-col">
              <label htmlFor="checkInDate" className="font-medium">
                Check In
              </label>
              <input
              onChange={(e)=> setCheckInDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
                type="date"
                id="checkInDate"
                className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                required
              />
            </div>

            <div className="w-px h-12 bg-gray-300/70 max-md:hidden" />

            {/* Check Out */}
            <div className="flex flex-col">
              <label htmlFor="checkOutDate" className="font-medium">
                Check Out
              </label>
              <input
              onChange={(e)=> setCheckOutDate(e.target.value)}
              min={checkInDate}
              disabled={!checkInDate}
                type="date"
                id="checkOutDate"
                className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                required
              />
            </div>

            <div className="w-px h-12 bg-gray-300/70 max-md:hidden" />

            {/* Guests */}
            <div className="flex flex-col">
              <label htmlFor="guests" className="font-medium">
                Guests
              </label>
              <input
              onChange={(e)=> setGuests(e.target.value)}
              value={guests}
                type="number"
                id="guests"
                placeholder="1"
                className="max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-primary hover:bg-primary-dull active:scale-95 transition-all duration-200 text-white rounded-md w-full md:w-auto md:px-12 py-3 text-base font-medium"
          >
            {isAvailable ?  "Book Now" : "Check Availability"}
          </button>
        </form>

        {/* Room Description */}
        <div className="mt-14 space-y-6">
          {roomCommonData.map((spec, index) => (
            <div key={index} className="flex items-start gap-4">
              <img src={spec.icon} alt={`${spec.title}-icon`} className="w-6 h-6" />
              <div>
                <p className="text-base font-medium text-gray-800">{spec.title}</p>
                <p className="text-gray-500 text-sm">{spec.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Room Policy / Info */}
        <div className="border-y border-gray-200 my-14 py-8 text-gray-600 max-w-3xl">
          <p className="text-sm leading-relaxed">
            Guests will be graciously accommodated on the ground floor, subject to availability. You'll enjoy a beautifully appointed two-bedroom apartment that captures the essence of true coastal charm and comfort.
            <br /><br />
            The quoted rate is tailored for two guests. For group bookings, please indicate the number of guests during checkout to receive an accurate rate.
            <br /><br />
            Immerse yourself in a serene, ground-level retreat designed to offer the perfect blend of coastal elegance and relaxed luxury.
          </p>
        </div>

        {/* Hosted By Section */}
        <div className="flex flex-col items-start gap-6 mt-10">
          <div className="flex items-center gap-4">
            <img
              src={room.hotel.owner.image}
              alt="Hosted by"
              className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover"
            />
            <div>
              <p className="text-lg md:text-xl font-semibold text-gray-800">
                Hosted by {room.hotel.name}
              </p>
              <div className="flex items-center mt-1 text-sm text-gray-600">
                <StarRating />
                <span className="ml-2">200+ reviews</span>
              </div>
            </div>
          </div>
          <button className="px-6 py-2.5 rounded text-white bg-primary hover:bg-primary-dull transition-all duration-200">
            Contact Now
          </button>
        </div>
      </div>
    )
  );
};

export default RoomDetails;
