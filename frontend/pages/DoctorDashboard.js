import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";

const DoctorDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("newBookings");
  const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleAvatarMenu = () => {
    setIsAvatarMenuOpen(!isAvatarMenuOpen);
  };

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };
  const handleStartChat = (patientName) => {
    alert(`Starting chat with ${patientName}`);
  };
  return (
    <div className="flex h-screen font-poppins overflow-hidden">
      <div
        className={`bg-blue-950 p-4 ${
          isSidebarOpen ? "w-64" : "w-16"
        } transition-all duration-300 flex-shrink-0`}
      >
        <div className="flex justify-between items-center">
          <h2
            className={`${
              isSidebarOpen ? "block" : "hidden"
            } text-gray-100 font-normal text-xl`}
          >
            Doctor Dashboard
          </h2>
          <button
            onClick={toggleSidebar}
            className="text-white hover:bg-blue-900 p-1 rounded-full transition-colors"
          >
            {isSidebarOpen ? (
              <BsChevronLeft size={24} />
            ) : (
              <BsChevronRight size={24} />
            )}
          </button>
        </div>

        <ul className="mt-4 space-y-2">
          {[
            { id: "newBookings", label: "New Booking Requests" },
            { id: "history", label: "Appointment History" },
            { id: "profile", label: "Update Profile" },
            { id: "availableAppointments", label: "Available Appointments" },
            { id: "payments", label: "Payments" },
          ].map((item) => (
            <li
              key={item.id}
              className={`cursor-pointer p-2 bg-white bg-opacity-50 rounded-xl shadow-md hover:bg-opacity-80 transition-all ${
                activeSection === item.id ? "bg-blue-600 text-white" : ""
              }`}
              onClick={() => handleSectionClick(item.id)}
            >
              <span
                className={`${isSidebarOpen ? "block" : "hidden"} text-white`}
              >
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col flex-grow w-full h-screen overflow-hidden">
        <div className="flex items-center justify-between bg-white shadow-md px-4 py-2">
          <h2 className="text-xl font-semibold">Welcome, Doctor</h2>
          <div className="relative">
            <button
              onClick={toggleAvatarMenu}
              className="flex items-center space-x-2"
            >
              <FaUserCircle size={32} className="text-gray-600" />
              <span className="hidden md:block text-gray-600 font-medium">
                Dr. John Doe
              </span>
            </button>

            {isAvatarMenuOpen && (
              <ul className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Profile
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Settings
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Logout
                </li>
              </ul>
            )}
          </div>
        </div>
        <div className="p-4 flex-grow overflow-y-auto">
          {activeSection === "newBookings" && (
            <div>
              <h2 className="text-2xl mb-4">New Booking Requests</h2>
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 text-left font-semibold text-gray-700">
                      Booking
                    </th>
                    <th className="py-2 px-4 text-left font-semibold text-gray-700">
                      Patient Name
                    </th>
                    <th className="py-2 px-4 text-left font-semibold text-gray-700">
                      Date
                    </th>
                    <th className="py-2 px-4 text-left font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">Booking #1</td>
                    <td className="py-2 px-4">John Doe</td>
                    <td className="py-2 px-4">2024-12-10</td>
                    <td className="py-2 px-4">
                      <Link href="/chat">
                        <button
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                          onClick={() => handleStartChat("John Doe")}
                        >
                          Start Chat
                        </button>
                      </Link>
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">Booking #2</td>
                    <td className="py-2 px-4">Jane Smith</td>
                    <td className="py-2 px-4">2024-12-12</td>
                    <td className="py-2 px-4">
                      <Link href="/chat">
                        <button
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                          onClick={() => handleStartChat("Jane Smith")}
                        >
                          Start Chat
                        </button>
                      </Link>
                    </td>
                  </tr>
                  {/* Add more rows here */}
                </tbody>
              </table>
            </div>
          )}
          {/* You can add more sections here like "history", "profile", etc. */}
          {activeSection === "history" && (
            <div className="p-6 flex-grow overflow-y-auto bg-gray-50">
              {activeSection === "history" && (
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-3xl font-semibold text-gray-800 mb-4">
                    Appointment History
                  </h3>
                  <p className="text-lg text-gray-600 mb-6">
                    Here you can view all your previous appointments.
                  </p>
                  <table className="min-w-full table-auto border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="py-2 px-4 text-left font-semibold text-gray-700">
                          Appointment ID
                        </th>
                        <th className="py-2 px-4 text-left font-semibold text-gray-700">
                          Patient Name
                        </th>
                        <th className="py-2 px-4 text-left font-semibold text-gray-700">
                          Date
                        </th>
                        <th className="py-2 px-4 text-left font-semibold text-gray-700">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="py-2 px-4">#001</td>
                        <td className="py-2 px-4">John Doe</td>
                        <td className="py-2 px-4">2024-12-01</td>
                        <td className="py-2 px-4 text-green-500">Completed</td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="py-2 px-4">#002</td>
                        <td className="py-2 px-4">Jane Smith</td>
                        <td className="py-2 px-4">2024-11-30</td>
                        <td className="py-2 px-4 text-yellow-500">Pending</td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="py-2 px-4">#003</td>
                        <td className="py-2 px-4">Alice Johnson</td>
                        <td className="py-2 px-4">2024-11-28</td>
                        <td className="py-2 px-4 text-red-500">Canceled</td>
                      </tr>
                      {/* Add more rows here */}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
          {activeSection === "profile" && (
            <div className="p-6 flex-grow overflow-y-auto bg-gray-50">
              {activeSection === "profile" && (
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-3xl font-semibold text-gray-800 mb-4">
                    Update Profile
                  </h3>
                  <p className="text-lg text-gray-600 mb-6">
                    Update your personal information and contact details.
                  </p>

                  <form>
                    {/* Name Field */}
                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="block text-gray-700 font-medium mb-2"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your name"
                      />
                    </div>
                    {/* Specialty Field */}
                    <div className="mb-4">
                      <label
                        htmlFor="specialty"
                        className="block text-gray-700 font-medium mb-2"
                      >
                        Specialty
                      </label>
                      <input
                        type="text"
                        id="specialty"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your specialty"
                      />
                    </div>
                    {/* Hospital Field */}
                    <div className="mb-4">
                      <label
                        htmlFor="hospital"
                        className="block text-gray-700 font-medium mb-2"
                      >
                        Hospital
                      </label>
                      <input
                        type="text"
                        id="hospital"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your hospital's name"
                      />
                    </div>
                    {/* Years of Experience Field */}
                    <div className="mb-4">
                      <label
                        htmlFor="experience"
                        className="block text-gray-700 font-medium mb-2"
                      >
                        Years of Experience
                      </label>
                      <input
                        type="number"
                        id="experience"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter years of experience"
                      />
                    </div>
                    {/* Hourly Rate Field */}
                    <div className="mb-4">
                      <label
                        htmlFor="rate"
                        className="block text-gray-700 font-medium mb-2"
                      >
                        Money per Hour
                      </label>
                      <input
                        type="number"
                        id="rate"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter hourly rate"
                      />
                    </div>
                    {/* Bio / Description Field */}
                    <div className="mb-6">
                      <label
                        htmlFor="bio"
                        className="block text-gray-700 font-medium mb-2"
                      >
                        Biography / Description
                      </label>
                      <textarea
                        id="bio"
                        rows="4"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Write a short bio or description"
                      ></textarea>
                    </div>
                    {/* Update Button */}
                    <div className="flex justify-center">
                      <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        Update Profile
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}
          {activeSection === "availableAppointments" && (
            <div className="p-6 flex-grow overflow-y-auto bg-gray-50">
              {activeSection === "availableAppointments" && (
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-3xl font-semibold text-gray-800 mb-4">
                    Available Appointments
                  </h3>
                  <p className="text-lg text-gray-600 mb-6">
                    Here you can manage your available slots for appointments.
                  </p>

                  {/* Appointment Slot Form */}
                  <form className="space-y-6 mb-8">
                    {/* Day Field */}
                    <div>
                      <label
                        htmlFor="day"
                        className="block text-gray-700 font-medium mb-2"
                      >
                        Day of the Week
                      </label>
                      <select
                        id="day"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Day</option>
                        <option value="monday">Monday</option>
                        <option value="tuesday">Tuesday</option>
                        <option value="wednesday">Wednesday</option>
                        <option value="thursday">Thursday</option>
                        <option value="friday">Friday</option>
                        <option value="saturday">Saturday</option>
                        <option value="sunday">Sunday</option>
                      </select>
                    </div>
                    {/* Start Time Field */}
                    <div>
                      <label
                        htmlFor="startTime"
                        className="block text-gray-700 font-medium mb-2"
                      >
                        Start Time
                      </label>
                      <input
                        type="time"
                        id="startTime"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    {/* End Time Field */}
                    <div>
                      <label
                        htmlFor="endTime"
                        className="block text-gray-700 font-medium mb-2"
                      >
                        End Time
                      </label>
                      <input
                        type="time"
                        id="endTime"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    {/* Duration Field */}
                    <div>
                      <label
                        htmlFor="duration"
                        className="block text-gray-700 font-medium mb-2"
                      >
                        Duration (in minutes)
                      </label>
                      <input
                        type="number"
                        id="duration"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter duration in minutes"
                      />
                    </div>
                    {/* Submit Button */}
                    <div className="flex justify-center">
                      <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        Add Available Slot
                      </button>
                    </div>
                  </form>

                  {/* Display Available Slots */}
                  <div>
                    <h4 className="text-2xl font-semibold text-gray-800 mb-4">
                      Your Available Slots
                    </h4>
                    <table className="w-full table-auto border-collapse border border-gray-300">
                      <thead>
                        <tr>
                          <th className="px-4 py-2 text-left border-b">Day</th>
                          <th className="px-4 py-2 text-left border-b">
                            Start Time
                          </th>
                          <th className="px-4 py-2 text-left border-b">
                            End Time
                          </th>
                          <th className="px-4 py-2 text-left border-b">
                            Duration (minutes)
                          </th>
                          <th className="px-4 py-2 text-left border-b">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="px-4 py-2 border-b">Monday</td>
                          <td className="px-4 py-2 border-b">10:00 AM</td>
                          <td className="px-4 py-2 border-b">11:00 AM</td>
                          <td className="px-4 py-2 border-b">60</td>
                          <td className="px-4 py-2 border-b">
                            <button className="text-blue-500 hover:underline">
                              Edit
                            </button>
                            <button className="text-red-500 hover:underline ml-4">
                              Delete
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 border-b">Wednesday</td>
                          <td className="px-4 py-2 border-b">2:00 PM</td>
                          <td className="px-4 py-2 border-b">3:00 PM</td>
                          <td className="px-4 py-2 border-b">60</td>
                          <td className="px-4 py-2 border-b">
                            <button className="text-blue-500 hover:underline">
                              Edit
                            </button>
                            <button className="text-red-500 hover:underline ml-4">
                              Delete
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
          {activeSection === "payments" && (
            <div className="p-6 flex-grow overflow-y-auto bg-gray-50">
              {activeSection === "payments" && (
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-3xl font-semibold text-gray-800 mb-4">
                    Payments
                  </h3>
                  <p className="text-lg text-gray-600 mb-6">
                    Manage your payments and financial transactions.
                  </p>

                  {/* Payment Filters */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex space-x-4">
                      <label
                        htmlFor="fromDate"
                        className="text-gray-700 font-medium"
                      >
                        From Date
                      </label>
                      <input
                        type="date"
                        id="fromDate"
                        className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <label
                        htmlFor="toDate"
                        className="text-gray-700 font-medium"
                      >
                        To Date
                      </label>
                      <input
                        type="date"
                        id="toDate"
                        className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      Filter Transactions
                    </button>
                  </div>
                  {/* Payments Table */}
                  <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                    <table className="min-w-full table-auto border-collapse">
                      <thead>
                        <tr>
                          <th className="px-4 py-2 text-left border-b">
                            Transaction ID
                          </th>
                          <th className="px-4 py-2 text-left border-b">
                            Patient Name
                          </th>
                          <th className="px-4 py-2 text-left border-b">
                            Amount
                          </th>
                          <th className="px-4 py-2 text-left border-b">Date</th>
                          <th className="px-4 py-2 text-left border-b">
                            Status
                          </th>
                          <th className="px-4 py-2 text-left border-b">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="px-4 py-2 border-b">TX12345</td>
                          <td className="px-4 py-2 border-b">John Doe</td>
                          <td className="px-4 py-2 border-b">$100</td>
                          <td className="px-4 py-2 border-b">2024-12-01</td>
                          <td className="px-4 py-2 border-b">
                            <span className="px-3 py-1 text-green-600 bg-green-100 rounded-full text-sm">
                              Paid
                            </span>
                          </td>
                          <td className="px-4 py-2 border-b">
                            <button className="text-blue-500 hover:underline">
                              View Details
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 border-b">TX12346</td>
                          <td className="px-4 py-2 border-b">Jane Smith</td>
                          <td className="px-4 py-2 border-b">$150</td>
                          <td className="px-4 py-2 border-b">2024-12-02</td>
                          <td className="px-4 py-2 border-b">
                            <span className="px-3 py-1 text-yellow-600 bg-yellow-100 rounded-full text-sm">
                              Pending
                            </span>
                          </td>

                          <td className="px-4 py-2 border-b">
                            <button className="text-blue-500 hover:underline">
                              View Details
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 border-b">TX12347</td>
                          <td className="px-4 py-2 border-b">Alex Brown</td>
                          <td className="px-4 py-2 border-b">$200</td>
                          <td className="px-4 py-2 border-b">2024-12-03</td>
                          <td className="px-4 py-2 border-b">
                            <span className="px-3 py-1 text-red-600 bg-red-100 rounded-full text-sm">
                              Failed
                            </span>
                          </td>
                          <td className="px-4 py-2 border-b">
                            <button className="text-blue-500 hover:underline">
                              View Details
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {/* Total Earnings Section */}
                  <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-lg">
                    <h4 className="text-2xl font-semibold text-gray-800 mb-4">
                      Total Earnings
                    </h4>
                    <div className="flex items-center justify-between">
                      <span className="text-xl text-gray-700">
                        Total Earnings:
                      </span>
                      <span className="text-2xl font-semibold text-green-600">
                        $450
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xl text-gray-700">
                        Pending Payments:
                      </span>
                      <span className="text-2xl font-semibold text-yellow-600">
                        $150
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xl text-gray-700">
                        Failed Payments:
                      </span>
                      <span className="text-2xl font-semibold text-red-600">
                        $200
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
