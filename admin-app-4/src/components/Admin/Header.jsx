import React, { useRef, useState,useEffect } from "react";
import { Container, Row, Col, Button, Alert, Breadcrumb, Cart, Form} from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import './chart.css';
import logo from './../image/fancy.jpg';
import {Link, NavLink, useNavigate} from "react-router-dom";
import {useUserAuth} from "../../context/UserAuthContext";
import {Drawer, IconButton, Box, List, Divider, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import { InboxIcon, Menu, MailIcon} from "@material-ui/icons";
import {collection, doc, onSnapshot, orderBy, query, updateDoc, where, getDocs} from "firebase/firestore";
import {db} from "../../firebase/firebase";

//#0A2558
//bg-success
export const Navbar = () => {
    const { logOut } = useUserAuth();
    let navigate = useNavigate();
    const handleLogOut = () => {
        logOut().then(()=> {
            navigate('/AdminLogin')
        })
    }
    const [showMsgNotification, setShowMsgNotification] = useState(false);
    const updateMessageStatus = async (messageId)=> {
        console.log('update method called', messageId)
        const orderRef = doc(db, 'Messages', messageId)
        try{
            const res = await updateDoc(orderRef, {
                adminRead: "READ",
            });
            console.log('message status update success FROM HEADER', new Date(),  res);
        } catch (err) {
            alert(err)
        }
    }
 const hadleUpdate = async () => {
     const q = query(collection(db, "Messages"), where("adminRead", "==", "UNREAD"));

     const querySnapshot = await getDocs(q);
     querySnapshot.docs.map(doc => {
         return {
             id: doc.id,
             data: doc.data()
         }
     }).map((item)=> {
         updateMessageStatus(item.id)
     })
        // const q = query(collection(db, 'Messages'), orderBy('createdAt'))
        // onSnapshot(q, (querySnapshot) => {
        //     let newMessage = querySnapshot.docs.map(doc => {
        //         return {
        //             id: doc.id,
        //             data: doc.data()
        //         }
        //     });
        //     newMessage.map((message) => {
        //         console.log({message})
        //         if ((message.data.adminRead == 'UNREAD' || message.data.adminRead == undefined)) {
        //             updateMessageStatus(message.id);
        //             console.log('update messate')
        //         }
        //     })
        // })
    }
    const  getNewMessages  = async ()=> {
        try{
            const q = query(collection(db, 'Messages'), where('adminRead', "==", 'UNREAD'))
            onSnapshot(q, (querySnapshot) => {
                let messages = querySnapshot.docs.map(doc => doc.data());
                if(messages.length > 0){
                    setShowMsgNotification(true)
                }else {
                    setShowMsgNotification(false);
                }
            })

        }catch  (e) {
            console.debug('error white get my orders', e);
        }
    }
    useEffect(() => {
        getNewMessages()
    }, []);

    const [show, setShow] = useState(false);
    return (
        <nav class="navbar fixed-top navbar-expand-md navbar-dark text-white headerMain" style={{backgroundColor:"#339966"}  }>
            <Drawer
                anchor={"left"}
                open={show}
                onClose={()=> setShow(false)}
            >
                {/*<Box>*/}
                {/*    <List>*/}
                {/*            <ListItem>*/}
                {/*                    <ListItemIcon>*/}
                {/*                       <h1> heading</h1>*/}
                {/*                    </ListItemIcon>*/}
                {/*                    <ListItemText />*/}
                {/*            </ListItem>*/}

                {/*    </List>*/}
                {/*</Box>*/}
                <div style={{backgroundColor: " #339966", marginTop: '45px'}}>


                    <ul className="nav flex-column pl-0 pt-5 p-3 mt-2 ">


                        <li><NavLink to='/products' activeStyle>
                            <button id="amm" type="button" className="btn btn-outline-light "><i
                                className="fas fa-band-aid"></i>Manage Products
                            </button>
                        </NavLink></li>

                        <li><NavLink to='/Stocks' activeStyle>
                            <button id="amm" type="button" className="btn btn-outline-light ">Stock Details</button>
                        </NavLink></li>

                        <li><NavLink to='/OrderDetails' activeStyle>
                            <button id="amm" type="button" className="btn btn-outline-light ">Order Details</button>
                        </NavLink></li>

                        <li>
                            <button id="amm" type="button" className="btn btn-outline-light"> User View Page</button>
                        </li>
                        <li><NavLink to='/AdminRoles' activeStyle>
                            <button id="amm" type="button" className="btn btn-outline-light">Admin Roles</button>
                        </NavLink></li>
                        <li><NavLink to='/AddNewAdmin' activeStyle>
                            <button id="amm" type="button" className="btn btn-outline-light">Add New Admin</button>
                        </NavLink></li>
                        <li><NavLink to='/Blogs' activeStyle>
                            <button id="amm" type="button" className="btn btn-outline-light">Manage Blogs</button>
                        </NavLink></li>
                        <li><NavLink to='/SalesReport' activeStyle>
                            <button id="amm" type="button" className="btn btn-outline-light">Sales Reports</button>
                        </NavLink></li>
                        {/* <li className="nav-item mb-2">


                   </li> */}
                        <li className="nav-item mb-2"><a className="nav-link text-dark" href="#"><i
                            className="far fa-chart-bar font-weight-bold"></i> <span className="ml-3"></span></a></li>
                        <li className="nav-item mb-2"><a className="nav-link text-dark" href="#"><i
                            className="far fa-chart-bar font-weight-bold"></i> <span className="ml-3"></span></a></li>


                    </ul>


                </div>
            </Drawer>
            <div className="mobileMenuIcon">
                <IconButton
                    className={"menuIconForMobile"}
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={()=> setShow(!show)}
                >
                  <Menu/>
                </IconButton>
            </div>
            <ul >
               <div >


                {/* <li><img src={logo} width="60px" height="60px" alt="logo" className="logo"></img></li> */}
                <img src={logo} alt="logo" className="logo headerMainLogo"></img>

                <li className="nav-item mb-2 mt-3"><h4 id="fancyhut" className="fancyhut headerMainTitle">Fancy Hut</h4></li>

                <div className="aa-mm headerButtons">

                <li style={{position: 'relative'}}><Link to={'/Chat'}>
                    {showMsgNotification && <img src='./notification.png' style={{width: 20, height: 20, position: 'absolute', top: 0, right: 7}}></img>}

                    <button type="button" class="btn btn-outline-light" onClick={()=> hadleUpdate()}>Chat</button>
                </Link></li>
                <li ><a id="am"><button type="button" class="btn btn-outline-light " onClick={()=> handleLogOut()}>Signout</button></a></li>
                </div>
                </div>
            </ul>
        </nav>

    )
}
export default Navbar;
