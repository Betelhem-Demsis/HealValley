import React, { useState } from "react";

const Checkout = () => {
  // Sample data; replace with real data from your backend or state management
  const appointmentDetails = {
    doctorName: "Dr. Sarah Johnson",
    appointmentDate: "12th Dec 2024, 10:00 AM",
    consultationFee: 150,
  };

  // Form states
  const [formData, setFormData] = useState({
    nameOnCard: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });

  // Handle form inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = (e) => {
    e.preventDefault();
    // Validate and submit payment
    console.log("Payment details submitted:", formData);
    alert("Payment successful! Appointment confirmed.");
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-2xl font-semibold mb-4">Checkout</h1>

        {/* Appointment Details */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Appointment Details</h2>
          <p>
            <span className="font-semibold">Doctor:</span>{" "}
            {appointmentDetails.doctorName}
          </p>
          <p>
            <span className="font-semibold">Date:</span>{" "}
            {appointmentDetails.appointmentDate}
          </p>
          <p>
            <span className="font-semibold">Consultation Fee:</span> $
            {appointmentDetails.consultationFee}
          </p>
        </div>

        {/* Payment Form */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
          <form onSubmit={handlePayment}>
            {/* Name on Card */}
            <div className="mb-4">
              <label htmlFor="nameOnCard" className="block mb-2 font-medium">
                Name on Card
              </label>
              <input
                type="text"
                name="nameOnCard"
                id="nameOnCard"
                placeholder="Enter name as on card"
                value={formData.nameOnCard}
                onChange={handleChange}
                className="w-full border p-2 rounded-md"
                required
              />
            </div>

            {/* Card Number */}
            <div className="mb-4">
              <label htmlFor="cardNumber" className="block mb-2 font-medium">
                Card Number
              </label>
              <input
                type="text"
                name="cardNumber"
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={formData.cardNumber}
                onChange={handleChange}
                className="w-full border p-2 rounded-md"
                required
              />
            </div>
            {/* Expiry and CVV */}
            <div className="flex space-x-4 mb-4">
              <div>
                <label htmlFor="expiryMonth" className="block mb-2 font-medium">
                  Expiry Month
                </label>
                <select
                  name="expiryMonth"
                  id="expiryMonth"
                  value={formData.expiryMonth}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-md"
                  required
                >
                  <option value="">MM</option>
                  {[...Array(12).keys()].map((m) => (
                    <option key={m + 1} value={m + 1}>
                      {String(m + 1).padStart(2, "0")}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="expiryYear" className="block mb-2 font-medium">
                  Expiry Year
                </label>
                <select
                  name="expiryYear"
                  id="expiryYear"
                  value={formData.expiryYear}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-md"
                  required
                >
                  <option value="">YYYY</option>
                  {[...Array(10).keys()].map((y) => (
                    <option key={y} value={2024 + y}>
                      {2024 + y}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="cvv" className="block mb-2 font-medium">
                  CVV
                </label>
                <input
                  type="text"
                  name="cvv"
                  id="cvv"
                  placeholder="123"
                  value={formData.cvv}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-md"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-md font-medium hover:bg-purple-700"
            >
              Pay ${appointmentDetails.consultationFee}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
