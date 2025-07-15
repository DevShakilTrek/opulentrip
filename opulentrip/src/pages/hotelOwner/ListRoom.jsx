import React, { useState } from "react";
import Title from "../../components/Title";
import { roomsDummyData } from "../../assets/assets";

const ListRoom = () => {
  const [rooms, setRooms] = useState(roomsDummyData);

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
              <th className="px-4 py-3 text-gray-800 font-medium max-sm:hidden">Facility</th>
              <th className="px-4 py-3 text-gray-800 font-medium">Price / night</th>
              <th className="px-4 py-3 text-gray-800 font-medium text-center">Action</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {rooms.map((item, index) => (
              <tr key={index}>
                <td className="px-4 py-3 text-gray-700 border-t border-gray-300">{item.roomType}</td>
                <td className="px-4 py-3 text-gray-700 border-t border-gray-300 max-sm:hidden">
                  {item.amenities.join(", ")}
                </td>
                <td className="px-4 py-3 text-gray-700 border-t border-gray-300 text-center">
                  Ksh {item.pricePerNight}
                </td>
                <td className="px-4 py-3 text-gray-700 border-t border-gray-300">
                  <label className="relative inline-flex items-center cursor-default">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={item.isAvailable}
                      readOnly
                    />
                    <div className="w-12 h-7 bg-slate-300 rounded-full peer-checked:bg-blue-600 transition-colors duration-200 relative">
                      <span className={`dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 ease-in-out ${item.isAvailable ? "translate-x-5" : ""}`}></span>
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
