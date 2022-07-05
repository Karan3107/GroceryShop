import React,{useState} from 'react';
import Axios from 'axios';
import { Switch,Route,Redirect,useHistory } from 'react-router-dom';
import Content from './components/content.js';
import Navbar from './components/navbar.js';
import Home from './components/home.js';
import New from './components/new.js';
import Signup from './components/signup';
import Login from './components/login.js';
import Edit from './components/edit.js';
import Myaccount from './components/myaccount.js';
import Mycart from './components/mycart.js';
import Myorder from './components/myorder.js';
import Item from './components/item.js';


const App = () => {

    const history=useHistory();
    const [isLogin, setisLogin] = useState(false);
    const [userDetail, setuserDetail] = useState();
    const [isSeller, setisSeller] = useState(false);
    const [isCustomer, setisCustomer] = useState(false);

    const redirectToHome=()=>{ 
        history.push("/home");
    }

    const redirectToLogin=()=>{ 
        history.push("/login");
    }

    if(isLogin) {
        return <>
    <Navbar userDetail={userDetail}  isSeller={isSeller} isCustomer={isCustomer} setisLogin={setisLogin} userDetail={userDetail} />
    <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/home" component={Home} />
        <Route exact path="/all-product" component={()=>{ return <Content isSeller={isSeller} isCustomer={isCustomer} userDetail={userDetail}/>}} />
        {isSeller && <Route exact path="/new-item" component={()=>{ return <New userDetail={userDetail} />}}/>}
        {isSeller && <Route exact path="/edit-item/:id" component={Edit} />}
        {isCustomer && <Route exact path="/my-cart" component={()=>{ return <Mycart userDetail={userDetail}/>}}/>}
        {isCustomer && <Route exact path="/my-order" component={()=>{return <Myorder userDetail={userDetail}/>}} />}
        {isCustomer && <Route exact path="/item/:id" component={()=>{return <Item userDetail={userDetail}/>}} />}
        <Route exact path="/my-account" component={()=>{ return <Myaccount userDetail={userDetail} isSeller={isSeller} setisLogin={setisLogin} isCustomer={isCustomer} />}}/>
    </Switch>
    </>
    }
    else{
        return <>
        <Switch>
            <Route exact path="/login" component={()=>{ return <Login setisLogin={setisLogin} setuserDetail={setuserDetail} redirectToHome={redirectToHome} setisSeller={setisSeller} setisCustomer={setisCustomer} />}} />
            <Route exact path="/signup" component={()=>{ return <Signup setisLogin={setisLogin} setuserDetail={setuserDetail} redirectToLogin={redirectToLogin}/>}} />
            <Redirect to="/login"/>
        </Switch>
        </>
    }
}

export default App;
