import React,{useState,useEffect} from "react";
import "./mycart.css";
import Axios from "axios";
import CartCard from "./cartcard.js";

const Mycart = (props) => {

    const [itemList, setitemList] = useState([]);
    const [totalitems, settotalitems] = useState(0);
    const [totalcost, settotalcost] = useState(0);
    const [flag, setflag] = useState(0);

    useEffect(async() =>{
        await Axios.get(`http://localhost:3001/cart-item/${props.userDetail.Customer_id}`)
        .then((response) => {
            console.log(response.data);
            setitemList(response.data);
            settotalitems(response.data.length);
        })
        .catch((err) => {
            console.log(err);
        })
    },[flag])

    const placeOrder=async()=>{
        await Axios.post(`http://localhost:3001/order/${props.userDetail.Customer_id}`,{totalcost,totalitems,itemList,props})
        .then((response) => {
            console.log(response.data);
            alert("Thank you for placing order");
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
            <div className="my-container">
                <h1>Yours Cart</h1>
                <div className="cart-container">
                    <div className="product-detail1">
                        <div className="cart-attribute">
                            <div className="cart-parameter">
                                <h2>Product</h2>
                            </div>
                            <div className="cart-parameter">
                                <h2>Rate</h2>
                            </div>
                            <div className="cart-parameter">
                                <h2>Quantity</h2>
                            </div>
                            <div className="cart-parameter">
                                <h2>Total Amount</h2>
                            </div>
                        </div>
                        <div className="product-list">
                            {itemList.map((item)=>{
                                return <CartCard item={item} key={item.iitem_id} settotalcost={settotalcost} setflag={setflag}/>
                            })}
                        </div>
                    </div>
                    <div className="cart-summery">
                        <h1>Total Amount: ${totalcost}</h1>
                        <h1>Total Item: {totalitems}</h1>
                        <button onClick={placeOrder}>Order Now</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Mycart;
