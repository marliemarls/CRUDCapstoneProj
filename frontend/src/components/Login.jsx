import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login({ handleLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const decryptPassword = async (encryptedPassword, key, iv) => {
  //   const decoder = new TextDecoder();
  //   const importedKey = await crypto.subtle.importKey(
  //     "raw",
  //     Uint8Array.from(atob(key), (c) => c.charCodeAt(0)),
  //     { name: "AES-GCM", length: 256 },
  //     false,
  //     ["decrypt"]
  //   );
  //   const decryptedData = await crypto.subtle.decrypt(
  //     {
  //       name: "AES-GCM",
  //       iv: Uint8Array.from(atob(iv), (c) => c.charCodeAt(0)),
  //     },
  //     importedKey,
  //     Uint8Array.from(atob(encryptedPassword), (c) => c.charCodeAt(0))
  //   );
  //   return decoder.decode(decryptedData);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
           if (!storedUser) {
        setError("User not found");
        return;
      }
      const response = await fetch ("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email,password}),
      })
      const mydata = await response.json()
      // console.log(mydata)
      localStorage.setItem("user",JSON.stringify(mydata))

      // const decryptedPassword = await decryptPassword(
      //   storedUser.encryptedPassword,
      //   storedUser.key,
      //   storedUser.iv
      // );
      // console.log(storedUser, email, password)
      if (storedUser.email === email) {

        // console.log("Login successful");
        handleLogin();
        setIsLoggedIn(true);
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login");
    }


   
  };
  const navi = useNavigate();
 const handleRedi = (e) => {
    navi('/login');
    }
  if (isLoggedIn) {
    return (
     
        <div className="card=body px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
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
<>
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
                onClick={handleRedi}
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
        </>
  );
}

export default Login;