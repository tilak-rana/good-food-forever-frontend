import React, { useState } from "react";
import navHook from "./navHook";

const Navbar = ({
  isLoggedIn,
  userName,
  userProfilePic,
  navigate,
  onLogout,
}) => {
  const [profilePicInput, setProfilePicInput] = useState(null);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  const handleLogoutClick = () => {
    // Clear user data and profile picture input
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userProfilePic");

    setProfilePicInput(null);

    // Trigger the onLogout prop to update the parent component's state
    onLogout();

    // Redirect to the home page after logout
    navigate("/");
  };

  const handleProfilePicClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicInput(reader.result);
        localStorage.setItem("userProfilePic", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const fileInput = React.createRef();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
      <div className="container-fluid justify-content-end">
        <div id="menu" className="d-flex">
          {isLoggedIn ? (
            <>
              <img
                src={
                  profilePicInput ||
                  userProfilePic ||
                  "./assets/default-profile.png"
                }
                alt="Profile"
                className="rounded-circle mt-2"
                style={{ width: "40px", height: "40px", cursor: "pointer" }}
                onClick={handleProfilePicClick}
              />
              <input
                type="file"
                accept="image/*"
                ref={fileInput}
                onChange={handleProfilePicChange}
                style={{ display: "none" }}
              />
              <span className="text-dark fs-3 ms-2 mt-2 me-4 mb-1 fw-bold">
                {userName}
              </span>
              <button
                className="btn btn-success text-light fs-4 ms-2 pd-2"
                type="submit"
                onClick={handleLogoutClick}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="btn btn-transparent text-light f-3"
                type="submit"
                onClick={handleLoginClick}
              >
                Login
              </button>
              <button
                type="button"
                className="btn btn-outline-light ms-2"
                onClick={handleSignupClick}
              >
                Create an account
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default navHook(Navbar);
