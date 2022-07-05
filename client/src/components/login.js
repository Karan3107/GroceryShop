import React,{useState} from 'react';
import { NavLink,Redirect } from "react-router-dom";
import Axios from 'axios';
import './login.css';

const Login = (props) => {

    const [loginDetail, setloginDetail] = useState({
        email:"",
        password:"",
        seller: "",
        customer: ""
    })

    const onSubmitLogin=(event) => {
        event.preventDefault();
        Axios.get('http://localhost:3001/login',{
            params: {
                ...loginDetail
            }
        })
        .then((response) => {
            if(response.data.length===0)
            {
                alert('Incorrect Email or Password');
            }else{
                props.setuserDetail(response.data[0]);
                if(loginDetail.seller=="on")
                {
                    props.setisSeller(true);
                    props.setisCustomer(false);
                }else{
                    props.setisCustomer(true);
                    props.setisSeller(false);
                }
                props.setisLogin(true);
                props.redirectToHome();
            }
            
        })
        .catch((err) => {
            console.log(err);
            alert('Incorrect Emaidassl or Password');
        })
    }
    const updateInput=(event) => {
        let {name,value} = event.target;
        setloginDetail((prev)=>{
            return{
                ...prev,
                [name]:value
            }
        })
        console.log(name, value);
    } 

    return <>
        <div className="login_container">
            <div className="login_image">
                <img src="https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80" alt="img" />
            </div>
            <div className="login_detail">
                <div className="login_block">
                    <h1>LOGIN TO CONTINUE</h1>
                    <form action="http://localhost:3001/login" className="login_form">
                        <div className="mb-3">
                            <input className="login_input" type="text"  placeholder="Email" name="email" onChange={updateInput} />   
                        </div>
                        <div className="mb-3">
                            <input className="login_input" type="password" onChange={updateInput} placeholder="Password" name="password"/>
                        </div>
                        <div className="login_check">
                            <input type="checkbox" id="seller" onChange={updateInput} name="seller"/>
                            <label htmlFor="seller">Seller</label>
                            <input type="checkbox" id="customer" onChange={updateInput} name="customer" />
                            <label htmlFor="customer">Customer</label>
                        </div>
                        <div className="login_button">
                            <button type="submit" className="login_submit" onClick={onSubmitLogin}>LOGIN</button>
                        </div>
                        <div className="login_signup">
                            <p>or get <NavLink to="/Signup">Signup</NavLink></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
}

export default Login;
