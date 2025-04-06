import React, { useState } from "react";
import Button from "../components/ui/button";
import "./registration.css";
import { userExists } from "../api/userApi";
import { useNavigate } from "react-router-dom";

export default function Registration() {
  const Navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFormSubmit = async () => {
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
    else if (userName.length < 4 || passWord.length < 4) {
      setErrorMessage("Password and Username must be at least 4 characters")
      return false;
    }
    const response = await userExists(userName);
    if(response.status === 200) {
      setErrorMessage("Username already exists!");
      return false;
    }


    // 
    localStorage.setItem("temp_username", userName);
    localStorage.setItem("temp_password", passWord);
    setErrorMessage("");
    console.log("Form submitted:", { userName, passWord });
    Navigate("/enter_stats");
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
            className="submit-button"
          />
        </div>
      </form>
    </div>
  );
}