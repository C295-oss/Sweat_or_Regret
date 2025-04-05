import Button from "../components/ui/button.jsx";
import "./login.css";




export default function Login() {
  return (
    <div className="login">
      <h1>Login</h1>
      <p>This is the login page.</p>

      <ul className="no-bullets">
        <li><input placeholder="Username" /></li>
        <li><input placeholder="Password" /></li>
        <li><Button navigateTo="/home" label="login">login</Button></li>
      </ul>
    </div>
  );
}