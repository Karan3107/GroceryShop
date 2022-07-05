import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./basic.css";
import "./content.css";
import Ccard from "./ccard.js";
import Scard from "./scard.js";

const Sidebar = ({isSeller,isCustomer,userDetail}) => {
  const [itemList, setitemList] = useState([]);
  const [flag, setflag] = useState(0);

  useEffect(async () => {
    if (isSeller) {
      await Axios.get("http://localhost:3001/seller-items", {
        params: {
          ...userDetail,
        },
      })
        .then((response) => {
          setitemList(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      await Axios.get("http://localhost:3001/all-items")
        .then((response) => {
          setitemList(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [flag]);


  const renderCard = () => {
    if (isCustomer) {
      return (
        <>
          {itemList.map((item) => {
            return <>
            <Ccard item={item} key={item.Item_id} userDetail={userDetail} />;
            <Ccard item={item} key={item.Item_id} userDetail={userDetail} />;
            <Ccard item={item} key={item.Item_id} userDetail={userDetail} />;
            <Ccard item={item} key={item.Item_id} userDetail={userDetail} />;
            <Ccard item={item} key={item.Item_id} userDetail={userDetail} />;
            <Ccard item={item} key={item.Item_id} userDetail={userDetail} />;
            </>
          })}
        </>
      );
    } else {
      return (
        <>
          {itemList.map((item) => {
            return <>
            <Scard item={item} key={item.Item_id} userDetail={userDetail} setflag={setflag}/> 
            <Scard item={item} key={item.Item_id} userDetail={userDetail} setflag={setflag}/> 
            <Scard item={item} key={item.Item_id} userDetail={userDetail} setflag={setflag}/> 
            <Scard item={item} key={item.Item_id} userDetail={userDetail} setflag={setflag}/> 
            <Scard item={item} key={item.Item_id} userDetail={userDetail} setflag={setflag}/> 
            <Scard item={item} key={item.Item_id} userDetail={userDetail} setflag={setflag}/> 
            </>;
          })}
        </>
      );
    }
  };

  return (
    <>
      <div className="container">
        <div className="main_context">{renderCard()}</div>
      </div>
    </>
  );
};

export default Sidebar;
