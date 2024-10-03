import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login({ handleLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data && data.id) {
        localStorage.setItem("user", JSON.stringify(data));
        handleLogin();
        setIsLoggedIn(true);
      } else {
        setError(data || "Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login. Please try again.");
    }
  };

  if (isLoggedIn) {
    return (
      <div className="card-body px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-keppel">
          Login Successful!
        </h2>
        <p className="mb-4 text-center">
          Welcome back! You are now logged in.
        </p>
        <div className="flex justify-center">
          <Link
            to="/home"
            className="btn btn-primary w-full max-w-xs bg-saffron hover:bg-keppel text-onyx"
          >
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="card-body px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-keppel">Login</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="mt-4">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-onyx">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-keppel"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-onyx">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-keppel"
            />
          </div>
          <div className="flex items-baseline justify-between">
            <button
              type="submit"
              className="btn btn-primary w-full px-6 py-2 mt-4 text-white bg-saffron rounded-lg hover:bg-keppel"
            >
              Sign In
            </button>
          </div>
        </div>
      </form>
      <div className="mt-4 text-center">
        <p className="text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-keppel hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;