import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  return (
        <>
            <header className="header">
                <div className="logo">Enstay</div>
                <nav className="navigation">
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Explore</a></li>
                        <li><a href="#">Host</a></li>
                        <li><a href="#">Login</a></li>
                        <li><a href="#">Sign Up</a></li>
                    </ul>
                </nav>
            </header>

            <section className="hero">
                <div className="hero-content">
                    <h1>Welcome to Enstay</h1>
                    <p>Find the perfect place to stay, from apartments to vacation rentals, all around the world.</p>
                    <a href="#" className="btn">Explore Now</a>
                </div>
            </section>

            <footer className="footer">
                <div className="footer-content">
                    <p>&copy; 2024 Enstay. All Rights Reserved.</p>
                </div>
            </footer>
        </>
    );
}

export default App
