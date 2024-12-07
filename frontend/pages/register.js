import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import "@/styles/register.css";

export default function DoctorRegister() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [experience, setExperience] = useState("");
  const [hospital, setHospital] = useState("");
  const [payPerHour, setPayPerHour] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const doctorData = {
      firstName,
      lastName,
      specialization,
      email,
      contactInfo: {
        phone,
        address,
      },
      experience: Number(experience),
      hospital,
      payPerHour: Number(payPerHour),
      password,
      confirmPassword,
    };

    try {
      const response = await axios.post("/api/doctor", doctorData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        router.push("/login");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="register-container">
      <img src="" alt="Logo" className="logo" />
      <h1>Register as a Doctor</h1>
      <p className="login-link">
        Already have an account? <Link href="/login">Login</Link>
      </p>
      <form className="reg-form" onSubmit={handleSubmit}>
        <div className="name">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <input
          type="text"
          placeholder="Specialization"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Years of Experience"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Hospital"
          value={hospital}
          onChange={(e) => setHospital(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Pay Per Hour"
          value={payPerHour}
          onChange={(e) => setPayPerHour(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <Link href="/logiin">
          <button className="register-button" type="submit">
            Create Account
          </button>
        </Link>
      </form>
    </div>
  );
}
