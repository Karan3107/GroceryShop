import React,{useState} from "react";
import {useHistory } from 'react-router-dom';
import Axios from "axios";
import "./new.css";

const New = (props) => {

    const history=useHistory();

    const [newItemDetail, setnewItemDetail] = useState({
        name:"",
        price:"",
        detail:"",
        image:"",
        type:"",
        isAvailable:1,
        ...props.userDetail
    });

    const updateInput=(event) => {
        const {name,value} = event.target;
        setnewItemDetail((prev)=>{
            return{
                ...prev,
                [name]:value
            }
        })
    } 

    const submitNewForm=(event)=> {
        event.preventDefault();
        Axios.post('http://localhost:3001/new-item',{newItemDetail})
        .then((response)=>{
            history.push("/all-product");
            
        })
        .catch((error)=>{
            console.log(error);
        })
    }

  return (
    <>
      <div className="container">
        <h1>ADD A NEW PRODUCT</h1>
        <div className="main_center1">
          <form>
            <div className="mb-3">
              <label for="exampleInputName" className="form-label">
                Name of the product:
              </label>
              <input
                type="text"
                className="form-control"
                onChange={updateInput} id="exampleInputName"
                name="name"
              />
            </div>
            <div className="mb-3">
              <label for="exampleInputPrice" className="form-label">
                Price of product:
              </label>
              <input
                type="text"
                className="form-control"
                onChange={updateInput} id="exampleInputPrice"
                name="price"
              />
            </div>
            <div className="mb-3">
              <label for="exampleInputDetails" className="form-label">
                Product details:
              </label>
              <textarea
                type="text"
                className="form-control"
                onChange={updateInput} id="exampleInputDetails"
                name="detail"
              />
            </div>
            <div className="mb-3">
              <label for="exampleInputImage" className="form-label">
                Image url:
              </label>
              <input
                type="text"
                className="form-control"
                onChange={updateInput} id="exampleInputImage"
                name="image"
              />
            </div>
            <div className="mb-3">
              <label for="exampleInputType" className="form-label">
                Type:
              </label>
              <select name="type" onChange={updateInput} id="exampleInputType" className="form-control">
                <option selected>Open this select menu</option>
                <option value="fruit">Fruit</option>
                <option value="vegitable">Vegitable</option>
                <option value="dairy">Dairy</option>
              </select>
            </div>
            <button type="submit" className="btn" onClick={submitNewForm}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default New;
