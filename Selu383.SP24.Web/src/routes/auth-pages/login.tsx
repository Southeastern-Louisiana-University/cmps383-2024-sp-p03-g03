import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useState, useContext, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "use-http";
import AuthContext from "../../features/authentication/AuthContext";

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

  return (
    <>
      <AppBar sx={{ bgcolor: "#10b986" }} position="fixed">
        <Toolbar sx={{ padding: 0.8 }}>
          <Typography
            onClick={() => navigate("/")}
            align="left"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontSize: 30, cursor: "pointer" }}
          >
            Login
          </Typography>
          <Button
            onClick={() => navigate("/")}
            variant="contained"
            sx={{
              bgcolor: "#10b986",
              "&:hover": {
                bgcolor: "#0a936e",
              },
            }}
          >
            Home
          </Button>
        </Toolbar>
      </AppBar>
      <div className="body">
        <div className="body-content-login">
          <form onSubmit={handleSubmit}>
            <label className="location-label" htmlFor="email">
              Username:
            </label>
            <br />
            <input
              className="search-bar"
              id="email"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              autoComplete="email"
              placeholder="Username"
              required
            />
            <br />
            <label className="location-label" htmlFor="password">
              Password:
            </label>
            <br />
            <input
              className="search-bar"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              autoComplete="password"
              required
            />
            <br />
            <br />
            {loading ? "Logging in..." : null}
            {error ? error : null}
            <Button
              type="submit"
              sx={{
                bgcolor: "#10b986",
                "&:hover": {
                  bgcolor: "#0a936e",
                },
              }}
              variant="contained"
              disabled={loading}
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
