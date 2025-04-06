import Button from "../components/ui/button.jsx";

export default function Login() {
	
	

  return (
    <div>
      <ul className="pt-4 space-y-2">
        <li><h1>Login</h1></li>
        <li className="mt-10"><input placeholder="Username"/></li>
        <li><input placeholder="Password"/></li>
        <li><Button navigateTo="/home" label="login">login</Button></li>
      </ul>
    </div>
  );
}