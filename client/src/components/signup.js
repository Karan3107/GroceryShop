import React, { useState } from "react";
import { useform } from "react-hook-form";
import * as yup from "yup";
import Axios from "axios";
import "./signup.css";

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  city: yup.string().required(),
  state: yup.string().required(),
  shop: yup.string(),
  phn: yup.string().length(10).required(),
  seller: yup.string(),
  customer: yup.string(),
});

const Signup = (props) => {
  const [signupDetail, setsignupDetail] = useState({
    name: "",
    email: "",
    password: "",
    city: "",
    state: "",
    shop: "",
    phn: "",
    seller: "",
    customer: "",
  });

  const [validForm, setvalidForm] = useState(true);

  const onSubmitSignup = async (event) => {
    event.preventDefault();
    const isvalid = await schema.isValid(signupDetail);
    setvalidForm(isvalid);
    if (isvalid) {
      Axios.post("http://localhost:3001/signup", {
        ...signupDetail,
      })
        .then((response) => {
          console.log(response);
          props.redirectToLogin();
        })
        .catch((err) => {
          console.log(err);
        });
    }else{
        alert('Enter Correct data');
    }
  };
  const updateInput = (event) => {
    const { name, value } = event.target;
    setsignupDetail((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <>
      <div className="signup_container">
        <div className="signup_image">
          <img
            src="https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80"
            alt="img"
          />
        </div>
        <div className="signup_detail">
          <div className="signup_block">
            <h1>Create Your Account</h1>
            <form action="http://localhost:3001/signup" className="signup_form">
              <div className="mb-3">
                <input
                  className="signup_input"
                  type="text"
                  placeholder="Name"
                  name="name"
                  onChange={updateInput}
                />
              </div>
              <div className="mb-3">
                <input
                  className="signup_input"
                  type="text"
                  placeholder="Email"
                  name="email"
                  onChange={updateInput}
                />
              </div>
              <div className="mb-3">
                <input
                  className="signup_input"
                  type="text"
                  placeholder="City"
                  name="city"
                  onChange={updateInput}
                />
              </div>
              <div className="mb-3">
                <input
                  className="signup_input"
                  type="text"
                  placeholder="State"
                  name="state"
                  onChange={updateInput}
                />
              </div>
              <div className="mb-3">
                <input
                  className="signup_input"
                  type="text"
                  placeholder="Phone no"
                  name="phn"
                  onChange={updateInput}
                />
              </div>
              <div className="mb-3">
                <input
                  className="signup_input"
                  type="password"
                  onChange={updateInput}
                  placeholder="Password"
                  name="password"
                />
              </div>
              {signupDetail.seller === "on" && (
                <div className="mb-3">
                  <input
                    className="signup_input"
                    type="text"
                    placeholder="Shop Name"
                    name="shop"
                    onChange={updateInput}
                  />
                </div>
              )}
              <div className="signup_check">
                <input
                  type="checkbox"
                  id="seller"
                  onChange={updateInput}
                  name="seller"
                />
                <label htmlFor="seller">Seller</label>
                <input
                  type="checkbox"
                  id="customer"
                  onChange={updateInput}
                  name="customer"
                />
                <label htmlFor="customer">Customer</label>
              </div>
              <div className="signup_button">
                <button
                  type="submit"
                  className="signup_submit"
                  onClick={onSubmitSignup}
                >
                  Signup
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
