import { Link } from "react-router-dom";
import "./index.css"
import { useContext } from "react";
import { GlobalContext } from '../../context';
import axios from "axios"

export default function NavBar() {

  let { state, dispatch } = useContext(GlobalContext);

  const logoutHandler = async () => {
    let baseUrl = "http://localhost:5001";
    try {
      let response = await axios.post(`${baseUrl}/logout`, {},
        {
          withCredentials: true
        })
      console.log("response: ", response.data);

      dispatch({ type: "USER_LOGOUT" })

    } catch (e) {
      console.log("Error in api call: ", e);
    }
  }


  return (
    <nav className='nav'>
      <div className="userName">{state?.user?.firstName} {state?.user?.lastName}</div>
      <ul>
        {(state.isLogin === true) ?
          <>
            <li> <Link to="home/">Home</Link>             </li>
            <li> <Link to="/profile">Profile</Link>       </li>
            <li> <Link to="/products">Products</Link>   </li>
            <li> <Link to="/login" onClick={logoutHandler}>Logout</Link>  </li>
          </>
          :
          null
        }
        {(state.isLogin === false) ?
          <>
          <li> <Link to="/login">Login</Link>       </li>
        <li> <Link to="/signup">Signup</Link>     </li>
          </>
          :
          null
        }
        {(state.isLogin === null) ?
          <>
           loading....
          </>
          :
          null
        }


       

       
      </ul>
    </nav>
  )
}