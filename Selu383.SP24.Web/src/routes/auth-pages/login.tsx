import { useFetch } from "use-http";
import { FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../features/authentication/AuthContext";
import "../layout.css";

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
      <div className="container">
        <header className="header">
          <div className="logo">EnStay</div>
        </header>
        <div className="body-content">
          <h1 className="location-label">Login Page</h1>
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
            <button className="search-btn" type="submit" disabled={loading}>
              Submit
            </button>
            <button className="close-btn" onClick={() => navigate("/")}>
              Back Home
            </button>
          </form>
        </div>
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
