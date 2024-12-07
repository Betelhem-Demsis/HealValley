import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import "@/styles/login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post("/api/v1/users/login", loginData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        router.push("/userdashboard");
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
    <div className="login-container">
      <img src="" alt="Logo" className="logo" />
      <h1>Welcome Back</h1>
      <p className="register-link">
        Don't have an account? <Link href="/signup">Register</Link>
      </p>
      <form className="login-form" onSubmit={handleSubmit}>
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
        <Link href="/Patient">
          <button type="submit" className="login-button">
            Login
          </button>
        </Link>
      </form>
    </div>
  );
}
