import Button from '../components/ui/button';
import { useNavigate } from 'react-router-dom';
import './welcome.css';


export default function WelcomePage() {
    const navigate = useNavigate();

  const already_logged_in = () => {
    try {
        // if(localStorage.getItem('verify') != "true") {
        //   console.log("huh?")
        //   navigate("/login");
        //   return;
        // }
        console.log("what?")
        navigate("/home");
        return;
      }
      catch {
        console.log("lool?")
        navigate("/login");
        return;
      }
  };

  return (
    <div className="flex w-screen h-screen flex-col items-center justify-center p-2 bg-zinc-800">
      <div className="w-full max-w-md space-y-8 text-center">
        <h1 className="text-white font-bold text-2xl tracking-tight mb-2">Sweat or Regret</h1>
        <br />
        <div className="button-container">
          <Button
            label="Signup"
            navigateTo="/registration"
            className="text-violet-300 text-sm font-semibold uppercase tracking-wider"
            size="lg"
          />
        </div>


          

        <div className="button-container">
          <Button
            label="Login"
            onClick = {already_logged_in}
            className="text-violet-300 text-sm font-semibold uppercase tracking-wider"
            size="lg"
          />
        </div>
      </div>
    </div>
  );
}