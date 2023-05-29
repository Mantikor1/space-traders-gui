import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import EyeOpen from "../../assets/eye_open.svg";
import AuthContext from "../../Components/AuthContext";

export default function Registration() {
  const { setAuthToken } = useContext(AuthContext);

  const [user, setUser] = useState({
    symbol: "",
    faction: "default",
  });

  const [token, setToken] = useState({
    value: "",
    visible: false,
  });

  // Error to display after fetch request
  const [error, setError] = useState("");

  function eventHandler(event) {
    setUser((prevUser) => ({
      ...prevUser,
      [event.target.name]: event.target.value,
    }));
  }

  async function submitHandler(event) {
    event.preventDefault();

    // Return if no faction got selected (default)
    if (user.faction === "default") {
      return;
    }

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        symbol: user.symbol,
        faction: user.faction,
      }),
    };

    const response = await fetch(
      "https://api.spacetraders.io/v2/register",
      options
    );

    // catch error from fetch request
    if (!response.ok) {
      const errorMessage = await response.json();

      // Check if there is a displayable error message
      if (errorMessage.error.data.symbol[0]) {
        setError(errorMessage.error.data.symbol[0]);
      }
      console.log(response.status);
      return;
    }

    // Clear error after succesfull registration
    setError("");

    const { data } = await response.json();
    setToken((prevToken) => ({
      ...prevToken,
      value: data.token,
    }));

    setAuthToken(data.token);
  }

  function changeVisiblity() {
    setToken((prevToken) => ({
      ...prevToken,
      visible: !prevToken.visible,
    }));
  }

  return (
    <div className="registration">
      <h1 className="registration--header">Choose a username</h1>
      <form onSubmit={submitHandler}>
        <input
          name="symbol"
          value={user.symbol}
          className="registration--form--username"
          type="text"
          minLength="3"
          maxLength="13"
          placeholder="Username"
          onChange={eventHandler}
          required
        />
        <br />
        <select
          className="registration--form--faction"
          name="faction"
          value={user.faction}
          onChange={eventHandler}
        >
          <option value="default" disabled>
            Choose a faction
          </option>
          <option value={"COSMIC"}>Cosmic</option>
          <option value={"VOID"}>Void</option>
          <option value={"GALACTIC"}>Galactic</option>
          <option value={"QUANTUM"}>Quantum</option>
          <option value={"DOMINION"}>Dominion</option>
        </select>
        <br />
        {error ? <p className="registration--errorMessage">{error}</p> : null}
        {/* Only render if there is no token already set */}
        {token.value ? null : (
          <button className="registration--form--button">
            Create new account
          </button>
        )}
      </form>
      {/* Show a button to display the token if there is one */}
      {token.value ? (
        <>
          <p className="registration--successMessage">
            Successfully registered!
          </p>
          <button className="registration--token">
            <img src={EyeOpen} alt="Eye open" onClick={changeVisiblity} />
            <div className="registration--token--text">
              {token.visible ? token.value : "Show Token"}
            </div>
          </button>
        </>
      ) : null}
      {/* Render a continue button if the token is set */}
      {token.value ? (
        <>
          <br />
          <Link to="../dashboard">
            <button className="registration--form--button">
              Continue (Save your token!)
            </button>
          </Link>
        </>
      ) : null}
    </div>
  );
}
