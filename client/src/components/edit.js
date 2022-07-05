import React,{useState, useEffect} from "react";
import {useHistory,useParams,NavLink } from 'react-router-dom';
import Axios from "axios";
import "./new.css";

const Edit = () => {

    const history=useHistory();
    const {id}=useParams();
    const [itemDetail, setitemDetail] = useState({});

    useEffect(async()=>{
        await Axios.get(`http://localhost:3001/item/${id}`)
        .then((response)=>{
            setitemDetail(response.data[0]);
        })
        .catch((error)=>{
            console.log(error);
        })
    },[])



    const updateInput=(event) => {
        const {name,value} = event.target;
        setitemDetail((prev)=>{
            return{
                ...prev,
                [name]:value
            }
        })
    } 

    const submitEditForm=(event)=> {
        event.preventDefault();
        Axios.post(`http://localhost:3001/edit-item/${id}`,{itemDetail})
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
        <h1>EDIT THE PRODUCT</h1>
        <div className="main_center1">
          <form>
            <div className="mb-3">
              <label for="exampleInputName" className="form-label">
                Name of the product:
              </label>
              <input
                type="text"
                className="form-control"
                value={itemDetail.Item_name}
                onChange={updateInput} id="exampleInputName"
                name="Item_name"
              />
            </div>
            <div className="mb-3">
              <label for="exampleInputPrice" className="form-label">
                Price of product:
              </label>
              <input
                type="text"
                className="form-control"
                value={itemDetail.Item_price}
                onChange={updateInput} id="exampleInputPrice"
                name="Item_price"
              />
            </div>
            <div className="mb-3">
              <label for="exampleInputDetails" className="form-label">
                Product details:
              </label>
              <textarea
                type="text"
                className="form-control"
                value={itemDetail.Item_detail}
                onChange={updateInput} id="exampleInputDetails"
                name="Item_detail"
              />
            </div>
            <div className="mb-3">
              <label for="exampleInputImage" className="form-label">
                Image url:
              </label>
              <input
                type="text"
                className="form-control"
                value={itemDetail.item_img}
                onChange={updateInput} id="exampleInputImage"
                name="item_img"
              />
            </div>
            <div className="mb-3">
              <label for="exampleInputType" className="form-label">
                Type:
              </label>
              <select name="Item_type" value={itemDetail.Item_type}  onChange={updateInput} id="exampleInputType" className="form-control">
                <option selected>Open this select menu</option>
                <option value="fruit">Fruit</option>
                <option value="vegitable">Vegitable</option>
                <option value="dairy">Dairy</option>
              </select>
            </div>
            <button type="submit" className="btn" onClick={submitEditForm}>
              Submit
            </button>
            <NavLink to='/all-product'><button type="submit" className="btn btn-back" onClick={submitEditForm}>
              Back
            </button></NavLink>
          </form>
        </div>
      </div>
    </>
  );
};

export default Edit;
