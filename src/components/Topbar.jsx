import React from 'react'
import { useState } from 'react';
const Topbar = ({ setSearchTerm, username, mail }) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
     <div className="bg-white border-b-[2px] border-gray-400/20 h-[66px] flex items-center justify-between px-6">
      {/* Search Field */}
      <div className="w-[500px] relative">
        <svg
          className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-4 pr-4 py-[6px] text-[14px] text-gray-700 bg-[#F6F6FB] rounded-md w-full outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
 
      <div className="relative">
        <div
          onClick={() => setShowDetails(!showDetails)}
          className="w-fit h-[32px] flex items-center gap-2 bg-white border border-gray-300 rounded-md px-4 py-1.5 cursor-pointer hover:shadow-sm"
        >
          <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
            {username[0]}
          </div>
          <div className="text-sm font-medium text-gray-800">Hi, {username}</div>
          <svg
            className={`w-4 h-4 text-gray-500 transition-transform ${
              showDetails ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
           <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500" viewBox="0 0 448 512"><path d="M224 0c-17.7 0-32 14.3-32 32l0 19.2C119 66 64 130.6 64 208l0 18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416l384 0c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8l0-18.8c0-77.4-55-142-128-156.8L256 32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3l-64 0-64 0c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"/></svg>
          </div>
        </div>
       

        {showDetails && (
          <div className="absolute right-0 mt-2 bg-[#37375C] text-white border rounded-lg shadow-lg w-fit z-50 p-4">
            <h3 className="text-md font-semibold mb-2">Account Info</h3>
            <p className="text-sm text-white">Name: {username}</p>
            <p className="text-sm  text-white whitespace-nowrap overflow-hidden text-ellipsis">Email: {mail}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Topbar
