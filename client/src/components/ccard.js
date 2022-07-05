import React,{useState,useEffect} from "react";
import { NavLink,Link } from "react-router-dom";
import Axios from "axios";
import "./ccard.css";

function Ccard({item,userDetail}) {
  const [sellerDetail, setsellerDetail] = useState({});
  const [quantity, setquantity] = useState()

  useEffect(async() =>{
    Axios.get(`http://localhost:3001/seller/${item.s_id}`)
    .then((response) => {
      setsellerDetail(response.data[0]);
    })
    .catch((error) => {
      console.log(error);
    })
  },[])

  const stopRender=(event) => {
    event.preventDefault();
  }

  const updateInput=(event) => {
    setquantity(event.target.value);
  }

  const addToCart=(event) => {
    event.preventDefault();
    console.log("sending request");
    Axios.post(`http://localhost:3001/cart/${userDetail.Customer_id}`,{quantity,item})
    .then((response) => {
      console.log(response);
      console.log("hello")
      setquantity(null);
      alert("Item Added into Cart",quantity);
    })
    .catch((error) => {
      console.log(error);
      alert("Item Already Added");
    })
  }
  return (
    <>
    <NavLink to={`/item/${item.Item_id}`}>
      <div className="item-card">
        <div className="item-img">
          <img
            src={item.item_img}
            alt=""
          />
        </div>
        <div className="item-content">
          <div className="item-detail">
            <ul className="item-list">
              <li className="item-name">{item.Item_name.toUpperCase()}</li>
              <li className="item-shop">{sellerDetail.Seller_shop}</li>
              <li className="item-price">{item.Item_price}<span>/KG</span> </li>
            </ul>
          </div>
          <div className="item-button">
            <form action="#" className="form-control1" >
              <input type="number" min="1" step="1" onClick={stopRender} onChange={updateInput} name="quantity" value={quantity} />
              <button type="submit" onClick={stopRender,addToCart} className="add-button">ADD TO CART</button>
            </form>
          </div>
        </div>
      </div>
    </NavLink>
    </>
  );
}

export default Ccard;
