// pages/AccessDenied.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AccessDenied = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000);

    return () => clearTimeout(timer); // cleanup
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "3rem" }}>
      <h2 style={{ color: "red" }}>Access Denied</h2>
      <p>You are not authorized to access this application.</p>
      <p>Redirecting to login page in 3 seconds...</p>
    </div>
  );
};

export default AccessDenied;
