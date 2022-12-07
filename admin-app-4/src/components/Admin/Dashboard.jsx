import React, {useContext, useRef, useState} from "react";
import { Container, Row, Col, Button, Alert, Breadcrumb, Cart, Form} from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import './dashboard.css';
import { colors, styled } from "@material-ui/core";
import { Visibility } from "@material-ui/icons";

import Widgetsm from './Widgetsm';
import Widgetlg from './Widgetlg';
import {firebaseContext} from "../../context/FirebaseContext";



const Dashboard = () => {
    const {products, users, orders} = useContext(firebaseContext);
return (

         <div style={{width: '100%', height: '100%'}}>
             <div className="dashboard container-fluid">
          <h2 > Dashboard</h2>
          </div>
             {/*<div className={"row"}></div>*/}
               <div className="row">
          <div className="featuredItem col-sm-12 col-md-4">
               <span className="featuredTitle ">Orders</span>
           <div>
               <span ClassName="featuredMoney">{orders?.length}</span>
              </div>

               <div  ClassName="featuredSub">
               <span>Total (Rs.

               {/*    {orders && orders.length > 0 &&  orders[0].data.order.reduce((acc, curr)=> {*/}
               {/*    let total = acc+ curr.Price* curr.Quantity;*/}
               {/*    return total;*/}
               {/*}, 0)}*/}

                   {orders.reduce((acc, curr)=> {
                       let ftotal = acc + curr.data.order.reduce((acc2, curr2)=> {
                           let total = acc2 + curr2.Price * curr2.Quantity;
                           return total;
                       }, 0);
                       return ftotal;
                   }, 0)}
                   )

               </span>
               </div>
          </div>

          <div className="featuredItem col-md-4 col-sm-12 ">
              <span className="featuredTitle ">Users</span>
               <div>
               <span ClassName="featuredMoney">No of users {users.length}</span>
               </div>

               {/*<span ClassName="featuredSub">Compared to last month</span>*/}

          </div>

          <div className="featuredItem col-md-4 col-sm-12 ">
               <div>
               <span className="featuredTitle ">Products</span>
               </div>

                    <div>
               <span ClassName="featuredMoney">No of Products {products.length}</span>

               </div>
               {/*<span ClassName="featuredSub">Compared to last month</span>*/}

          </div>

          </div>
          <>

          </>

           <div >

           <div class="container-fluid" >
<div class="row">
<div class="col-sm-12 col-md-6 col-xl-6"><Widgetsm/></div>
<div class="col-sm-12 col-md-6 col-xl-6"><Widgetlg/></div>


</div>
</div>

           </div>


         </div>




)

}
export default Dashboard;
