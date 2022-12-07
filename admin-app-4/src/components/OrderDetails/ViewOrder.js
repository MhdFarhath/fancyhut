import React, {useEffect, useState, useContext} from 'react';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
} from './NavbarElements';
import logo from './../image/fancy.jpg';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useUserAuth} from "../../context/UserAuthContext";
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import {firebaseContext} from '../../context/FirebaseContext'
import {doc, getDoc} from "firebase/firestore";
import {db} from "../../firebase/firebase";


const OrderDetails = () => {
    const [orderCurrStatus, setOrderCurrStatus] = useState(null);
    const {id} = useParams();
    let navigate = useNavigate();
    const { user } = useUserAuth();
    const [order, setOrder] = useState(null);
    const [currentOrder, setCurrentOrder] = useState([]);
    const {handleUpdateOrderStatus, orders} = useContext(firebaseContext);
    useEffect(() => {
    if(orders){
        setCurrentOrder(orders.filter((item)=> item.id == id)[0]);
    }
    }, [orders]);

    useEffect(() => {
        findOrder(id);

    }, [id]);

    const findOrder= async ()=> {
        const productRef = doc(db, "Order", id);
        const docSnap = await getDoc(productRef);
        const product = {
           data:  docSnap.data(),
            id: docSnap.id
        };
        setOrder(product);
        setOrderCurrStatus(docSnap.data().orderStatus);
    }


    if(!user){
        navigate('/AdminLogin')
    }

    const headers = [
        {name: 'order Id'},
        {name: 'Buyer Name'},
        {name: 'Order status'},
        {name: 'Update order status'},
        {name: 'View'},
        {name: 'Delete'},
    ]
    let location = useLocation();
    console.log(location);
    return (

        <div style={{width: '100vw', height: '100vh'}}>



            <Nav>
                <img src={logo} alt="logo" className="logo2"></img>
                <h1 className="abb">Fancy Hut</h1>


                <Bars />

                <NavMenu>
                    <NavLink to='/AdminHome' activeStyle>
                        Dashboard
                    </NavLink>




                </NavMenu>

            </Nav>

            <div class="card card-body">

                <form  method="POST" enctype="multipart/form-data"></form>
                <h4 class="card-header">Order Detail</h4><br></br>
                <br></br>
                <div className="table-responsive">
                    <table className="table bordered striped">
                        <thead>
                        <tr>
                            <th>Image</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Address</th>
                            {/*<th>Order Status</th>*/}
                        </tr>
                        </thead>
                        <tbody>
                        {order !==null &&  order.data.order.map((item, index)=> {
                            console.log('my cart items', currentOrder)
                            return (<tr>
                                <td><img src={item.Image} className="img-thumbnail"  style={{width: '50px', height: '50px'}} alt="..."/></td>
                                <td>{item.ProductName}</td>
                                <td>{item.Price}</td>
                                <td>{item.Quantity}</td>
                                {index == 0 &&  <td>{currentOrder?.data?.DeliveryAddress?.address}, {currentOrder?.data?.DeliveryAddress?.city}, {currentOrder?.data?.DeliveryAddress?.country}</td>}
                                {/*<td>*/}
                                {/*    <div className="btn-group" role="group" aria-label="Basic example">*/}
                                {/*        <select name="CATEGORY" value={orderCurrStatus}*/}
                                {/*                className="form-select form-select-lg mb-3 form-control"*/}
                                {/*                aria-label=".form-select-lg example" required*/}
                                {/*                onChange={(e) => {*/}
                                {/*                    handleUpdateOrderStatus(e.target.value, order.id);*/}
                                {/*                    setOrderCurrStatus(e.target.value);*/}
                                {/*                }}>*/}
                                {/*            <option value="CREATED" selected={order.data.orderStatus == "CREATED"}> Order Created</option>*/}
                                {/*            <option value="ACCEPTED" selected={order.data.orderStatus == "ACCEPT"}>Accept order</option>*/}
                                {/*            <option value="ORDER_CANCELED" selected={order.data.orderStatus == "ORDER_CANCEL"}>cancel order</option>*/}
                                {/*            <option value="ON_THE_WAY" selected={order.data.orderStatus == "ON_THE_WAY"}>order on the way</option>*/}
                                {/*            <option value="ORDER_DELIVERED" selected={order.data.orderStatus == "ORDER_DELIVERED"}>order delivered</option>*/}
                                {/*            <option value="ORDER_FAIL" selected={order.data.orderStatus == "ORDER_FAIL"}>order fail</option>*/}
                                {/*            <option value="ORDER_COMPLETED" selected={order.data.orderStatus == "ORDER_COMPLETED"}>order complete</option>*/}

                                {/*        </select>*/}
                                {/*    </div>*/}
                                {/*</td>*/}
                            </tr>)
                        })}
                        </tbody>
                    </table>
                </div>
                            </div>
        </div>

    );
};

export default OrderDetails;
