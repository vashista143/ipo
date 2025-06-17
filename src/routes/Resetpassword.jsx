import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import logo from '../assets/logo.png'
const Resetpassword = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [password, setPassword] = useState('');
  const [confirm , setConfirm]=useState('');
  const [error,seterror]= useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const res = await fetch(`https://ipo-hel9.onrender.com/reset-password/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password: password , id}),
    });
    const data = await res.json();
    seterror(data.message);
    setTimeout(() => {
        navigate("/login")
    }, 1000);
  };
  return(
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md mx-auto p-8 bg-white rounded-lg shadow">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Bluestock Logo" className="h-8 mb-2" />
          <h3 className="text-lg font-semibold text-gray-800 mt-2 mb-1">Reset Password</h3>
          <p className="text-sm text-gray-500 text-center mb-2">
            Enter your new password below to reset your account password.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-[#6C3EF5]"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-[#6C3EF5]"
              placeholder="Re-enter new password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>
          {error && (
            <div className="mb-2 text-sm text-red-600 font-medium">{error}</div>
          )}
          <button
            type="submit"
            className="w-full bg-[#6C3EF5] hover:bg-[#532dc2] text-white font-semibold py-2 rounded-md transition mb-3"
          >
            Password Reset
          </button>
        </form>
        <div className="text-center mt-2">
          <a href="/login" className="text-gray-500 hover:underline text-sm">
            Back to login
          </a>
        </div>
      </div>
    </div>
)};

export default Resetpassword;
