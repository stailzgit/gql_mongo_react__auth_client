import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Homepage = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div>
      Homepage
      {user ? (
        <p>Your email - {user.email}</p>
      ) : (
        <div>
          {"Please "}
          <Link to="/login">login</Link>
          {" or "}
          <Link to="/register">register</Link>
        </div>
      )}
    </div>
  );
};

export default Homepage;
