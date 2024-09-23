import { Route, Routes as R } from "react-router-dom";
import { Home, Login, Profile, Search } from ".";

function Routes() {
  return (
    <>
      <R>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<Search />} />
      </R>
    </>
  );
}

export default Routes;
