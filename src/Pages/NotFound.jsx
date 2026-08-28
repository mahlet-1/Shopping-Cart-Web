import { useNavigate } from "react-router-dom";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <h2>404 - Page Not Found</h2>
      <p>Oops! The page you are looking for doesn't exist or has been moved.</p>
      <button 
        className="back-home-btn" 
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
    </div>
  );
}