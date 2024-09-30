import React from "react";
import { Route, Routes as R } from "react-router-dom";
import {
  Home,
  Login,
  Profile,
  Search,
  Register,
  AuthWrapper,
  Playlist,
  TrackUpload,
  LandingPage,
} from ".";

function Routes({ handleLogin }) {
  return (
    <R>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/search" element={<Search />} />
      <Route path="/playlist" element={<Playlist />} />
      <Route path="/landing" element={<LandingPage />} />
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
