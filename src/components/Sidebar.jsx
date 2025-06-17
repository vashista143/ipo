import React from 'react'
import { Link, useLocation } from 'react-router-dom'
const Sidebar = () => {
    const location = useLocation()
    const currentPath = location.pathname;
    return (
        <div className='pt-[15%]'>
            <p className='text-gray-400 text-[10px] pb-[5%] pl-[15%]'>MENU</p>
            <ul className='text-gray-400 text-[11px] pl-[8%]'>
                <li>
                    <div className={`w-[90%] rounded-[5px] ${currentPath === "/dashboard" ? "bg-[#707FDD]/[10%]" : ""}`}>
                        <span className="inline-block px-[7%] py-[4%]" >
                            <Link to="/dashboard" className="flex gap-[15px] items-center">
                                <svg
                                    className={`w-4 h-4 mt-[3px] ${currentPath === "/dashboard" ? "text-[#5A6ACF]" : "text-gray-400"}`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 576 512"
                                    fill="currentColor"
                                >
                                    <path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm64 192c17.7 0 32 14.3 32 32l0 96c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-96c0-17.7 14.3-32 32-32zm64-64c0-17.7 14.3-32 32-32s32 14.3 32 32l0 192c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-192zM320 288c17.7 0 32 14.3 32 32l0 32c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-32c0-17.7 14.3-32 32-32z" />
                                </svg>
                                <p className={currentPath === "/dashboard" ? "text-[#5A6ACF]" : "text-gray-400"}>Dashboard</p>
                            </Link>
                        </span>
                    </div>
                </li>
                <li>
                    <div className={`w-[90%] rounded-[5px]  ${currentPath === "/manage-ipo" ? "bg-[#707FDD]/[10%]" : ""}`}>
                        <span className="inline-block px-[7%] py-[4%]" >
                            <Link to="/manage-ipo" className="flex gap-[15px] items-center">
                                <svg
                                    className={`w-4 h-4 mt-[3px] ${currentPath === "/manage-ipo" ? 'text-[#5A6ACF]' : 'text-gray-400'}`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 576 512"
                                    fill="currentColor"
                                >
                                    <path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                                </svg>
                                <p className={currentPath === "/manage-ipo" ? 'text-[#5A6ACF]' : 'text-gray-400'}>Manage IPO</p>
                            </Link>
                        </span>
                    </div>
                </li>


                <li>
                    <div className={`w-[90%] rounded-[5px]  ${currentPath === "/ipo-subscription" ? "bg-[#707FDD]/[10%]" : ""}`}>
                        <span className="inline-block px-[7%] py-[4%]" >
                            <Link to="/ipo-subscription" className="flex gap-[15px] items-center">
                                <svg className={`w-4 h-4 mt-[3px] ${currentPath === "/ipo-subscription" ? 'text-[#5A6ACF]' : 'text-gray-400'}`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 576 512"
                                    fill="currentColor"><path d="M448 96c0-35.3-28.7-64-64-64L64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320zM256 160c0 17.7-14.3 32-32 32l-96 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l96 0c17.7 0 32 14.3 32 32zm64 64c17.7 0 32 14.3 32 32s-14.3 32-32 32l-192 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l192 0zM192 352c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l32 0c17.7 0 32 14.3 32 32z" /></svg>
                                <p className={currentPath === "/ipo-subscription" ? 'text-[#5A6ACF]' : 'text-gray-400'}>IPO Subscription</p>
                            </Link>
                        </span>
                    </div>
                </li>
               <li>
  <div className={`w-[90%] rounded-[5px]  ${currentPath === "/ipo-allotment" ? "bg-[#707FDD]/[10%]" : ""}`}>
    <span className="inline-block px-[7%] py-[4%]">
      <Link to="/ipo-allotment" className="flex gap-[15px] items-center">
        <svg
          className={`w-4 h-4 mt-[3px] ${currentPath === "/ipo-allotment" ? "text-[#5A6ACF]" : "text-gray-400"}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
          fill="currentColor"
        >
          <path d="M256 448c141.4 0 256-93.1 256-208S397.4 32 256 32S0 125.1 0 240c0 45.1 17.7 86.8 47.7 120.9c-1.9 24.5-11.4 46.3-21.4 62.9c-5.5 9.2-11.1 16.6-15.2 21.6c-2.1 2.5-3.7 4.4-4.9 5.7c-.6 .6-1 1.1-1.3 1.4l-.3 .3c0 0 0 0 0 0c0 0 0 0 0 0s0 0 0 0s0 0 0 0c-4.6 4.6-5.9 11.4-3.4 17.4c2.5 6 8.3 9.9 14.8 9.9c28.7 0 57.6-8.9 81.6-19.3c22.9-10 42.4-21.9 54.3-30.6c31.8 11.5 67 17.9 104.1 17.9zM128 208a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm128 0a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm96 32a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
        </svg>
        <p className={currentPath === "/ipo-allotment" ? "text-[#5A6ACF]" : "text-gray-400"}>
          IPO Allotment
        </p>
      </Link>
    </span>
  </div>
</li>
</ul>
            <p className='text-gray-400 text-[10px] pb-[5%] pt-[5%] pl-[15%]'>OTHERS</p>
            <ul className='text-gray-400 text-[11px] pl-[8%]'>
                <li className='px-[7%] py-[4%] flex gap-[15px]'><svg className="w-4 h-4 mt-[3px]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                    fill="currentColor"><path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" /></svg>Settings</li>
                <li className='px-[7%] py-[4%] flex gap-[15px]'><svg className="w-4 h-4 mt-[3px]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                    fill="currentColor"><path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-224c0-35.3-28.7-64-64-64L80 128c-8.8 0-16-7.2-16-16s7.2-16 16-16l368 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L64 32zM416 272a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" /></svg>API Manager</li>
                <li className='px-[7%] py-[4%] flex gap-[15px]'><svg className="w-4 h-4 mt-[3px]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                    fill="currentColor"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" /></svg>Accounts</li>
                <li className='px-[7%] py-[4%] flex gap-[15px]'><svg className="w-4 h-4 mt-[3px]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                    fill="currentColor"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" /></svg>Help</li>
            </ul>
        </div>
    )
}

export default Sidebar
