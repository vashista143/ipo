import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import Dashboard from './Dashboard'
import ManageIPO from './ManageIPO'
import Iposubscription from './Iposubscription'
import Bluestocklogo from './Bluestocklogo'
import Ipoallotment from './Ipoallotment'
import Topbar from './Topbar'
import Ipoupdate from './Ipoupdate'
import Registeripo from './Registeripo'
import Sidetoplogo from './Sidetoplogo'
import Login from '../routes/Login'
const Layout = ({ searchTerm, setSearchTerm, username, mail }) => {
  return (
    <div className='grid grid-cols-[17%_83%] h-screen w-full'>
          <div className="bg-[#F1F2F7] grid grid-rows-[auto_1fr]">
      <div className='h-[10.1vh]'>
        <Sidetoplogo />
      </div>
      <div className="min-h-0">
        <Sidebar />
      </div>
    </div>
          <div className='flex-row '>
            <div className=''>
            <Topbar setSearchTerm={setSearchTerm} username={username} mail={mail}/>
            </div>
            <div className='bg-[#FFFFFF] h-[90%] text-black'>
<Outlet />
    </div>
              </div>
          </div>
  )
}

export default Layout
