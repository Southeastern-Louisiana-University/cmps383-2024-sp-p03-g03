import { useEffect, useState } from "react";
import "./layout.css";
import UserDto from "../features/authentication/UserDto";
import { useFetch } from "use-http";
import AuthContext from "../features/authentication/AuthContext";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function MainLayout() {
  const [currentUser, setCurrentUser] = useState<null | undefined | UserDto>(undefined);

  useFetch(
    "https://selu383-sp24-p03-g03.azurewebsites.net/api/authentication/me",
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      <AuthContext.Provider value={{ user: currentUser, setUser: setCurrentUser }}>
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
              <Button className="login-singup-btn" onClick={() => navigate("/login")}>
                Login
              </Button>
              <br />
              <br />
              <Button className="login-singup-btn" onClick={() => navigate("/signup")}>
                Sign Up
              </Button>
            </ul>
          </div>

          <div className="body-content">
            <label className="location-label" htmlFor="search">
              What city will you be staying in?
            </label>
            <br />
            {/* <input className="search-bar" id="search" name="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value ?? "")}></input> */}
            <br />
            <Button className="search-btn" onClick={() => navigate("/hotels")}>
              List Hotels
            </Button>
          </div>

          <footer className="footer">
            <div className="footer-content">
              <p>&copy; 2024 EnStay. All Rights Reserved.</p>
            </div>
          </footer>
        </div>
      </AuthContext.Provider>
    </>
  );
}
