/* 
  this Protected component functions similarly to authentication middleware on the frontend,
  helping restrict access to certain routes based on a user’s authentication status. 
*/
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  // const authStatus = useSelector((state) => state.auth.status);
  const authStatus = useSelector(state => state.auth.status) //humne store se pucha hai current status kya hai ki user authenticated hai ya nhi


// this useEffect canalso be craeted without authentication 
// in this we are just taking authentication from user also but this can be completely made on basis of authStatus
  useEffect(() => {
    if (authentication && authStatus !== authentication) { //agar authentication true hai to matlab user ko authentuicate karna hai authstatus is false to login
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) { // yahan par authentication is false matlab user already authenticated hai so authstatus is true as both are unequal so navigate to homepage
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, navigate, authentication]); // agar authentication ya user kahin aur naviagte hoga to yeh run ho jayega

  return loader ? <h1>Loading...</h1> : <>{children}</>
}
