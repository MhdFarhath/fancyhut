import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import LoginUi from './components/Login Ui/LoginUi';
//import SignUp from './components/SignUp';
//import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';
import Home from './pages';
import About from './pages/about';
import Events from './pages/events';
import AnnualReport from './pages/annual';
import Teams from './pages/team';
import Blogs from './pages/blogs';
import signup from './pages/signup';
import AddProducts from './components/AddProducts/AddProducts';
import Products from './components/Products/Products';
import Stocks from './components/Stocks/Stocks';
import UpdateStocks from './components/UpdateStocks/UpdateStocks';
import OrderDetails from './components/OrderDetails/OrderDetails';
import AdminRoles from './components/AdminRoles/AdminRoles';
import AddNewAdmin from './components/AddNewAdmin/AddNewAdmin';
import AddBlogs from './components/Blogs/AddBlogs';
import AdminHome from './components/Admin/AdminHome';
import UpdateProduct from './components/UpdateProduct/UpdateProduct';
import SalesReport from './components/SalesReport/SalesReport';
import AdminLogin from './AdminLogin';

import AllRoutes from "./Routes";
import {FirebaseContextProvider} from "./context/FirebaseContext";
import {UserAuthContextProvider} from './context/UserAuthContext'
function App(){
    return (
        <FirebaseContextProvider>
            <UserAuthContextProvider>
            <AllRoutes/>
            </UserAuthContextProvider>
        </FirebaseContextProvider>
    );


    }

export default App;
