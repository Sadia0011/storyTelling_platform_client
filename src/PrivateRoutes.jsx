import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from "prop-types";
import { AuthContext } from './Provider/AuthProvider';
const PrivateRoutes = ({children}) => {
    const {user,loading}=useContext(AuthContext);
    const location = useLocation();
    if(loading){
 return <progress className="progress progress-warning w-56" value="100" max="100"></progress>
    }
   if(user){
  return children
   }
   return <Navigate state={location.pathname} to={"/login"}></Navigate>;
};
PrivateRoutes.propTypes = {
    children: PropTypes.node,
  };

export default PrivateRoutes;