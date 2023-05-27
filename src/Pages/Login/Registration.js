import { useState } from "react";

export default function Registration() {
  const [username, setUsername] = useState("");

  function eventHandler(event) {
    setUsername(event.target.value);
  }

  function submitHandler(event) {
    event.preventDefault();
    console.log(username);
  }

  return (
    <div className="registration">
      <h1 className="registration--header">Choose a username</h1>
      <form onSubmit={submitHandler}>
        <input
          name="username"
          value={username}
          className="registration--form--username"
          type="text"
          placeholder="Username"
          onChange={eventHandler}
        />
        <br />
        <button className="registration--form--button">
          Create new account
        </button>
      </form>
    </div>
  );
}
