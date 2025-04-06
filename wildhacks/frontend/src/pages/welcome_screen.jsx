import Button from '../components/ui/button';
import './welcome.css';

export default function WelcomePage() {
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
            navigateTo="/login"
            className="text-violet-300 text-sm font-semibold uppercase tracking-wider"
            size="lg"
          />
        </div>
      </div>
    </div>
  );
}