import { useEffect, useState, type JSX } from "react";
import { Navigate } from "react-router";
import { parseAuthToken } from "./parseAuthToken";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setUserInfo } from "../../redux/slices/auth";
import { setDistricts } from "../../redux/slices/districts";
import { setStateOrUtList } from "../../redux/slices/stateOrUt";
import axios from "axios";
import saveStateAndDistricts from "../../utils/saveStateAndDistricts";


const AuthRoute = () => {


  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  console.log('Token from localStorage:', token);
  const auth = useSelector((state: any) => state.auth);

  saveStateAndDistricts();





 



  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token != null) {
      const userInfo = parseAuthToken(token);
      if (userInfo != null) {
        dispatch(setUserInfo(userInfo));
      }
    }
  }, [dispatch]);

  if (auth.isAuthenticated) {
    return <Navigate to={`/${auth.userInfo.role.toLowerCase()}`} replace />;
  }
  else {
    return <Navigate to="/login" replace />;
  }


}

export default AuthRoute;