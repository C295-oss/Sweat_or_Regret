import { useNavigate } from  "react-router-dom";

export default function Button({ label, navigateTo, onClick, type = "button", className = "" }) {
  const navigate = useNavigate();


  const handleClick = () => {
    const shouldNavigate = onClick ? onClick() : true;

    // Only navigate if onClick returned true (or if there's no onClick)
    if (shouldNavigate && navigateTo) {
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

