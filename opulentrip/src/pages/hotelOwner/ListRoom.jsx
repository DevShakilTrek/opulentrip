import React, { useState } from "react";
import Title from "../../components/Title";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { useEffect } from "react";

const ListRoom = () => {
  const [rooms, setRooms] = useState([]);

  const { currency, axios, getToken, user } = useAppContext();

  //fetch rooms of the hotel owner
  const fetchRooms = async () => {
  try {
    const { data } = await axios.get("/api/rooms/owner", {
      headers: { Authorization: `Bearer ${await getToken()}` },
    });

    if (data.success) {
      console.log("Fetched rooms:", data.rooms); // 👀 See the result
      setRooms(data.rooms);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};


  // toggle availability of the room
  const toggleAvailability = async (roomId) => {
  try {
    console.log("Toggling availability for:", roomId);

    const { data } = await axios.post(
      "/api/rooms/toggle-availability",
      { roomId },
      {
        headers: { Authorization: `Bearer ${await getToken()}` },
      }
    );

    console.log("Toggle response:", data); // 🔍 LOG RESPONSE

    if (data.success) {
      toast.success(data.message);
      fetchRooms(); // ✅ Refresh
    } else {
      toast.error(data.message || "Failed to toggle availability");
    }
  } catch (error) {
    toast.error(error.message || "Something went wrong");
    console.error("Toggle error:", error);
  }
};


  useEffect(() => {
    if (user) {
      fetchRooms();
    }
  }, [user]);

  return (
    <div>
      <Title
        title={
          <span className="honk-font text-4xl md:text-[40px]">List Rooms</span>
        }
        align="left"
        subTitle="View, edit, and manage your all listed rooms. Keep the information up-to-date to provide a better experience for users."
      />

      <p className="text-blue-500 mt-8">All Rooms</p>
      <div className="w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll mt-3">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-gray-800 font-medium">Name</th>
              <th className="px-4 py-3 text-gray-800 font-medium max-sm:hidden">
                Facility
              </th>
              <th className="px-4 py-3 text-gray-800 font-medium">
                Price / night
              </th>
              <th className="px-4 py-3 text-gray-800 font-medium text-center">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {rooms.map((item, index) => (
              <tr key={index}>
                <td className="px-4 py-3 text-gray-700 border-t border-gray-300">
                  {item.roomType}
                </td>
                <td className="px-4 py-3 text-gray-700 border-t border-gray-300 max-sm:hidden">
                  {item.amenities.join(", ")}
                </td>
                <td className="px-4 py-3 text-gray-700 border-t border-gray-300 text-center">
                  {currency} {item.pricePerNight}
                </td>
                <td className="px-4 py-3 text-gray-700 border-t border-gray-300">
                  <label className="relative inline-flex items-center cursor-default">
                    <input
                      onChange={() => toggleAvailability(item._id)}
                      type="checkbox"
                      className="sr-only peer"
                      checked={item.isAvailable}
                    />

                    <div className="w-12 h-7 bg-slate-300 rounded-full peer-checked:bg-blue-600 transition-colors duration-200 relative">
                      <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 ease-in-out peer-checked:translate-x-5"></span>
                    </div>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListRoom;
