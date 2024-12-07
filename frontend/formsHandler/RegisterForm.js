import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    gender: "",
    phoneNumber: "",
    email: "",
    emergencyContact: {
      name: "",
      phone: "",
      relation: "",
    },
  });

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [invalidFields, setInvalidFields] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("emergencyContact.")) {
      const emergencyField = name.split(".")[1];
      setFormData((prevState) => ({
        ...prevState,
        emergencyContact: {
          ...prevState.emergencyContact,
          [emergencyField]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const apiUrl = "http://127.0.0.1:8000/api/v1/member";
      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true,
      });

      console.log("Form submitted successfully:", response.data);
      setSuccess(true);
      setFormData({
        firstName: "",
        lastName: "",
        address: "",
        gender: "",
        phoneNumber: "",
        email: "",
        emergencyContact: {
          name: "",
          phone: "",
          relation: "",
        },
      });
      setStep(1);
    } catch (error) {
      console.error("Error submitting form:", error);
      setError(
        error.response?.data?.message ||
          "Error submitting form. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const validateStep1 = () => {
    const newInvalidFields = {};

    if (!formData.firstName) newInvalidFields.firstName = true;
    if (!formData.lastName) newInvalidFields.lastName = true;
    if (!formData.address) newInvalidFields.address = true;
    if (!formData.gender) newInvalidFields.gender = true;
    if (!formData.phoneNumber) newInvalidFields.phoneNumber = true;
    if (!formData.email) newInvalidFields.email = true;

    if (Object.keys(newInvalidFields).length > 0) {
      setInvalidFields(newInvalidFields);
      setError(
        <p className="text-red-600 py-8">
          Please fill in all fields before proceeding.
        </p>
      );
      return false;
    }

    setInvalidFields({});
    setError("");
    return true;
  };

  return (
    <div className="container">
      {success ? (
        <div className="success-message">
          <h2>Registration Successful!</h2>
          <p>
            Thank you for registering. Your information has been submitted
            successfully.sign up to see your membership status
          </p>
          <Link href="/signup">
          <button>
            Create Account
          </button>
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <div
                className={`form-group ${
                  invalidFields.firstName ? "invalid" : ""
                }`}
              >
                <label htmlFor="firstName">First Name:</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                {invalidFields.firstName && (
                  <p className="error-message">Please fill in this field.</p>
                )}
              </div>

              <div
                className={`form-group ${
                  invalidFields.lastName ? "invalid" : ""
                }`}
              >
                <label htmlFor="lastName">Last Name:</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
                {invalidFields.lastName && (
                  <p className="error-message">Please fill in this field.</p>
                )}
              </div>

              <div
                className={`form-group ${
                  invalidFields.address ? "invalid" : ""
                }`}
              >
                <label htmlFor="address">Address:</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                ></textarea>
                {invalidFields.address && (
                  <p className="error-message">Please fill in this field.</p>
                )}
              </div>

              <div
                className={`form-group ${
                  invalidFields.gender ? "invalid" : ""
                }`}
              >
                <label>Gender:</label>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={formData.gender === "Male"}
                      onChange={handleChange}
                      required
                    />{" "}
                    Male
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={formData.gender === "Female"}
                      onChange={handleChange}
                    />{" "}
                    Female
                  </label>
                </div>
                {invalidFields.gender && (
                  <p className="error-message">Please select your gender.</p>
                )}
              </div>

              <div
                className={`form-group ${
                  invalidFields.phoneNumber ? "invalid" : ""
                }`}
              >
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
                {invalidFields.phoneNumber && (
                  <p className="error-message">Please fill in this field.</p>
                )}
              </div>

              <div
                className={`form-group ${invalidFields.email ? "invalid" : ""}`}
              >
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {invalidFields.email && (
                  <p className="error-message">Please fill in this field.</p>
                )}
              </div>

              <button type="button" onClick={handleNext}>
                Next
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <fieldset>
                <legend>Emergency Contact Information</legend>
                <div className="form-group">
                  <label htmlFor="emergencyContactName">Contact Name:</label>
                  <input
                    type="text"
                    id="emergencyContactName"
                    name="emergencyContact.name"
                    value={formData.emergencyContact.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="emergencyContactPhone">
                    Contact Phone Number:
                  </label>
                  <input
                    type="tel"
                    id="emergencyContactPhone"
                    name="emergencyContact.phone"
                    value={formData.emergencyContact.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="emergencyContactRelation">Relation:</label>
                  <input
                    type="text"
                    id="emergencyContactRelation"
                    name="emergencyContact.relation"
                    value={formData.emergencyContact.relation}
                    onChange={handleChange}
                    required
                  />
                </div>
              </fieldset>

              <div className="below-button">
                <button type="button" onClick={handleBack}>
                  Back
                </button>
                <button type="submit" disabled={loading}>
                  {loading ? "Submitting..." : "Submit Registration"}
                </button>
              </div>
            </>
          )}

          {error && <p className="error">{error}</p>}
        </form>
      )}
    </div>
  );
}
