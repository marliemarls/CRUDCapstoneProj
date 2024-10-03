import React from "react";
import { Route, Routes as R } from "react-router-dom";
import {
  Home,
  Login,
  Profile,
  Register,
  AuthWrapper,
  TrackUpload,
  LandingPage,
  // EditProfile,
  SingleTrack,
} from ".";

function Routes({ handleLogin }) {
  return (
    <R>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/singleTrack" element={<SingleTrack />} />
      <Route path="/profile" element={<Profile />} />
      <Route
        path="/upload"
        element={
          <AuthWrapper title="Upload Track">
            <TrackUpload />
          </AuthWrapper>
        }
      />
      <Route
        path="/login"
        element={
          <AuthWrapper title="Login">
            <Login handleLogin={handleLogin} />
          </AuthWrapper>
        }
      />
      <Route
        path="/register"
        element={
          <AuthWrapper title="Register">
            <Register />
          </AuthWrapper>
        }
      />
    </R>
  );
}

export default Routes;
