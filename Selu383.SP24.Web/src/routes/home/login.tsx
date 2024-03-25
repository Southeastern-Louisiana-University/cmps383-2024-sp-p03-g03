import { useFetch } from "use-http";
import { FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../features/authentication/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("galkadi");
  const [password, setPassword] = useState("Password123!");
  const [error, setError] = useState("");

  const authContext = useContext(AuthContext);

  const { loading, post } = useFetch("/api/authentication/login", {
    method: "post",
    onNewData: (_, x) => {
      if (typeof x === "string") {
        setError(x);
      } else if (typeof x === "object") {
        console.log("we logged in as: ");
        console.log(x);
        authContext?.setUser(x);
        navigate("/");
      }
    },
  });

  return (
    <>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input id="email" value={userName} onChange={(e) => setUserName(e.target.value)} type="text" autoComplete="email" placeholder="Email" required />
        <label htmlFor="password">Password</label>
        <input id="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" autoComplete="password" required />
        {loading ? "Checking Login..." : null}
        {error ? error : null}
        <button type="submit" disabled={loading}>
          Submit
        </button>
      </form>
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
