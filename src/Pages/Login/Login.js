import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import AuthContext from "../../Components/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { setAuthToken } = useContext(AuthContext);
  const [token, setToken] = useState("");

  function eventHandler(event) {
    setToken(event.target.value);
  }

  function submitHandler(event) {
    event.preventDefault();
    setAuthToken(token);
    navigate("dashboard");
  }

  return (
    <div className="login">
      <h1 className="login--header">Login with your token</h1>
      <form onSubmit={submitHandler}>
        <input
          name="token"
          value={token}
          className="login--form--token"
          type="password"
          placeholder="Token"
          onChange={eventHandler}
        />
        <br />
        <button className="login--form--button">Login</button>
        <br />
        <Link style={{ color: "#7683F7" }} to="/registration">
          Create new account
        </Link>
      </form>
    </div>
  );
}
