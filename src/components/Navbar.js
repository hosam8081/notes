import React, { useContext } from "react";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { AppContext } from "../context/AppContext";
const Navbar = () => {
  const { setIsLogged, isLogged, setUserNote } = useContext(AppContext);
  let decode;
  let token = localStorage.getItem("token");
  if (token) {
    decode = jwtDecode(token);
  }
  const logout = () => {
    localStorage.removeItem("token");
    setIsLogged(false)
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <a className="navbar-brand" href="/">
          Notes
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {isLogged ? (
              <>
                <li className="nav-item">
                  <a className="nav-link">
                    {decode.first_name} {""}
                    {decode.last_name}
                  </a>
                </li>
                <li className="nav-item" onClick={logout}>
                  <Link className="nav-link" to="/login">
                    logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
