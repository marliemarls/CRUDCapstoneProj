import { Route, Routes as R } from "react-router-dom";
import { Home, Login, Profile, Search, Register, AuthWrapper } from ".";

function Routes({ isLoggedIn, handleLogin }) {
  return (
    <>
      <R>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<Search />} />
        {/* <Route path="/playlist" element={<Playlist />} /> */}
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
    </>
  );
}

export default Routes;
