import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
const Protectedroute= ({isloggedin, children})=>{
    console.log(isloggedin)
    return isloggedin ? children : <Navigate to="/login" replace/>
}
export default Protectedroute