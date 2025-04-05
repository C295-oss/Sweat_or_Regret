import Button from '../components/ui/button';

export default function WelcomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Sweat of Regret</h1>

        <div className="flex flex-col space-y-4">
          <Button label = "signup" navigateTo = "/registration" className="w-full" size="lg"/>
          <Button label = "login" navigateTo = "/login" className="w-full" size="lg"/>
        </div>
      </div>
    </div>
  )
}

