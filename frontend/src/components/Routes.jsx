import { Route, Routes as R } from "react-router-dom";
import { Home, Login, Profile } from ".";
import { useEffect } from "react";
function Routes() {
  return (
    <>
      <R>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </R>
    </>
  );
}

export default Routes;
