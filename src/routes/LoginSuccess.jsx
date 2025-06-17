import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginSuccess = ({ setisloggedin, setusername }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");
    const email = params.get("email");

    if (name && email) {
      setusername(name);
      setisloggedin(true);
      navigate("/dashboard");
    } else {
      // fallback if something goes wrong
      navigate("/login");
    }
  }, [navigate, setisloggedin, setusername]);

  return <p>Signing in with Google...</p>;
};

export default LoginSuccess;
