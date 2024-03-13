import { useEffect, useState } from "react";
import "./layout.css";
import "../index.css";

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    console.log("HomePage loaded");
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeSidebar = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className={`body ${isMenuOpen ? "menu-open" : ""}`}>
        <div className="container">
          <header className="header">
            <div className="logo">Enstay</div>
            <button className="burger-menu" onClick={toggleMenu}>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </button>
          </header>
        </div>

        {/* Sidebar Content */}
        <div className={`sidebar ${isMenuOpen ? "sidebar-open" : ""}`}>
          <button className="close-btn" onClick={closeSidebar}>
            X
          </button>
          <ul>
            <li>Login</li>
            <li>Sign Up</li>
          </ul>
        </div>

        <div>
          <footer className="footer">
            <div className="footer-content">
              <p>&copy; 2024 Enstay. All Rights Reserved.</p>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}

export function HotelPage() {
  useEffect(() => {
    console.log("Hotel Loaded");
  }, []);

  return <></>;
}
