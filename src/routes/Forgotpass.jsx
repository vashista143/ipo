import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
const ForgotPasswordForm = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [errormsg,seterrormsg]=useState('')
    const [showsuccess,setshowsuccess]=useState(false)
    const[form,setform]=useState('')
    useEffect(() => {
    if(email==""){
        seterrormsg('')
    }
    }, [email])
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email)
    if (!executeRecaptcha) {
      alert("reCAPTCHA not yet available");
      return;
    }
try {
      const token = await executeRecaptcha('forgot_password');
      const res = await fetch('https://ipo-hel9.onrender.com/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mailid: email, captchaToken: token  })
      });

      const data = await res.json();
      if (data.success) {
        setshowsuccess(true)
        setTimeout(() => {
        navigate('/login');
        }, 3000);
      } else {
        if (data.message === "Email not found") {
        seterrormsg("Login failed: User not found");
      } else if (data.message === "Captcha validation failed") {
        seterrormsg("Login failed: CAPTCHA verification failed");
      } else {
        seterrormsg("Login failed:", data);
      }
    }

    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white">
      <div className="w-full max-w-md p-6 rounded-md shadow-md">
        <h1 className="flex justify-center text-2xl font-bold text-center mb-2 text-[#1D1C1D]"><img src='src/assets/logo.png' height={"36px"} width={"222px"} ></img></h1>
        <h2 className="text-lg font-semibold text-center mb-2">Forgot Password?</h2>
        <p className="text-center text-gray-500 mb-6">
          Enter your email address to get the password reset link.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Email Address</label>
            <input
              type="email"
              placeholder="hello@bluestock.in"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="text-red-500 text-[13px] mt-2">{errormsg=="Login failed: User not found"?errormsg:''}</div>
          </div>
            <div className="text-red-500 text-[13px] mt-2">{errormsg=="Login failed: CAPTCHA verification failed"?errormsg:''}</div>

          <button
            type="submit"
            className="w-full bg-violet-600 text-white py-2 rounded-md hover:bg-violet-700 transition"
          >
            Password Reset
          </button>
        </form>
        {showsuccess?<div className='text-green-500 text-[16px] mt-2' id='success'><p>'Reset link sent to your email.'</p></div>:''}

        <button
          onClick={() => navigate('/login')}
          className="mt-4 text-sm text-gray-500 hover:text-violet-600"
        >
          Back to login
        </button>
      </div>
    </div>  )
}
const Forgotpass = () => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="6LeCi2MrAAAAACyUVFgX2PfNObfoPykY8NFkeQ3j">
      <ForgotPasswordForm />
    </GoogleReCaptchaProvider>
  );
};
export default Forgotpass
