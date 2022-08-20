import React, { useContext, useState } from "react";
import Joi from 'joi';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
const Login = () => {
  const [erorr, setErorr] = useState(false);
  const [wating, setWating] = useState(false);
  const [errorList, setErrorList] = useState([])
  const { deCode, setDecode, setIsLogged, setToken } = useContext(AppContext);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate();

  const getUser = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // SendDATA to api
  const sendData = async (e) => {
    e.preventDefault();
    setWating(true);
      // POST DATA
      let { data } = await axios
        .post("https://route-egypt-api.herokuapp.com/signin", user)
        .catch((err) => {
          setErorr(err);
        });
      if (data.message === "success") {
        setWating(false);
        localStorage.setItem("token", data.token);
        setIsLogged(true);
        navigate("/");
        // refresh page to update token from localStorage
        window.location.reload(false);
      } else {
        setErorr("faild in email or password");
        setWating(false);
      }
  };
  return (
    <>
      <div className="container my-5 py-5">
        <div className="col-md-5 m-auto text-center">
          {erorr ? 
           <div className="alert p-2 alert-danger">{erorr}</div> :""  
        }
          <form
            action="/handleSignin"
            method="POST"
            onSubmit={(e) => sendData(e)}
          >
            <div className="mb-3">
              <input
                placeholder="Enter email"
                name="email"
                type="email"
                className="form-control"
                onChange={(e) => getUser(e)}
              />
            </div>
            <div className="mb-3">
              <input
                placeholder="confirm Password"
                name="password"
                type="password"
                className="form-control"
                onChange={(e) => getUser(e)}
              />
            </div>
            <button type="submit" className="btn btn-info w-100">
              SignIn
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
