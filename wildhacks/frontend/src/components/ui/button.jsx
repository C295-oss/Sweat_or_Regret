import { useNavigate } from  "react-router-dom";

export default function Button({ label, navigateTo, onClick, type = "button", className = "" }) {
  const navigate = useNavigate();


  const handleClick = () => {
    if (onClick) {// Calls the passed onClick function if provided
      onClick(onClick); 
    }
    if(navigateTo) {
      navigate(navigateTo);
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

