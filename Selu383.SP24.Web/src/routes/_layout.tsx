import { useEffect, useState } from "react";
import "./layout.css";

import { useNavigate } from "react-router-dom";
import useFetch from "use-http";
import AuthContext from "../features/authentication/AuthContext";
import UserDto from "../features/authentication/UserDto";

export default function MainLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<null | undefined | UserDto>(undefined);

  useFetch(
    "api/authentication/me",
    {
      onNewData: (_, x) => {
        console.log(x);
        if (typeof x === "object") {
          setCurrentUser(x);
        } else {
          setCurrentUser(null);
        }
      },
    },
    []
  );

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeSidebar = () => {
    setIsMenuOpen(false);
  };

  const navigate = useNavigate();

  useEffect(() => {
    console.log("layout loaded");
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ user: currentUser, setUser: setCurrentUser }}></AuthContext.Provider>
      <div className={`body ${isMenuOpen ? "menu-open" : ""}`}>
        <div className="container">
          <header className="header">
            <div className="logo">EnStay</div>
            <button className="burger-menu" onClick={toggleMenu}>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </button>
          </header>
        </div>

        <div className={`sidebar ${isMenuOpen ? "sidebar-open" : ""}`}>
          <button className="close-btn" onClick={closeSidebar}>
            X
          </button>
          <ul>
            <button className="button" onClick={() => navigate("/login")}>
              Login
            </button>
            <br />
            <br />
            <button className="button" onClick={() => navigate("/signup")}>
              Sign Up
            </button>
          </ul>
        </div>

        <div className="body-content">
          <label className="location-label" htmlFor="search">
            Start by finding hotels!
          </label>
          <br />
          <button className="button" onClick={() => navigate("/hotels")}>
            List Hotels
          </button>
        </div>

        <footer className="footer">
          <div className="footer-content">
            <p>&copy; 2024 EnStay. All Rights Reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
