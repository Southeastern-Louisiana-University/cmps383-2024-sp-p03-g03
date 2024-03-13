import { useEffect, useState } from "react";
import "./layout.css";
import "../index.css";

// Sample hotel data
const hotelsData = [
  {
    id: 1,
    name: "Holiday Inn",
    roomTypes: ["1 bed 2 bath", "2 beds 2 bath"],
  },
  {
    id: 2,
    name: "Courtyard by Marriott",
    roomTypes: ["1 bed 1 bath", "2 beds 1 bath"],
  },
  {
    id: 3,
    name: "Quality Inn",
    roomTypes: ["1 bed 1 bath", "2 beds 1 bath"],
  },
];

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

        <div className={`sidebar ${isMenuOpen ? "sidebar-open" : ""}`}>
          <button className="close-btn" onClick={closeSidebar}>
            X
          </button>
          <ul>
            <li>Login</li>
            <li>Sign Up</li>
          </ul>
        </div>

        <div className="body-content">
          <div className="hotel-cards">
            {hotelsData.map((hotel) => (
              <div className="card" key={hotel.id}>
                <h3>{hotel.name}</h3>
                <p>Room Types Available:</p>
                <ul>
                  {hotel.roomTypes.map((type, index) => (
                    <li key={index}>{type}</li>
                  ))}
                </ul>
                <button className="book-now-btn">Book Now</button>
              </div>
            ))}
          </div>
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
