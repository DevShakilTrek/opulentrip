import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";

const Dashboard = () => {
  const { currency, user, getToken, toast, axios } = useAppContext();

  const [dashboardData, setDashboardData] = useState({
    bookings: [],
    totalBookings: 0,
    totalRevenue: 0,
  });

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get("/api/bookings/hotel", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (data.success) {
        setDashboardData(data.dashboardData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  return (
    <div>
      <Title
        title={
          <span className="honk-font text-4xl md:text-[40px]">Dashboard</span>
        }
        align="left"
        subTitle="Monitor your room listings, track bookings and analyze revenue all in one place.stay updated
        with real-time insights and data-driven decisions to ensure success in the hospitality industry."
      />

      <div className="flex my-8 gap-4">
        {/* Total Bookings  */}
        <div className="flex bg-primary/3 border border-primary/10 rounded p-4 pr-8">
          <img
            src={assets.totalBookingIcon}
            alt=""
            className="max-sm:hidden h-10"
          />
          <div className="flex flex-col sm:ml-4 font-medium">
            <p className="text-blue-500 text-lg">Total Bookings</p>
            <p className="text-neutral-600 tex-base">
              {dashboardData.totalBookings}
            </p>
          </div>
        </div>

        {/* Total Revenue  */}
        <div className="flex bg-primary/3 border border-primary/10 rounded p-4 pr-8">
          <img
            src={assets.totalRevenueIcon}
            alt=""
            className="max-sm:hidden h-10"
          />
          <div className="flex flex-col sm:ml-4 font-medium">
            <p className="text-blue-500 text-lg">Total Revenue</p>
            <p className="text-neutral-600 tex-base">
              {currency} {dashboardData.totalRevenue}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Bookings  */}
      <h2 className="font-medium text-xl text-blue-950/70 mb-5">
        Recent Bookings
      </h2>

      <div className="w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-gray-800 font-medium">User Name</th>
              <th className="px-4 py-3 text-gray-800 font-medium max-sm:hidden">
                Room Name
              </th>
              <th className="px-4 py-3 text-gray-800 font-medium text-center">
                Total Amount
              </th>
              <th className="px-4 py-3 text-gray-800 font-medium text-center">
                Payment Status
              </th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {dashboardData.bookings.map((item, index) => (
              <tr key={index}>
                <td className="px-4 py-3 text-gray-700 border-t border-gray-300">
                  {item.user.username}
                </td>
                <td className="px-4 py-3 text-gray-700 border-t border-gray-300 max-sm:hidden">
                  {item.room.roomType}
                </td>
                <td className="px-4 py-3 text-gray-700 border-t border-gray-300 text-center">
                  {currency} {item.totalPrice}
                </td>
                <td className="px-4 py-3 text-gray-700 border-t border-gray-300 flex">
                  <button
                    className={`py-1 px-3 text-xs rounded-full mx-auto ${
                      item.isPaid
                        ? "bg-green-200 text-green-600"
                        : "bg-amber-200 text-amber-600"
                    }`}
                  >
                    {item.isPaid ? "Completed" : "Pending"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
