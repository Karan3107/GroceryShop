import React, { useState, useEffect } from "react";
import { useHistory, useParams, NavLink } from "react-router-dom";
import Axios from "axios";
import "./item.css";

const Item = ({ userDetail }) => {
  
  const history = useHistory();
  const { id } = useParams();
  const [item, setitem] = useState({});
  const [sellerDetail, setsellerDetail] = useState({});
  const [reviewList, setreviewList] = useState([]);
  const [quantity, setquantity] = useState();
  const [reviewDeatil, setreviewDeatil] = useState({
    rating:0,
    body:""
  });
  const [flag, setflag] = useState(0);
  useEffect(async () => {
    await Axios.get(`http://localhost:3001/item/${id}`)
      .then((response) => {
        setitem(response.data[0]);
        console.log(response.data[0]);
        Axios.get(`http://localhost:3001/seller/${response.data[0].s_id}`)
          .then((response1) => {
            setsellerDetail(response1.data[0]);
            console.log(response1.data[0]);
            Axios.get(`http://localhost:3001/review/${id}`)
              .then((response2) => {
                setreviewList(response2.data);
                console.log(response2.data);
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [flag]);

  const stopRender = (event) => {
    event.preventDefault();
  };

  const updateInput = (event) => {
    setquantity(event.target.value);
  };

  const renderToAllProduct=()=> {
    history.push('/all-product');
  }

  const updateInput2=(event) => {
    let {name,value} = event.target;
    setreviewDeatil((prev)=>{
        return{
            ...prev,
            [name]:value
        }
    })
    console.log(name, value);
} 

  const addToCart = (event) => {
    event.preventDefault();
    console.log("sending request");
    Axios.post(`http://localhost:3001/cart/${userDetail.Customer_id}`, {
      quantity,
      item,
    })
      .then((response) => {
        console.log(response);
        console.log("hello");
        setquantity(null);
        alert("Item Added into Cart", quantity);
      })
      .catch((error) => {
        console.log(error);
        alert("Item Already Added");
      });
  };

  const submitReview = (event)=> {
    console.log(reviewDeatil);
    event.preventDefault();
    Axios.post('http://localhost:3001/review',{
            userDetail,item,reviewDeatil
        })
        .then((response) => {
            console.log(response);
            setflag((prev)=>{
              return ++prev;
            })
        })
        .catch((err) => {
            console.log(err);
        })
  }


  return (
    <>
      <div className="item-container">
        <div className="itemdetail">
          <div className="itemimg">
            <img src={item.item_img} alt="item image" />
          </div>
          <div className="itembody">
            <h5 className="itemname">{item.Item_name}</h5>
            <p className="item">{item.Item_detail}</p>
            <ul className="itemlist">
              <li className="itemgroup">{sellerDetail.Seller_shop}</li>
              <li className="itemgroup">{item.Item_price}/KG</li>
              <li className="itemgroup">
                <input
                  type="number"
                  min="1"
                  step="1"
                  onClick={stopRender}
                  onChange={updateInput}
                  name="quantity"
                  value={quantity}
                />
              </li>
            </ul>
            <form className="itemform" action="">
              <button onClick={(stopRender, addToCart)}>Add to cart</button>
              <button className="back" onClick={stopRender,renderToAllProduct}>
                Back
              </button>
            </form>
          </div>
        </div>
        <div className="itemreview">
          <form action="#" className="userform">
            <h2 class="">Leave a review</h2>
            <div class="itemreviewdetail">
              <label for="customRange3" class="">
                Rating:
              </label>
              <input
                type="range"
                className="rating"
                min="1"
                max="5"
                step="1"
                name="rating"
                onChange={updateInput2}
                id="customRange3"
              />
            </div>
            <div class="itemreviewdetail">
              <label for="exampleFormControlTextarea1" className="">
                Review:
              </label>
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                name="body"
                onChange={updateInput2}
                rows="3"
              ></textarea>
            </div>
          </form>
          <button onClick={submitReview} class="btn btn-sucess">Submit</button>
          <h2 className="allreview">All Reviews</h2>
          {reviewList.map((review) => {
            return <>
              <div className="review-container">
            <div>
              <p>
                Name:{review.Customer_name}
              </p>
              <p>Rating:{review.Review_rating}
              </p>
              <p>Reviews:{review.Review_detail}
              </p>
            </div>
          </div>
            </>
          })}
        </div>
      </div>
    </>
  );
};

export default Item;
