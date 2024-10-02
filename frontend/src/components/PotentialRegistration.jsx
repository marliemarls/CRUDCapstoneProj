import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
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
      
        // const user = { id, firstName, lastName, username, email, encryptedPassword, key, iv };
      
      const newUser = {
        firstName,
        lastName,
        username,
        email,
        gender,
        dob,
        encryptedPassword,
        key,
        iv
      };

      const response = await fetch('http://localhost:8080/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();

      if (response.ok) {
        // Store user data in localStorage
        const userForLocalStorage = {
          ...data,
          key,
          iv
        };
        localStorage.setItem("user", JSON.stringify(userForLocalStorage));
        console.log("User registered:", username, firstName, lastName, email);
        setIsRegistered(true);
      } else {
        setError(data || "Email is already in use");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("An error occurred during registration");
    }
  };

  if (isRegistered) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4 text-keppel">
          Registration Successful!
        </h2>
        <p className="mb-4">
          Thank you for registering. You can now log in to your account.
        </p>
        <Link
          to="/login"
          className="bg-saffron text-onyx px-4 py-2 rounded hover:bg-keppel"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <>
    <div className="prefix-hero max-h-full rounded">
    <div className="hero-content flex-col ">
    <div className="card flex-shrink-0 w-full max-w-sm max-h-sm shadow-2xl bg-neutral-content">
    <form className="card-body" onSubmit={HandleSubmit}>
      {error && <p className="text-red-500">{error}</p>}
      <div>
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
          className="mt-1 block w-full px-3 py-2 bg-timberwolf border border-onyx rounded-md shadow-sm focus:outline-none focus:ring-keppel focus:border-keppel"
        />
      </div>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-onyx">
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-timberwolf border border-onyx rounded-md shadow-sm focus:outline-none focus:ring-keppel focus:border-keppel"
        />
      </div>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-onyx">
          User Name
        </label>
        <input
          type="text"
          id="username"
          name="userame"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-timberwolf border border-onyx rounded-md shadow-sm focus:outline-none focus:ring-keppel focus:border-keppel"
        />
      </div>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-onyx">
          Gender
        </label>
        <input
          type="text"
          id="gender"
          name="gender"
          required
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-timberwolf border border-onyx rounded-md shadow-sm focus:outline-none focus:ring-keppel focus:border-keppel"
        />
      </div>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-onyx">
          Birthdate
        </label>
        <input
          type="text"
          id="dob"
          name="dob"
          required
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-timberwolf border border-onyx rounded-md shadow-sm focus:outline-none focus:ring-keppel focus:border-keppel"
        />
      </div>
      <div>
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
          className="mt-1 block w-full px-3 py-2 bg-timberwolf border border-onyx rounded-md shadow-sm focus:outline-none focus:ring-keppel focus:border-keppel"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-onyx"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-timberwolf border border-onyx rounded-md shadow-sm focus:outline-none focus:ring-keppel focus:border-keppel"
        />
      </div>
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-platinum bg-saffron hover:bg-keppel focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-keppel btn-secondary"
        >
          Sign Up
        </button>
      </div>
    </form>
    </div>
    </div>
    </div>
    </>
  );
}

export default Register;