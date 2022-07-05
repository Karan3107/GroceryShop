import React from "react";
import Axios from "axios";
import { NavLink } from "react-router-dom";
import "./scard.css";
import { useHistory } from "react-router";

function Scard({item,setflag}) {

  const history=useHistory();

  const deleteItem=async()=>{
    await Axios.delete(`http://localhost:3001/delete-item/${item.Item_id}`)
    .then((response)=>{
      console.log(response);
      setflag((prev)=>{
        return ++prev;
      })
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  return (
    <>
      <div className="item-card">
        <div className="item-img">
          <img
            src={item.item_img}
            alt="image"
          />
        </div>
        <div className="item-content">
          <div className="item-detail">
            <ul className="item-list">
              <li className="item-name">{item.Item_name}</li>
              <li className="item-shop">Organic interprice</li>
              <li className="item-price">${item.Item_price}<span>/KG</span> </li>
            </ul>
          </div>
          <div className="item-button">
           <button className="btn-delete bttn" onClick={deleteItem}>Delete</button>
           <NavLink to={`/edit-item/${item.Item_id}`}><button className="btn-edit bttn">Edit</button></NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default Scard;
