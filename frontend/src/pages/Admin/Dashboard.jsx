import React from "react";
import BookingChart from "./Charts/BookingChart";
import BookingPerSpecialization from "./Charts/BookingPerSpecialization";
import UseFetchData from "../../hooks/UseFetchData";
import Card1 from "./Cards/Card1";
import BookingNumbersAndRevenue from "./Charts/BookingNumbersAndRevenue";

const Dashboard = () => {
  const { data: dataPerDate, refetch: dataPerDateRefetch } = UseFetchData(
    "/booking/getDataPerAppointmentDate"
  );
  const { data: usersCount } = UseFetchData("user/usersCount");
  const { data: specialistsCount } = UseFetchData(
    "specialist/specialistsCount"
  );
  const { data: bookingsCount } = UseFetchData("booking/totalBookingCount");
  const { data: bookingsRevenue } = UseFetchData("booking/totalBookingRevenue");
  const { data: bookingsPerSpecialization } = UseFetchData(
    "booking/totalBookingsPerSpecialization"
  );

  const details1 = {
    title: "Total number of users",
    count: usersCount,
  };
  const details2 = {
    title: "Total number of specialists",
    count: specialistsCount,
  };
  const details3 = {
    title: "Total completed sessions",
    count: bookingsCount,
  };
  const details4 = {
    title: "Total revenue earned",
    count: `₹ ${bookingsRevenue}`,
  };


  return (
    <div className="flex flex-wrap items-center">
      {/* Chart Segment */}
      <div className="w-full md:w-1/2 xl:w-2/3 p-4">
        <div className="bg-white p-4 shadow-md rounded-md">
          <h1 className="flex justify-center font-bold text-2xl text-gray-700">
            Booking per Day
          </h1>
          <BookingChart data={dataPerDate} />
        </div>
      </div>

      {/* Cards Segment */}
      <div className="w-full md:w-1/2 xl:w-1/3 p-4">
        <div className="flex flex-wrap -m-4">
          <Card1 data={details1} />
          <Card1 data={details2} />
          <Card1 data={details3} />
          <Card1 data={details4} />
        </div>
      </div>

      {/* Booking per Specialization Chart */}
      <div className="w-1/2 p-4 flex items-center justify-center">
        <div className="bg-white p-4 shadow-md rounded-md">
          <h1 className="flex justify-center font-bold text-2xl text-gray-700">
            Booking per Specialization
          </h1>
          <BookingPerSpecialization data={bookingsPerSpecialization} />
        </div>
      </div>

      {/* Booking Numbers and Revenue Chart */}
      <div className="w-1/2 p-4 flex items-center justify-center">
        <div className="bg-white p-4 shadow-md rounded-md">
          <h1 className="flex justify-center font-bold text-2xl text-gray-700">
            Booking Numbers and Revenue per Specialisation
          </h1>
          <BookingNumbersAndRevenue data={bookingsPerSpecialization} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
