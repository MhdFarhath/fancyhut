import React, { useContext} from 'react';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
} from './NavbarElements';
import logo from './../image/fancy.jpg';
import {useNavigate} from "react-router-dom";
import {useUserAuth} from "../../context/UserAuthContext";
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import {firebaseContext} from '../../context/FirebaseContext'
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";



const ShowOrder= ({order})=> {
    let navigate = useNavigate();
    const { user } = useUserAuth();
    if(!user){
        navigate('/AdminLogin')
    }
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const headers = [
        {name: 'order Id'},
        {name: 'Buyer Name'},
        {name: 'Order status'},
        {name: 'Update order status'},
        {name: 'View'},
        {name: 'Delete'},
    ]
    const { handleDeleteOrder, handleUpdateOrderStatus} = useContext(firebaseContext);
    return (
        <>
            <Dialog
                open={open}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Confirm to Delete?"}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={()=> handleDeleteOrder(order.id)}>Confirm</Button>
                </DialogActions>
            </Dialog>
            <div style={{display: 'flex', alignItems: "center", justifyContent: "space-between"}}>
                <div style={{flex: 1}}><h6>{order.id}</h6></div>
                <div style={{flex: 1}}><h6>{order.data.BuyerName}</h6></div>
                <div style={{flex: 1}}><h6>{order.data.orderStatus}</h6></div>
                {/*<div style={{flex: 1}}><h6>{order.data.CreatedAt}</h6></div>*/}
                <div style={{flex: 1}}>
                    <select name="CATEGORY" value={order.data.orderStatus}
                            className="form-select form-select-lg mb-3 form-control"
                            aria-label=".form-select-lg example" required
                            onChange={(e) => handleUpdateOrderStatus(e.target.value, order.id)}>
                        <option value="CREATED" selected={order.data.orderStatus == "CREATED"}> Order Created</option>
                        <option value="ACCEPTED" selected={order.data.orderStatus == "ACCEPT"}>Accept order</option>
                        <option value="ORDER_CANCELED" selected={order.data.orderStatus == "ORDER_CANCEL"}>cancel order</option>
                        <option value="ON_THE_WAY" selected={order.data.orderStatus == "ON_THE_WAY"}>order on the way</option>
                        <option value="ORDER_DELIVERED" selected={order.data.orderStatus == "ORDER_DELIVERED"}>order delivered</option>
                        <option value="ORDER_FAIL" selected={order.data.orderStatus == "ORDER_FAIL"}>order fail</option>
                        <option value="ORDER_COMPLETED" selected={order.data.orderStatus == "ORDER_COMPLETED"}>order complete</option>

                    </select>
                </div>
                <Link to={`/viewOrder/${order.id}`} style={{flex: 1}}><h6><button style={{width: '100px', fontSize: '14px', padding: 2, height: 30}}>View</button></h6></Link>
                <div style={{flex: 1}}><h6><button style={{width: '100px', fontSize: '14px', padding: 2, height: 30}} onClick={handleClickOpen}>Delete</button></h6></div>
            </div>
        </>)
}


const OrderDetails = () => {
    let navigate = useNavigate();
    const { user } = useUserAuth();
    const {orders} = useContext(firebaseContext);

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
                <h4 class="card-header">ORDERS</h4><br></br>
                <br></br>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: "space-between"}}>
                    {headers.map((item)=> {
                        return <div  style={{flex: 1}}><h6 style={{color: 'black', fontWeight: 'bold', fontSize: '16px'}}>{item.name}</h6></div>
                    })}
                </div>
                <div>
                    {orders && orders.length && orders.map((order)=> {
                        return (<ShowOrder order={order} />)
                    })}
                </div>

            </div>
        </div>

    );
};

export default OrderDetails;

//
// <div style={{display: 'flex', alignItems: "center", justifyContent: "space-between"}}>
//     <div style={{flex: 1}}><h6>{order.id}</h6></div>
//     <div style={{flex: 1}}><h6>{order.data.BuyerName}</h6></div>
//     <div style={{flex: 1}}><h6>{order.data.orderStatus}</h6></div>
//     {/*<div style={{flex: 1}}><h6>{order.data.CreatedAt}</h6></div>*/}
//     <div style={{flex: 1}}>
//         <select name="CATEGORY" value={order.data.orderStatus}
//                 className="form-select form-select-lg mb-3 form-control"
//                 aria-label=".form-select-lg example" required
//                 onChange={(e) => handleUpdateOrderStatus(e.target.value, order.id)}>
//             <option value="CREATED" selected={order.data.orderStatus == "CREATED"}> Order Created</option>
//             <option value="ACCEPTED" selected={order.data.orderStatus == "ACCEPT"}>Accept order</option>
//             <option value="ORDER_CANCELED" selected={order.data.orderStatus == "ORDER_CANCEL"}>cancel order</option>
//             <option value="ON_THE_WAY" selected={order.data.orderStatus == "ON_THE_WAY"}>order on the way</option>
//             <option value="ORDER_DELIVERED" selected={order.data.orderStatus == "ORDER_DELIVERED"}>order delivered</option>
//             <option value="ORDER_FAIL" selected={order.data.orderStatus == "ORDER_FAIL"}>order fail</option>
//             <option value="ORDER_COMPLETED" selected={order.data.orderStatus == "ORDER_COMPLETED"}>order complete</option>
//
//         </select>
//     </div>
//     <Link to={`/viewOrder/${order.id}`} style={{flex: 1}}><h6><button style={{width: '100px', fontSize: '14px', padding: 2, height: 30}}>View</button></h6></Link>
//     <div style={{flex: 1}}><h6><button style={{width: '100px', fontSize: '14px', padding: 2, height: 30}} onClick={()=> handleDeleteOrder(order.id)}>Delete</button></h6></div>
// </div>
