import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaUser, FaEnvelope, FaSearch } from "react-icons/fa";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "@/styles/patient.css";

function patient() {
  const [activeSpeciality, setActiveSpeciality] = useState("All");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: "Dr. John Doe",
      speciality: "Cardiologist",
      hospital: "City Hospital",
      image:
        "https://media.istockphoto.com/id/638647058/photo/we-offer-our-patients-premium-healthcare-here.jpg?s=612x612&w=0&k=20&c=pek5ehwgsZNPemeEh4bObQ1U5DRPEs0WHleosG-daa8=",
      availableDates: ["2024-12-07", "2024-12-08", "2024-12-09"],
      bookedDates: ["2024-12-07"],
      pay: "20 birr/min",
    },
    {
      id: 2,
      name: "Dr. Jane Smith",
      speciality: "Dermatologist",
      hospital: "SkinCare Clinic",
      image:
        "https://thumbs.dreamstime.com/b/portrait-positive-black-doctor-holding-medical-chart-male-over-white-background-178499631.jpg",
      availableDates: ["2024-12-10", "2024-12-11", "2024-12-12"],
      bookedDates: ["2024-12-10", "2024-12-12"],
      pay: "20 birr/min",
    },
    {
      id: 3,
      name: "Dr. Emily White",
      speciality: "Pediatrician",
      hospital: "Children's Care Center",
      image:
        "https://t4.ftcdn.net/jpg/03/55/64/53/360_F_355645384_lPYHUp9YBvmq479otGTB9qJNN8efv69X.jpg",
      availableDates: ["2024-12-13", "2024-12-14", "2024-12-15"],
      bookedDates: [],
      pay: "20 birr/min",
    },
    {
      id: 4,
      name: "Dr. Mark Brown",
      speciality: "Orthopedic",
      hospital: "OrthoCare Clinic",
      image:
        "https://www.shutterstock.com/image-photo/smiling-young-african-american-curly-260nw-2319779015.jpg",
      availableDates: ["2024-12-16", "2024-12-17", "2024-12-18"],
      bookedDates: ["2024-12-16"],
      pay: "Free",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredDoctors =
    activeSpeciality === "All"
      ? doctors.filter((doctor) =>
          doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : doctors
          .filter((doctor) => doctor.speciality === activeSpeciality)
          .filter((doctor) =>
            doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
          );

  const specialities = [
    "All",
    "Cardiologist",
    "Dermatologist",
    "Pediatrician",
    "Orthopedic",
  ];

  const openDoctorDetails = (doctor) => {
    setSelectedDoctor(doctor);
    setShowBookingModal(true);
    setSelectedDate("");
  };

  const closeModal = () => {
    setSelectedDoctor(null);
    setShowBookingModal(false);
    setSelectedDate("");
  };

  const handleBooking = () => {
    if (!selectedDate) {
      alert("Please select a date before booking.");
      return;
    }

    setDoctors((prevDoctors) =>
      prevDoctors.map((doctor) => {
        if (doctor.id === selectedDoctor.id) {
          return {
            ...doctor,
            bookedDates: [...doctor.bookedDates, selectedDate],
            availableDates: doctor.availableDates.filter(
              (date) => date !== selectedDate
            ),
          };
        }
        return doctor;
      })
    );
    closeModal();
  };

  const DoctorCard = ({ doctor }) => {
    const rating = doctor.bookedDates.length;
    const maxRating = 5;
    return (
      <div
        key={doctor.id}
        className="bg-white shadow-md rounded-md p-4 hover:shadow-lg transition cursor-pointer"
        onClick={() => openDoctorDetails(doctor)}
      >
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-auto object-cover rounded-md mb-4 "
        />
        <h2 className="text-xl font-semibold">{doctor.name}</h2>
        <p className="text-gray-600">{doctor.speciality}</p>
        <p className="text-gray-600">{doctor.hospital}</p>
        <p className="text-gray-600">
          Booked Dates: {doctor.bookedDates.join(", ") || "None"}
        </p>

        <div className="flex items-center mt-2">
          <p className="text-gray-600 mr-2">Rating:</p>
          <div className="flex">
            {Array(maxRating)
              .fill(0)
              .map((_, index) => (
                <span
                  key={index}
                  className={`text-xl ${
                    index < rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-blue-600">HealValley</h1>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl mx-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search doctors, specialities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Navigation Items */}
            <div className="flex items-center space-x-4">
              {/* Messages */}
              <button className="p-2 hover:bg-gray-100 rounded-full relative">
                <FaEnvelope className="text-gray-600 text-xl" />
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  3
                </span>
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  className="p-2 hover:bg-gray-100 rounded-full"
                  onClick={() =>
                    setIsProfileDropdownOpen(!isProfileDropdownOpen)
                  }
                >
                  <FaUser className="text-gray-600 text-xl" />
                </button>

                {/* Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* swiper */}
      <div className="">
        <div className="carousel">
          <Swiper
            slidesPerView={1}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            spaceBetween={30}
            pagination={false}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <img
                src="https://www.healthcareitnews.com/sites/hitn/files/111521%205%20Year%20IT%20Telehealth%201200_0.jpg"
                alt="Slide 1"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOGGr-zzRbhCdSUJ3virwwgBLKxfeqekFXHg&s"
                alt="Slide 2"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7LO-A7Grq3Mm9YWZnZYjnFV8CJTcIWu231w&s"
                alt="Slide 3"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      {/* ... */}
      <h2 className="text-3xl font-bold mt-12 mb-6">Available Doctors</h2>
      <div className="flex flex-wrap gap-3 mb-6">
        {specialities.map((speciality) => (
          <button
            key={speciality}
            onClick={() => setActiveSpeciality(speciality)}
            className={`px-4 py-2 rounded-full border ${
              activeSpeciality === speciality
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600"
            } hover:bg-blue-500 hover:text-white transition`}
          >
            {speciality}
          </button>
        ))}
      </div>

      {/* Doctor Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredDoctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>
      <button className="see-more-btn">See more</button>
      {/* Frequently Appointed Section */}
      <h2 className="text-3xl font-bold mt-12 mb-6">Frequently Appointed</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {doctors
          .filter((doctor) => doctor.bookedDates.length > 0)
          .sort((a, b) => b.bookedDates.length - a.bookedDates.length)
          .map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
      </div>
      <button className="see-more-btn">See more</button>
      {/* Booking Modal */}
      {showBookingModal && selectedDoctor && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">{selectedDoctor.name}</h2>
            <p className="text-gray-600 mb-2">
              Speciality: {selectedDoctor.speciality}
            </p>
            <p className="text-gray-600 mb-4">
              Hospital: {selectedDoctor.hospital}
            </p>
            <h3 className="text-xl font-semibold mb-2">Available Dates</h3>
            <ul className="mb-4">
              {selectedDoctor.availableDates.map((date) => (
                <li key={date}>
                  <button
                    onClick={() => setSelectedDate(date)}
                    className={`px-4 py-2 rounded-md border ${
                      selectedDate === date
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-800"
                    } hover:bg-blue-500 hover:text-white transition`}
                  >
                    {date}
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
              >
                Close
              </button>
              <a href="/Checkout">
                <button
                  onClick={handleBooking}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition"
                >
                  Book Now
                </button>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default patient;
