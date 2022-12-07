import React, {useEffect, useState} from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './NavbarElements';
import logo from './../image/fancy.jpg';
import './pro.css';
import {collection, deleteDoc, doc, onSnapshot, query} from "firebase/firestore";
import {db} from "../../firebase/firebase";
import {useNavigate} from "react-router-dom";
import {useUserAuth} from "../../context/UserAuthContext";
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';


const ShowProduct = ({product})=> {
    const useStyles = makeStyles((theme) => ({
        root: {
            maxWidth: 345,
        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
        avatar: {
            backgroundColor: red[500],
        },
    }));

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
    const handleDelete = async (id) => {
        const taskDocRef = doc(db, 'AddProducts', id)
        try{
            await deleteDoc(taskDocRef)
            console.log('deleted successfully');
            handleClose()
        } catch (err) {
            alert(err)
            handleClose()
        }
    }
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const q = query(collection(db, 'AddProducts'))
        onSnapshot(q, (querySnapshot) => {
            setProducts(querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })

    }, []);
    const headers = [
        {name: 'Product Name'},
        {name: 'Price'},
        {name: 'Category'},
        {name: 'Stock'},
        {name: 'Description'},
        {name: 'Edit'},
        {name: 'Delete'},
    ]
    const classes = useStyles();

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
                    <Button onClick={()=> handleDelete(product.id)}>Confirm</Button>
                </DialogActions>
            </Dialog>
        <div style={{display: 'flex', alignItems: "center", justifyContent: "space-between"}}>
        <div style={{flex: 1}}><h6>{product.data.ProductName}</h6></div>
        <div style={{flex: 1}}><h6>{product.data.Price}</h6></div>
        <div style={{flex: 1}}><h6>{product.data.Category}</h6></div>
        <div style={{flex: 1}}><h6>{product.data.StockQuantity}</h6></div>
        {/*<div style={{flex: 1}}><h6>{product.data.Description}</h6></div>*/}
        <div style={{flex: 1}}><h6><button style={{width: '100px', fontSize: '14px', padding: 2, height: 30}} onClick={()=> {
            navigate(`/editProduct/`+`${product.id}`)
        }
        }>Edit</button></h6></div>
        <div style={{flex: 1}}><h6><button style={{width: '100px', fontSize: '14px', padding: 2, height: 30}} onClick={handleClickOpen} >Delete</button></h6></div>
    </div>
        </>)
// onClick={()=> handleDelete(product.id)
}

const Products = () => {

    const useStyles = makeStyles((theme) => ({
        root: {
            maxWidth: 345,
        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
        avatar: {
            backgroundColor: red[500],
        },
    }));
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    let navigate = useNavigate();
    const { user } = useUserAuth();
    if(!user){
        navigate('/AdminLogin')
    }
    const handleDelete = async (id) => {
        const taskDocRef = doc(db, 'AddProducts', id)
        try{
            await deleteDoc(taskDocRef)
            console.log('deleted successfully')
        } catch (err) {
            alert(err)
        }
    }
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const q = query(collection(db, 'AddProducts'))
        onSnapshot(q, (querySnapshot) => {
            setProducts(querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })

    }, []);
    const headers = [
        {name: 'Product Name'},
        {name: 'Price'},
        {name: 'Category'},
        {name: 'Stock'},
        // {name: 'Description'},
        {name: 'Edit'},
        {name: 'Delete'},
    ]
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
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
          <NavLink to='/AddProducts' activeStyle>
            Add Product
          </NavLink>




        </NavMenu>

      </Nav>

      <div class="card card-body">

    <form  method="POST" enctype="multipart/form-data"></form>
        <h4 class="card-header">Products</h4><br></br>
         <br></br>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: "space-between"}}>
              {headers.map((item)=> {
                  return <div  style={{flex: 1}}><h6 style={{color: 'black', fontWeight: 'bold', fontSize: '16px'}}>{item.name}</h6></div>
              })}
          </div>
          <div>
              {products && products.length && products.map((product)=> {
                  return <ShowProduct product={product}/>
              })}
          </div>

</div>
    </div>

  );
};

export default Products;
