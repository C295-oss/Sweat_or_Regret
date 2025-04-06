import React, { useState } from "react";
import Button from "../components/ui/button";
import "./registration.css";

export default function Registration() {
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFormSubmit = () => {
    if (passWord !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return false;
    } else if (!passWord) {
      setErrorMessage("Invalid password");
      return false;
    } else if (!userName) {
      setErrorMessage("Invalid Username");
      return false;
    }

    localStorage.setItem("local_user_name", userName);
    localStorage.setItem("local_password", passWord);
    setErrorMessage("");
    console.log("Form submitted:", { userName, passWord });

    return true;
  };

  return (
    <div className="flex w-screen h-screen flex-col items-center justify-center p-2 bg-zinc-800">
      <h1 className="registration-header">Registration</h1>

      <form>
        <div className="input-container">
          <label htmlFor="userName">Username:</label>
          <input
            type="text"
            id="userName"
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
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            required
          />
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="button-container">
          <Button
            label="Next"
            onClick={handleFormSubmit}
            navigateTo="/enter_stats"
            className="submit-button"
          />
        </div>
      </form>
    </div>
  );
}