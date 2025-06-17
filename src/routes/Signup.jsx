import React, { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
const Signup = () => {
 const navigate = useNavigate();
 const recaptchaRef= useRef();
 const [errormsg,seterrormsg]=useState('')
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [captchaValue, setCaptchaValue] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const password = watch("password");


  const oncaptchaSubmit = async (data) => {
    if (!captchaValue) {
      alert("Please verify reCAPTCHA");
      return;
    }

    const response = await fetch("https://ipo-hel9.onrender.com/signupadmin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, token: captchaValue }),
    });
    if (response.ok) {
      navigate("/login");
    } else {
    const errordata=await response.json()
    seterrormsg(errordata.error)
    setCaptchaValue(null);
    recaptchaRef.current.reset(); 
    }
  };

  const handleRecaptcha = (value) => {
    setCaptchaValue(value);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-5">
      <div className="w-full max-w-md space-y-6 bg-white p-8 shadow-md rounded-lg">
        <div className="text-center mb-4">
          <div className='flex justify-center'><img src='src/assets/logo.png' className="h-[36px] w-[222px]"></img></div>
          <h2 className="mt-2 text-lg font-semibold">Create an account</h2>
        </div>
        <form onSubmit={handleSubmit(oncaptchaSubmit)} className="space-y-4">
        <label>Name</label>
          <input
            placeholder='Enter Name'
            {...register("name", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
        <label>Email Address</label>

          <input
            {...register("email", { required: true })}
            placeholder="Email Address"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
            onChange={() => seterrormsg('')}
          />
          {errormsg=="User already exists"?<div className='text-[13px] text-red-500'>{errormsg}</div>:''}
<div className="relative">
          <label className="block mb-1">Password</label>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters"
              }
            })}
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[38px] cursor-pointer text-gray-500"
          >
            {showPassword ? (<svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 576 512">
      <path d="M572.52 241.4C518.31 135.5 407.49 64 288 64S57.69 135.5 3.48 241.4a48.07 48.07 0 000 29.2C57.69 376.5 168.51 448 288 448s230.31-71.5 284.52-177.4a48.07 48.07 0 000-29.2zM288 400c-97.05 0-189.05-58.6-240-144 50.95-85.4 142.95-144 240-144s189.05 58.6 240 144c-50.95 85.4-142.95 144-240 144zm0-240a96 96 0 1096 96 96.11 96.11 0 00-96-96zm0 144a48 48 0 1148-48 48.06 48.06 0 01-48 48z" />
    </svg>) : (
    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 640 512"><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm9.4 130.3C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5l-41.9-33zM192 256c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5z"/></svg>
  )}
          </span>
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>
        <div className="relative">
          <label className="block mb-1">Confirm Password</label>
          <input
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: value => value === password || "Passwords do not match"
            })}
            type={showPassword ? "text" : "password"}
            placeholder="Confirm password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[38px] cursor-pointer text-gray-500"
          >
            {showPassword ? (<svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 576 512">
      <path d="M572.52 241.4C518.31 135.5 407.49 64 288 64S57.69 135.5 3.48 241.4a48.07 48.07 0 000 29.2C57.69 376.5 168.51 448 288 448s230.31-71.5 284.52-177.4a48.07 48.07 0 000-29.2zM288 400c-97.05 0-189.05-58.6-240-144 50.95-85.4 142.95-144 240-144s189.05 58.6 240 144c-50.95 85.4-142.95 144-240 144zm0-240a96 96 0 1096 96 96.11 96.11 0 00-96-96zm0 144a48 48 0 1148-48 48.06 48.06 0 01-48 48z" />
    </svg>) : (
    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 640 512"><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm9.4 130.3C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5l-41.9-33zM192 256c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5z"/></svg>
  )}
          </span>
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
        </div>


          <p className="text-xs text-gray-500">
            By continuing, you agree to our <a href="#" className="text-blue-600">terms of service</a>.
          </p>

          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey="6LcfJlwrAAAAAAogS-s1chMn81mj7pGsFkKua331"
            onChange={handleRecaptcha}
          />

          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700"
          >
            Sign up
          </button>


          <p className="text-center text-sm mt-4">
            Already have an account? <a href="/login" className="text-indigo-600">Sign in here</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
