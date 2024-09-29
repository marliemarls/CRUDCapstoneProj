import React, { useState } from "react";
import {Home} from "."

function Login({handleLogin}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const decryptPassword = async (encryptedPassword, key, iv) => {
    const decoder = new TextDecoder();
    const importedKey = await crypto.subtle.importKey(
      "raw",
      Uint8Array.from(atob(key), (c) => c.charCodeAt(0)),
      { name: "AES-GCM", length: 256 },
      false,
      ["decrypt"]
    );
    const decryptedData = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: Uint8Array.from(atob(iv), (c) => c.charCodeAt(0)),
      },
      importedKey,
      Uint8Array.from(atob(encryptedPassword), (c) => c.charCodeAt(0))
    );
    return decoder.decode(decryptedData);
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (!storedUser) {
        setError("User not found");
        return;
      }

      const decryptedPassword = await decryptPassword(
        storedUser.encryptedPassword,
        storedUser.key,
        storedUser.iv
      );

    
      if (storedUser.email === email && decryptedPassword === password) {
        console.log("Login successful"); 
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

  
  return  (
    <>
        <div className="prefix-hero max-h-full rounded">
          <div className="hero-content flex-col ">
            <div className="card flex-shrink-0 w-full max-w-sm max-h-sm shadow-2xl bg-base-100 ">
              <form className="card-body" onSubmit={handleSubmit}>
                {error && <div className="alert alert-error">{error}</div>}
                <div className="form-control">
                  <label className="label" htmlFor="email">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label" htmlFor="password">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control mt-6">
                  <button type="submit" className="btn btn-primary">Sign In</button>
                </div>
              </form>
            </div>
          </div>
        </div>
    </>
  );
}

// ... export statement ...
export default Login;
