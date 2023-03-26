import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PrivateRouter = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  console.log(isAuthenticated);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  });
  return <div>{children}</div>;
};

export default PrivateRouter;
