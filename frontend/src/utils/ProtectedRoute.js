import React from "react";
import { connect } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, user }) => {
  let location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

const msp = ({ auth }) => ({
  user: auth.user,
});
const mdp = (dispatch) => ({});

export default connect(msp, mdp)(ProtectedRoute);
