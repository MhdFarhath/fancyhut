// @ts-ignore
import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import LoginUi from './components/Login Ui/LoginUi';
//import SignUp from './components/SignUp';
//import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch, Route, Routes, Navigate, useNavigate} from 'react-router-dom';
import Home from './pages';
import About from './pages/about';
import Events from './pages/events';
import AnnualReport from './pages/annual';
import Teams from './pages/team';
// import Blogs from './pages/blogs';
import signup from './pages/signup';
import AddProducts from './components/AddProducts/AddProducts';
import Products from './components/Products/Products';
import Stocks from './components/Stocks/Stocks';
import UpdateStocks from './components/UpdateStocks/UpdateStocks';
import OrderDetails from './components/OrderDetails/OrderDetails';
import AdminRoles from './components/AdminRoles/AdminRoles';
import AddNewAdmin from './components/AddNewAdmin/AddNewAdmin';
import AddBlogs from './components/Blogs/AddBlogs';
import Blogs from './components/Blogs/Blogs';
import AdminHome from './components/Admin/AdminHome';
import UpdateProduct from './components/UpdateProduct/UpdateProduct';
import SalesReport from './components/SalesReport/SalesReport';
import AdminLogin from './AdminLogin';
import EditAdmin from "./components/AddNewAdmin/EditAdmin";
import EditProduct from "./components/AddProducts/EditProduct";
import {useUserAuth} from "./context/UserAuthContext";
import EditBlog from "./components/Blogs/EditBlog";
import ViewOrder from "./components/OrderDetails/ViewOrder";
import Chat from "./components/chat/Chat";

function AllRoutes(){
    return (
        <div style={{flex: 1}}>
            <Router>
                <Routes>
                    <Route path="/AdminLogin/*"  element={<AdminLogin/>}/>
                    <Route
                        path="/"
                        element={<Navigate to="/AdminLogin" replace />}
                    />
                    {/* <Route path="/" element ={<LoginUi/>} /> */}
                    <Route path="/AdminHome" element ={<AdminHome/>}/>
                    <Route path="/AddProducts" element ={<AddProducts/>}/>
                    <Route path="/Products" element ={<Products/>}/>
                    <Route path="/Blogs" element ={<Blogs/>}/>
                    <Route path="/editProduct/:id" element ={<EditProduct/>}/>
                    <Route path="/Stocks" element ={<Stocks/>}/>
                    <Route path="/UpdateStocks" element ={<UpdateStocks/>}/>
                    <Route path="/OrderDetails" element ={<OrderDetails/>}/>
                    <Route path="/AdminRoles" element ={<AdminRoles/>}/>
                    <Route path="/AddNewAdmin" element ={<AddNewAdmin/>}/>
                    <Route path="/editAdmin/:id" element ={<EditAdmin/>}/>
                    <Route path="/AddBlogs" element ={<AddBlogs/>}/>
                    <Route path="/EditBlog/:id" element ={<EditBlog/>}/>
                    <Route path="/viewOrder/:id" element ={<ViewOrder/>}/>
                    <Route path="/UpdateProduct" element ={<UpdateProduct/>}/>
                    <Route path="/SalesReport" element ={<SalesReport/>}/>
                    <Route path="/Chat" element ={<Chat/>}/>

                </Routes>
            </Router>
        </div>
    );


}

export default AllRoutes;
