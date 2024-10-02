import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const encryptPassword = async (password) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const key = await crypto.subtle.generateKey(
      { name: "AES-GCM", length: 256 },
      true,
      ["encrypt", "decrypt"]
    );
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encryptedData = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv: iv },
      key,
      data
    );
    const exportedKey = await crypto.subtle.exportKey("raw", key);
    return {
      encryptedPassword: btoa(
        String.fromCharCode.apply(null, new Uint8Array(encryptedData))
      ),
      key: btoa(String.fromCharCode.apply(null, new Uint8Array(exportedKey))),
      iv: btoa(String.fromCharCode.apply(null, iv)),
    };
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { encryptedPassword, key, iv } = await encryptPassword(password);
      const response = await fetch ("http://localhost:8080/api/users/register");
      const mydata = await response.json();
      console.log(mydata);
      
      const user = { firstName, lastName, username, email, dob, gender, encryptedPassword, key, iv };
      console.log(user)
      localStorage.setItem("user", JSON.stringify(user));
      console.log("User registered:", username, firstName, lastName, email);
      setIsRegistered(true);
    } catch (error) {
      console.error("Registration error:", error);
      setError("An error occurred during registration");
    }
  };

  if (isRegistered) {
    return (
      
        <div className="card-body px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-center text-keppel">
            Registration Successful!
          </h2>
          <p className="mb-4 text-center">
            Thank you for registering. You can now log in to your account.
          </p>
          <div className="flex justify-center">
            <Link
              to="/login"
              className="btn btn-primary w-full max-w-xs bg-saffron hover:bg-keppel text-onyx"
            >
              Go to Login
            </Link>
          </div>
        </div>
      
    );
  }

  return (
    <>

        <form onSubmit={HandleSubmit}>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <div className="mt-4">
            <div className="mb-4">
              <label htmlFor="firstName" className="block text-sm font-medium text-onyx">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-3 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-keppel"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="block text-sm font-medium text-onyx">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-3 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-keppel"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-onyx">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-keppel"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="block text-sm font-medium text-onyx">
                Birthdate
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full px-3 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-keppel"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="block text-sm font-medium text-onyx">
                Gender
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-3 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-keppel"
              />
            </div>
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
                Sign Up
              </button>
            </div>
          </div>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-keppel hover:underline">
              Log in
            </Link>
          </p>
        </div>
        </>
  );
}

export default Register;