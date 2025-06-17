import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import ManageIPO from './components/ManageIPO'
import Iposubscription from './components/Iposubscription'
import './App.css'
import Ipoallotment from './components/Ipoallotment'
import Ipoupdate from './components/Ipoupdate'
import Registeripo from './components/Registeripo'
import Login from './routes/Login'
import Layout from './components/Layout'
import Protectedroute from './routes/Protectedroute'
import { Navigate } from 'react-router-dom'
import Signup from './routes/Signup'
import Forgotpass from './routes/Forgotpass'
import Resetpassword from './routes/Resetpassword'
import LoginSuccess from './routes/LoginSuccess'
import AccessDenied from './routes/AccessDenied'
function App() {
  const [username, setusername]=useState('');
  const [isloggedin,setisloggedin] =useState(false)
  const [searchTerm, setSearchTerm] = useState('');
  const [mail,setmail]=useState('')
  return (
    <>
    <Router>
              <Routes>
              <Route path="/login" element={<Login setisloggedin={setisloggedin} setmail={setmail} setusername={setusername}/>}/>            
              <Route path="/signup" element={<Signup/>}/>    
              <Route path="/forgotpass" element={<Forgotpass/>}/>                            
              <Route path="/reset-password/:id" element={<Resetpassword/>}/>    
              <Route path="/loginsuccess" element={<LoginSuccess setisloggedin={setisloggedin} setusername={setusername} />} />                        
              <Route path="/access-denied" element={<AccessDenied />} />
              <Route path="/" element={<Protectedroute isloggedin={isloggedin}> <Layout searchTerm={searchTerm} setSearchTerm={setSearchTerm} username={username} mail={mail}/></Protectedroute>}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="manage-ipo" element={<ManageIPO searchTerm={searchTerm} />} />
              <Route path="ipo-subscription" element={<Iposubscription />} />
              <Route path="ipo-allotment" element={<Ipoallotment />} />
              <Route path="ipoupdate/:id" element={<Ipoupdate />} />
              <Route path="registeripo" element={<Registeripo />} />
              </Route>
              <Route path="*" element={<Navigate to={isloggedin ? "/" : "/login"} replace />} />
              </Routes>
      </Router>
      </>
  )
}

export default App
