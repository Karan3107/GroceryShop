import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import './myorder.css';
import Ordercard from './ordercard.js';

const Myorder = ({userDetail}) => {

    const [allOrder, setallOrder] = useState([]);

    useEffect(async() =>{
        await Axios.get(`http://localhost:3001/order/${userDetail.Customer_id}`)
        .then((response) => {
            setallOrder(response.data);
        })
        .catch((err) => {
            console.log(err);
        })
    },[])

    return (
        <>
        <h1 className="m-5">Your Orders</h1>
        <div className="order-container">
            {allOrder.map((order)=>{
                return <Ordercard userDetail={userDetail} order={order}/>
            })}
        </div>
        </>
    )
}

export default Myorder;
