import Button from "../components/ui/button.jsx";
import { useState, useEffect } from "react";
import { login } from "../api/userApi.jsx";
import { useNavigate } from "react-router-dom";


export default function Login() {

  const navigate = useNavigate();
  const [username, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    if(event.target.value.length < 20) {
      setLogin(event.target.value);
    }
  }

  const handlePasswordChange = (event) => {
    if(event.target.value.length < 20) {
      setPassword(event.target.value);
    }
  }

  async function handleLogin() {
    const user = username;
    const pass = password;
    console.log("user: ", user);
    console.log("pass: ", pass);

    if(user.length < 5 || pass.length < 5) {

      console.error("Username and password must be at least 5 characters long.");
      return;
    }

    // Perform login logic here (e.g., call API to authenticate user)
    try {
      const response = await login(user, pass);
      console.log("Login response:", response);
      if(response.status !== 200) {
        throw new Error("Login failed");
      }
      else{
        localStorage.setItem("local_username", user);
        localStorage.setItem("local_password", pass);
        localStorage.setItem("profile", response.profile);
        localStorage.setItem("stats", response.stats);
				localStorage.setItem("verify", true);
        navigate("/home");
      }
      // Handle successful login (e.g., redirect to home page)
    } catch (error) {
      console.error("Login error:", error);
      // Handle error (e.g., show error message to user)
    }
  }
	

  return (
    <div className="flex w-screen h-screen flex-col items-center justify-center p-2 bg-zinc-800">
      <h1 className="ext-white font-bold text-2xl tracking-tight mb-2 text-white">Login</h1>
      <br/>

      <form>
        <div className="input-container">
          <label htmlFor="userName">Username:</label>
          <input
            type="text"
            id="userName"
            value={username}
            onChange={(e) => handleUsernameChange(e)}
            placeholder="Enter your username"
            required
          />
        </div>

        <div className="input-container">
          <label htmlFor="passWord">Password:</label>
          <input
            type="password"
            id="passWord"
            value={password}
            onChange={(e) => handlePasswordChange(e)}
            placeholder="Enter your password"
            required
          />
        </div>

        <div className="button-container">
          <Button
            label="Login"
            onClick={handleLogin}
            className="submit-button"
          />
        </div>
      </form>
    </div>
  );
}