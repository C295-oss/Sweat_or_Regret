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
    <div>
      <ul className="pt-4 space-y-2">
        <li>
          <h1>Login</h1></li>
        <li className="mt-10">
          <input onChange={handleUsernameChange} placeholder="Username"/>
        </li>
        <li>
          <input type="password" onChange={handlePasswordChange} placeholder="Password"/>
        </li>
        <li><Button onClick={handleLogin} label="login">login</Button></li>
      </ul>
    </div>
  );
}