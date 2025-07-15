import React, { useState } from 'react';
import { assets, facilityIcons, roomsDummyData } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import StarRating from '../components/StarRating';

const CheckBox = ({ label, selected = false, onChange = () => {} }) => (
  <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm'>
    <input type='checkbox' checked={selected} onChange={(e) => onChange(e.target.checked, label)} />
    <span className='font-light select-none'>{label}</span>
  </label>
);

const RadioButton = ({ label, selected = false, onChange = () => {} }) => (
  <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm'>
    <input type='radio' name='sortOption' checked={selected} onChange={() => onChange(label)} />
    <span className='font-light select-none'>{label}</span>
  </label>
);

const AllRooms = () => {
  const navigate = useNavigate();
  const [openFilters, setOpenFilters] = useState(false);

  const roomTypes = ['Single Room', 'Double Room', 'Family Room', 'Suite Room'];
  const priceRanges = ['1000 - 2000', '2000 - 3000', '3000 - 4000', '4000 - 5000'];
  const sortOptions = ['Lowest to Highest Price', 'Highest to Lowest Price', 'Newest First'];

  return (
    <div className='pt-28 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32 max-w-7xl mx-auto flex flex-col-reverse lg:flex-row justify-between gap-10'>

      {/* Left - Rooms */}
      <div className='w-full lg:w-[65%]'>
        <div className='mb-6'>
          <h1 className='honk-font text-4xl md:text-[40px]'>Hotel Rooms</h1>
          <p className='text-sm md:text-base text-gray-500 mt-2 max-w-xl'>
            Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories.
          </p>
        </div>

        {roomsDummyData.map((room) => (
          <div key={room._id} className='mb-10 pb-10 border-b last:border-0 last:pb-0'>

            <div className='flex flex-col md:flex-row gap-6'>
              {/* Room Image */}
              <img
                onClick={() => {
                  navigate(`/rooms/${room._id}`);
                  scrollTo(0, 0);
                }}
                src={room.images[0]}
                alt='room'
                title='View Room Details'
                className='w-full md:w-[300px] h-[200px] object-cover rounded-xl shadow-md cursor-pointer'
              />

              {/* Room Info */}
              <div className='flex flex-col gap-2 md:flex-1'>
                <p className='text-gray-500 text-sm'>{room.hotel.city}</p>

                <p
                  className='text-gray-800 text-xl font-semibold font-playfair cursor-pointer hover:underline'
                  onClick={() => {
                    navigate(`/rooms/${room._id}`);
                    scrollTo(0, 0);
                  }}
                >
                  {room.hotel.name}
                </p>

                <div className='flex items-center text-sm text-gray-600 mt-1'>
                  <StarRating />
                  <span className='ml-2'>200+ reviews</span>
                </div>

                <div className='flex items-center gap-1 text-sm text-gray-500 mt-1'>
                  <img src={assets.locationIcon} alt='location' className='w-4 h-4' />
                  <span>{room.hotel.address}</span>
                </div>

                <div className='flex flex-wrap gap-2 mt-3 mb-4'>
                  {room.amenities.map((item, idx) => (
                    <div
                      key={idx}
                      className='flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-xs shadow-sm'
                    >
                      <img src={facilityIcons[item]} alt={item} className='w-4 h-4' />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <p className='text-lg font-semibold text-gray-800'>
                  Ksh {room.pricePerNight}{' '}
                  <span className='text-sm text-gray-500 font-normal'>/night</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right - Filters */}
      <div className='w-full lg:w-[30%]'>
        <div className='bg-white border border-gray-300 rounded-md shadow-sm text-gray-700'>
          <div className='flex items-center justify-between px-5 py-3 border-b border-gray-300'>
            <p className='font-medium text-gray-800'>FILTERS</p>
            <div className='text-xs cursor-pointer'>
              <span onClick={() => setOpenFilters(!openFilters)} className='lg:hidden'>
                {openFilters ? 'HIDE' : 'SHOW'}
              </span>
              <span className='hidden lg:block'>CLEAR</span>
            </div>
          </div>

          <div className={`${openFilters ? 'h-auto' : 'h-0 lg:h-auto'} overflow-hidden transition-all duration-700`}>
            <div className='px-5 pt-5'>
              <p className='font-medium text-gray-800 pb-2'>Popular Filters</p>
              {roomTypes.map((room, i) => (
                <CheckBox key={i} label={room} />
              ))}
            </div>

            <div className='px-5 pt-5'>
              <p className='font-medium text-gray-800 pb-2'>Price Range</p>
              {priceRanges.map((range, i) => (
                <CheckBox key={i} label={`Ksh ${range}`} />
              ))}
            </div>

            <div className='px-5 pt-5 pb-6'>
              <p className='font-medium text-gray-800 pb-2'>Sort By</p>
              {sortOptions.map((option, i) => (
                <RadioButton key={i} label={option} />
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AllRooms;
