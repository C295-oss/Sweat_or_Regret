import Button from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function WelcomePage() {
    const navigate = useNavigate();

  const already_logged_in = () => {
    try {
        if(localStorage.getItem('verify') != "true") {
          console.log("huh?")
          navigate("/login");
          return;
        }
        console.log("what?")
        navigate("/home");
        return;
      }
      catch(error) {
        console.log("lool?")
        navigate("/login");
        return;
      }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Sweat of Regret</h1>

        <div className="flex flex-col space-y-4">
          <Button label = "signup" navigateTo = "/registration" className="w-full" size="lg"/>
          <Button label = "login" onClick={already_logged_in}  className="w-full" size="lg"/>
        </div>
      </div>
    </div>
  )
}

