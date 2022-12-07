import React from 'react'
import { Container, Row, Col, Button, Alert, Breadcrumb, Cart, Form} from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './chart.css';
import { NavLink } from 'react-router-dom';
const Sidebar = () => {
    return (
        <>
         <div id="sidebar" style={{backgroundColor:" #339966"}}>


            <ul className="nav flex-column sticky-top pl-0 pt-5 p-3 mt-2 ">


            <li><NavLink to='/products' activeStyle><button  id="amm" type="button" class="btn btn-outline-light "><i class="fas fa-band-aid"></i>Manage Products</button></NavLink></li>

                <li><NavLink to='/Stocks' activeStyle><button  id="amm" type="button" class="btn btn-outline-light ">Stock Details</button></NavLink></li>

                <li><NavLink to='/OrderDetails' activeStyle><button  id="amm" type="button" class="btn btn-outline-light ">Order Details</button></NavLink></li>

                {/*<li ><button id="amm" type="button" class="btn btn-outline-light"> User View Page </button></li>*/}
                <li ><NavLink to='/AdminRoles' activeStyle><button  id="amm" type="button" class="btn btn-outline-light">Admin Roles</button></NavLink></li>
                <li ><NavLink to='/AddNewAdmin' activeStyle><button  id="amm" type="button" class="btn btn-outline-light">Add New Admin</button></NavLink></li>
                <li ><NavLink to='/Blogs' activeStyle><button  id="amm" type="button" class="btn btn-outline-light">Manage Blogs</button></NavLink></li>
                <li ><NavLink to='/SalesReport' activeStyle><button  id="amm" type="button" class="btn btn-outline-light">Sales Reports</button></NavLink></li>
                {/* <li className="nav-item mb-2">


                   </li> */}
                <li className="nav-item mb-2"><a className="nav-link text-dark" href="#"><i className="far fa-chart-bar font-weight-bold"></i> <span className="ml-3"></span></a></li>
                <li className="nav-item mb-2"><a className="nav-link text-dark" href="#"><i className="far fa-chart-bar font-weight-bold"></i> <span className="ml-3"></span></a></li>


            </ul>


       </div>




     </>
    )
};
export default Sidebar;
