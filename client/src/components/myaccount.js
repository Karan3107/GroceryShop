import React, { useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router";
import "./myaccount.css";

const Myaccount = ({ userDetail, isSeller, isCustomer, setisLogin }) => {
  const history = useHistory();

  const [ischangePassword, setischangePassword] = useState(false);

  const [password, setpassword] = useState({
    currpassword:"",
    newpassword1:"",
    newpassword2:""
  });

  const [sellerDetail, setsellerDetail] = useState({
    name: userDetail.Seller_name,
    email: userDetail.Seller_mail,
    address: userDetail.Seller_city + "," + userDetail.Seller_state,
    shop_name: userDetail.Seller_shop,
    id: userDetail.Seller_id,
  });

  const [customerDetail, setcustomerDetail] = useState({
    name: userDetail.Customer_name,
    email: userDetail.Customer_mail,
    address: userDetail.Customer_location,
    phn: userDetail.Customer_phn,
    id: userDetail.Customer_id,
  });

  const updateInput=(event) => {
    const {name,value} = event.target;
    console.log(name, value);
    setpassword((prev)=>{
        return{
            ...prev,
            [name]:value
        }
    })
} 

  const deleteAccount = async () => {
    if (isSeller) {
      await Axios.delete(
        `http://localhost:3001/delete-seller-account/${userDetail.Seller_id}`
      )
        .then((response) => {
          console.log(response);
          setisLogin(false);
          history.push("/login");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      await Axios.delete(
        `http://localhost:3001/delete-customer-account/${userDetail.Customer_id}`
      )
        .then((response) => {
          console.log(response);
          setisLogin(false);
          history.push("/login");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const changePassword = async(event) => {
    event.preventDefault();
    console.log(password.newpassword1,password.newpassword2);
    if(password.newpassword1===password.newpassword2){
      if(isSeller){
        console.log("sending request");
        Axios.post(`http://localhost:3001/change-seller-password/${userDetail.Seller_id}`,{...password})
        .then((response) => {
          console.log(response);
          history.push("/home");
        })
        .catch((error) => {
          console.log(error);
        })
      }
      if(isCustomer){
        console.log("sending request");
        Axios.post(`http://localhost:3001/change-customer-password/${userDetail.Customer_id}`,{...password})
        .then((response) => {
          console.log(response);
          history.push("/home");
        })
        .catch((error) => {
          console.log(error);
        })
      }
    }else{
      alert("Different Reirenter password");
    }
  };

  const testcase=(event)=>{
    event.preventDefault();
    console.log("testcase");
  }

  return (
    <div className="container">
      <h1>
        WELCOM{" "}
        {isSeller
          ? sellerDetail.name.toUpperCase()
          : customerDetail.name.toUpperCase()}
      </h1>
      <h2>THIS IS YOUR ACCOUNT</h2>
      <div className="account-detail">
        <h2>ACCOUNT DETAILS</h2>
        <div className="account-credintial">
          <div className="detail-section">
            <h3>Name:{isSeller ? sellerDetail.name : customerDetail.name}</h3>
          </div>
          <div className="detail-section">
            <h3>
              Email:{isSeller ? sellerDetail.email : customerDetail.email}
            </h3>
          </div>
          <div className="detail-section">
            <h3>
              Address:{isSeller ? sellerDetail.address : customerDetail.address}
            </h3>
          </div>
          {isCustomer && (
            <div className="detail-section">
              <h3>Phone no:{customerDetail.phn}</h3>
            </div>
          )}
          {isSeller && (
            <div className="detail-section">
              <h3>Shop name:{sellerDetail.shop_name}</h3>
            </div>
          )}
        </div>
        {!ischangePassword && (
          <button className="btn btn-primary " onClick={() =>{setischangePassword(true)}}>
            Change Password
          </button>
        )}
        <button className="btn btn-delete " onClick={deleteAccount}>
          Delete Account
        </button>
      </div>
      {ischangePassword && 
      <div className="form-group">
      <form action="/">
        <div className="mb-3">
          <label htmlFor="currpassword" className="form-lable" >Current Password:</label>
          <input type="password" onChange={updateInput} id="currpassword" name="currpassword" className="form-control"/>
        </div>
        <div className="mb-3">
          <label htmlFor="newpassword1" className="form-lable" >New Password:</label>
          <input type="password" className="form-control" onChange={updateInput} name="newpassword1" id="newpassword1" />
        </div>
        <div className="mb-3">
          <label htmlFor="newpassword2" className="form-lable" >Re-enter Password:</label>
          <input type="password" className="form-control" onChange={updateInput} name="newpassword2" id="newpassword2" />
        </div>
        <button type="submit" className="btn btn-primary " onClick={testcase,changePassword}>
            Change Password
          </button>
      </form>
    </div>
      }
    </div>
  );
};

export default Myaccount;
