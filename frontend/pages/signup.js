import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import "@/styles/signup.css";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const userData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
    };

    try {
      const response = await axios.post("/api/v1/patient", userData, {
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
      <img src="" alt="" className="logo" />
      <h1>Register Here</h1>
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
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <Link href="/login">
          <button className="register-button" type="submit">
            Create Account
          </button>
        </Link>
      </form>
    </div>
  );
}
