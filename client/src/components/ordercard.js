import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./ordercard.css";

const Ordercard = ({ userDetail, order }) => {

  const [itemList, setitemList] = useState([]);

  useEffect(async()=>{
      await Axios.get(`http://localhost:3001/order-item/${order.Order_id}`)
      .then((response)=>{
          setitemList(response.data);
      })
      .catch((error)=>{
          console.error(error);
      })
  },[])

  return (
    <div className="order-card">
      <div className="order-header">
        <h3>Thanks for ordering {userDetail.Customer_name}</h3>
      </div>
      <div className="order-item">
        {itemList.map((item) => {
          return <><div className="product-detail">
          <img
            src={item.item_img}
            alt="product img"
          />
          <h3>{item.Item_name}</h3>
          <h3>{item.item_qty}</h3>
          <h3>${item.item_qty*item.Item_price}</h3>
        </div>
        </>
        })}
      </div>
      <div className="order-detail">
        <h3>Order_status: {order.Order_status}</h3>
        <h3>Delivery Date: {order.expected_date}</h3>
        <h3>Total items: {order.total_item}</h3>
      </div>
      <div className="order-total">
        <h3>Total Amount:</h3>
        <h3>${order.total_cost}</h3>
      </div>
    </div>
  );
};

export default Ordercard;
