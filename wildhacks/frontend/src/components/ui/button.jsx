import { useNavigate } from "react-router-dom";


export default function Button({ label, navigateTo, onClick, type = "button", className = "" }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick(); // Calls the passed onClick function if provided
    }
    else if (navigateTo) {
      navigate(navigateTo); // Navigates to the specified route
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold ${className}`}
    >
      {label}
    </button>
  );
}

