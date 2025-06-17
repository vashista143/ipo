import React from "react";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

const Login = ({setisloggedin , setusername, setmail}) => {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();
  const [errormsg, seterrormsg]=useState('')
  const [captchaValue, setCaptchaValue] = useState(null);
  const recaptchaRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  

  const oncaptchaSubmit = async (data) => {
    if (!captchaValue) {
      alert("Please verify reCAPTCHA");
      return;
    }

    const response = await fetch("https://ipo-hel9.onrender.com/loginadmin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, token: captchaValue }),
    });
    const result =await response.json()

    
    if (response.ok) {
      setusername(result.loginadmin.name)
      setmail(result.loginadmin.email)
      setisloggedin(true);
      navigate("/dashboard");
    } else {
            if (result.error === "user not found") {
        seterrormsg("Login failed: User not found");
      } else if (result.error === "wrong password") {
        seterrormsg("Login failed: Wrong password");
      } else if (result.message === "Captcha validation failed") {
        seterrormsg("Login failed: CAPTCHA verification failed");
      } else {
        seterrormsg("Login failed:", result);
      }if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
    setCaptchaValue(null);
    }
  };

  const handleRecaptcha = (value) => {
    setCaptchaValue(value);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-5 px-4">
      <div className="w-full max-w-md space-y-6 bg-white p-8 shadow-md rounded-lg">
        <div className="text-center mb-18">
          <img
            src="src/assets/logo.png"
            className="mx-auto h-10"
          />
          
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(oncaptchaSubmit)}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              {...register("email", { required: "Email required", pattern: /^\S+@\S+$/i })}
              placeholder="johndoe@gmail.com"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div className="text-red-500 text-[13px] mt-2">{errormsg=="Login failed: User not found"?errormsg:''}</div>
          </div>

          <div>
            <span className="flex justify-between ">
            <p className=" text-sm font-medium text-gray-700">
              Password
            </p>
            <div className="text-right ">
              <Link to="/forgotpass" className="text-sm text-indigo-600 hover:underline">
                Forgot Password?
              </Link>
            </div>
            </span>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: true })}
                placeholder="********"
  className="text-base mt-1 w-full px-4 py-[8px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:translate-y-[2px]"
              />
              <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[15px] cursor-pointer text-gray-500"
          >
            {showPassword ? (<svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 576 512">
      <path d="M572.52 241.4C518.31 135.5 407.49 64 288 64S57.69 135.5 3.48 241.4a48.07 48.07 0 000 29.2C57.69 376.5 168.51 448 288 448s230.31-71.5 284.52-177.4a48.07 48.07 0 000-29.2zM288 400c-97.05 0-189.05-58.6-240-144 50.95-85.4 142.95-144 240-144s189.05 58.6 240 144c-50.95 85.4-142.95 144-240 144zm0-240a96 96 0 1096 96 96.11 96.11 0 00-96-96zm0 144a48 48 0 1148-48 48.06 48.06 0 01-48 48z" />
    </svg>) : (
    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 640 512"><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm9.4 130.3C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5l-41.9-33zM192 256c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5z"/></svg>
  )}
          </span>
              <div className="text-red-500 text-[13px] mt-2">{errormsg=="Login failed: Wrong password"?errormsg:''}</div>

            </div>
            
          </div>
          <ReCAPTCHA className="rounded-2xl" 
           ref={recaptchaRef}
        sitekey="6LdCi2MrAAAAANrTH37UYhRDBUh7y77pggvnk8Ku" 
        onChange={handleRecaptcha}
      />
          <div className="flex items-center space-x-2">
            <input type="checkbox" className="h-4 w-4 text-indigo-600 rounded" />
            <span className="text-sm text-gray-700">Keep me signed in</span>
          </div>
          <button
           disabled={isSubmitting}
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700 transition"
          >
              {isSubmitting ? "logging in..." : "Login"}
          </button>
<div className="flex items-center gap-4 ">
  <hr className="flex-grow border-gray-300" />
  <span className="text-gray-500 text-sm bg-gray-400/10 px-[20px] py-[3px] rounded-[2px]" >or sign in with</span>
  <hr className="flex-grow border-gray-300" />
</div>

<button
  onClick={() => window.location.href = "http://localhost:3000/auth/google"}
  className="w-full flex items-center justify-center gap-3 bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-800 py-2 rounded-md shadow-sm transition"
>
  <img
    src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
    alt="Google logo"
    className="w-5 h-5"
  />
  <span className="text-sm font-medium">Continue with Google</span>
</button>

          <div className="text-center">
            <Link to="/signup" className="text-sm text-indigo-600 hover:underline">
              Create an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
