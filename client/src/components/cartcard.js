import React,{useState,useEffect} from 'react';
import Axios from "axios";
import './cartcard.css';

const CartCard = ({item,settotalcost,setflag}) => {
    let [qty, setqty] = useState(item.quantity);
    const [itemDetail, setitemDetail] = useState({});
    const [totalPrice, settotalPrice] = useState(0);

    useEffect(async() =>{
        await Axios.get(`http://localhost:3001/item/${item.iitem_id}`)
        .then((response) =>{
            setitemDetail(response.data[0]);
            settotalPrice(qty*response.data[0].Item_price);
            settotalcost((prev)=>{
                return prev+qty*response.data[0].Item_price;
            })
        })
        .catch((err) =>{
            console.log(err);
        })
    },[])

    const decqty=()=>{
        setqty(--qty);
        settotalPrice(qty*itemDetail.Item_price);
        updateqty();
        settotalcost((prev)=>{
            return prev-itemDetail.Item_price;
        })
    }

    const incqty=()=>{
        setqty(++qty);
        settotalPrice(qty*itemDetail.Item_price);
        updateqty();
        settotalcost((prev)=>{
            return prev+itemDetail.Item_price;
        })
    }

    const updateqty=async()=>{
        await Axios.post(`http://localhost:3001/update-qty/${item.iitem_id}/${item.icart_id}`,{qty})
        .then((response)=>{
            console.log(response);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const removeItem=async()=>{
        await Axios.delete(`http://localhost:3001/delete-item/${item.iitem_id}/${item.icart_id}`)
        .then((response) =>{
            console.log(response);
            settotalcost((prev)=>{
                return prev-totalPrice;
            })
            setflag((prev)=>{
                return ++prev;
            })
        })
        .catch((err) =>{
            console.log(err);
        })   
    }


    return (
        <>
            <div className="product-card">
                <div className="product-parameter">
                <button className="remove-btn" onClick={removeItem}>x</button>
                    <img src={itemDetail.item_img} alt="product img" />
                    <h2 className="">{itemDetail.Item_name}</h2>
                </div>
                <div className="product-parameter">
                    <h2>${itemDetail.Item_price}/KG</h2>
                </div>
                <div className="product-parameter">
                    <div className="style-input">
                        <button onClick={decqty}>-</button>
                        <span className="style-span">{qty}</span>
                        <button onClick={incqty}>+</button>
                    </div>
                </div>
                <div className="product-parameter">
                    <h2>${totalPrice}</h2>
                </div>
            </div>
        </>
    )
}

export default CartCard;
