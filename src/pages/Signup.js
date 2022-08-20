import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
const Signup = () => {
  const [erorr, setErorr] = useState(false);
  const [wating, setWating] = useState(false);
  const [errorList, setErrorList] = useState([]);
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  let navigate = useNavigate();

  const getUser = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const sendData = async (e) => {
    e.preventDefault();
    setWating(true);
    let validationResult = validateRegisterForm();
    if (validationResult.error) {
      setErrorList(validationResult.error.details);
      setWating(false);
      console.log(validationResult.error.details)
    } else {
      // fetch Data
      let { data } = await axios
        .post("https://route-egypt-api.herokuapp.com/signup", user)
        .catch((err) => {
          setErorr(err);
        });
      if (data.message === "success") {
        setWating(false);
        navigate("/login");
      } else {
        setErorr("email already registered");
        setWating(false);
        console.log(erorr);
      }
    }
  };

  function validateRegisterForm() {
    const schema = Joi.object({
      first_name: Joi.string().alphanum().min(3).max(30).required(),
      last_name: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
    });

    return schema.validate(user, { abortEarly: false });
  }
  return (
    <>
      <div className="container my-5 py-5">
        <div className="col-md-5 m-auto text-center">
          {errorList ? errorList.map(li => {
            return (
              <div className="alert p-2 alert-danger">{li.message}</div>
            )
          }) : ""}
          <form onSubmit={(e) => sendData(e)}>
            <div className="mb-3">
              <input
                placeholder="Enter your name"
                name="first_name"
                type="text"
                className=" form-control"
                onChange={(e) => getUser(e)}
              />
            </div>
            <div className="mb-3">
              <input
                placeholder="Enter your name"
                name="last_name"
                type="text"
                className=" form-control"
                onChange={(e) => getUser(e)}
              />
            </div>
            <div className="mb-3">
              <input
                placeholder="Enter email"
                type="email"
                name="email"
                className="form-control"
                onChange={(e) => getUser(e)}
              />
            </div>
            <div className="mb-3">
              <input
                placeholder="Enter you password"
                type="password"
                name="password"
                className="form-control"
                onChange={(e) => getUser(e)}
              />
            </div>
            <button type="submit" className="btn btn-info w-100">
              {wating ? "wating..." : "signup"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
