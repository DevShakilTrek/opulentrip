import React, { useState } from "react";
import Title from "../../components/Title";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddRoom = () => {
  const { axios, getToken } = useAppContext();

  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });

  const [inputs, setInputs] = useState({
    roomType: "",
    pricePerNight: 0,
    amenities: {
      "Free Wifi": false,
      "Free Breakfast": false,
      "Room Service": false,
      "Mountains View": false,
      "Pool View": false,
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (
      !inputs.roomType ||
      !inputs.pricePerNight ||
      !inputs.amenities ||
      !Object.values(images).some((image) => image)
    ) {
      toast.error("Please fill in all the details");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("roomType", inputs.roomType);
      formData.append("pricePerNight", inputs.pricePerNight);

      const amenities = Object.keys(inputs.amenities).filter(
        (key) => inputs.amenities[key]
      );
      formData.append("amenities", JSON.stringify(amenities));

      Object.keys(images).forEach((key) => {
        images[key] && formData.append("images", images[key]);
      });

      const { data } = await axios.post("/api/rooms/", formData, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        toast.success(data.message);

        
        setInputs({
          roomType: "",
          pricePerNight: 0,
          amenities: {
            "Free Wifi": false,
            "Free Breakfast": false,
            "Room Service": false,
            "Mountains View": false,
            "Pool View": false,
          },
        });
        setImages({ 1: null, 2: null, 3: null, 4: null });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="px-4 md:px-16 lg:px-24 xl:px-32 pt-2 pb-20 text-gray-800"
    >
      <Title
        title={
          <span className="honk-font text-4xl md:text-[40px]">Add Room</span>
        }
        align="left"
        subTitle="Fill in the details carefully and accurate room details, pricing and amenities. to enhance the user booking experience."
      />

      <p className="text-gray-800 font-medium mt-10 mb-2">Images</p>
      <div className="flex flex-wrap gap-4">
        {Object.keys(images).map((key) => (
          <label htmlFor={`roomImage${key}`} key={key}>
            <img
              src={
                images[key] instanceof File
                  ? URL.createObjectURL(images[key])
                  : assets.uploadArea
              }
              alt="room upload"
              className="w-32 h-24 object-cover border rounded cursor-pointer hover:opacity-80 transition"
            />
            <input
              type="file"
              id={`roomImage${key}`}
              accept="image/*"
              hidden
              onChange={(e) =>
                setImages({ ...images, [key]: e.target.files[0] })
              }
            />
          </label>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <div className="flex-1 max-w-xs">
          <p className="text-gray-800 font-medium">Room Type</p>
          <select
            onChange={(e) => setInputs({ ...inputs, roomType: e.target.value })}
            value={inputs.roomType}
            className="border border-gray-300 rounded mt-1 p-2 w-full"
          >
            <option value="">Select Room Type</option>
            <option value="Single Bed">Single Bed</option>
            <option value="Double Bed">Double Bed</option>
            <option value="Luxury Room">Luxury Room</option>
            <option value="Family Suite">Family Suite</option>
          </select>
        </div>

        <div className="flex flex-col">
          <p className="text-gray-800 font-medium">
            Price <span className="text-xs">/night</span>
          </p>
          <input
            type="number"
            onChange={(e) =>
              setInputs({ ...inputs, pricePerNight: e.target.value })
            }
            value={inputs.pricePerNight}
            className="border border-gray-300 rounded mt-1 p-2 w-24"
          />
        </div>
      </div>

      <p className="text-gray-800 font-medium mt-8 mb-2">Amenities</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-gray-600">
        {Object.keys(inputs.amenities).map((amenity, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="checkbox"
              id={`amenities${index + 1}`}
              checked={inputs.amenities[amenity]}
              onChange={() =>
                setInputs({
                  ...inputs,
                  amenities: {
                    ...inputs.amenities,
                    [amenity]: !inputs.amenities[amenity],
                  },
                })
              }
            />
            <label htmlFor={`amenities${index + 1}`}>{amenity}</label>
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded mt-10 hover:bg-blue-700 transition"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Room"}
      </button>
    </form>
  );
};

export default AddRoom;
