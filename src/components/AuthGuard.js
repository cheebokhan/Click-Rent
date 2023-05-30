import React, { useEffect } from "react";
import { useSelector, connect } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";

const AuthGuard = (props) => {
  const location = useLocation();
  const {user} = useSelector((state) => state.auth);
  if (!user) {
    alert('asd')
    return <Redirect to={{path:"/login",state: { redirect: location.pathname }}}  />;
  }
  // useEffect(() => {
  //   if (!user) {
  //     return <Redirect to="/login" />;
  //   }
   
  // }, [location.pathname]);

  return props.children;
};

export default AuthGuard;
