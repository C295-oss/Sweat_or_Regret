import React, { useState } from "react";

export default function Registration() {
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate if passwords match
    if (passWord !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    // Proceed with form submission (here we just log the values)
    console.log("Form submitted:", { userName, passWord });
    setErrorMessage(""); // Clear error message if validation passes
  };

  return (
    <div className="registration">
      <h1>Registration</h1>

      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="userName">Username:</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>

        <div className="input-container">
          <label htmlFor="passWord">Password:</label>
          <input
            type="password"
            id="passWord"
            name="passWord"
            value={passWord}
            onChange={(e) => setPassWord(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        <div className="input-container">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            required
          />
        </div>

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        <br />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
