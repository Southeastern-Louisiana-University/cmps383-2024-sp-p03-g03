import { useFetch } from "use-http";
import { FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../features/authentication/AuthContext";
import "../layout.css";
import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function Login() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const authContext = useContext(AuthContext);

  const { loading, post } = useFetch("api/authentication/login", {
    method: "post",
    onNewData: (_, x) => {
      if (typeof x === "string") {
        setError(x);
      } else if (typeof x === "object") {
        console.log("logged in as: ");
        console.log(x);
        authContext?.setUser(x);
        navigate("/");
      }
    },
  });

  return (
    <>
      <AppBar color="success" position="fixed">
        <Toolbar sx={{ padding: 0.8 }}>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu">
            <MenuIcon fontSize="inherit" />
          </IconButton>
          <Typography onClick={() => navigate("/")} align="center" variant="h6" component="div" sx={{ flexGrow: 1, fontSize: 30, cursor: "pointer" }}>
            Login
          </Typography>
          <Button onClick={() => navigate("/")} variant="contained" color="success">
            Home
          </Button>
        </Toolbar>
      </AppBar>
      <div className="body-content">
        <form onSubmit={handleSubmit}>
          <label className="location-label" htmlFor="email">
            Username:
          </label>
          <br />
          <input className="search-bar" id="email" value={userName} onChange={(e) => setUserName(e.target.value)} type="text" autoComplete="email" placeholder="Username" required />
          <br />
          <label className="location-label" htmlFor="password">
            Password:
          </label>
          <br />
          <input className="search-bar" id="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" autoComplete="password" required />
          <br />
          <br />
          {loading ? "Logging in..." : null}
          {error ? error : null}
          <Button className="Button" disabled={loading}>
            Login
          </Button>
        </form>
      </div>
    </>
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) {
      return;
    }

    post({
      userName: userName,
      password: password,
    });
  }
}
