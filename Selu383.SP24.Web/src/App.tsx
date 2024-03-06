import './App.css'
function App() {

  return (
      <>
          <div className="container">
            <header className="header">
                <div className="logo">Logo</div>
                <nav className="navigation">
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Login</a></li>
                        <li><a href="#">Sign Up</a></li>
                    </ul>
                </nav>
              </header>
          </div>

          <div>
              <div className="treeline"></div>

          <footer className="footer">
              <div className="footer-content">
                  <p>&copy; 2024 Enstay. All Rights Reserved.</p>
              </div>
              </footer>
          </div>
        </>
    );
}

export default App
