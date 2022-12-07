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
import '../Products/pro.css';
import {collection, deleteDoc, doc, onSnapshot, query} from "firebase/firestore";
import {db} from "../../firebase/firebase";
import {useNavigate} from "react-router-dom";
import {useUserAuth} from "../../context/UserAuthContext";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";


const ShowBlog = ({product})=> {
    let navigate = useNavigate();
    const { user } = useUserAuth();
    if(!user){
        navigate('/AdminLogin')
    }
    const [open, setOpen] = React.useState(false);


    const handleClose = () => {
        setOpen(false);
    };
    const handleDelete = async (id) => {
        const taskDocRef = doc(db, 'Blog', id)
        try{
            await deleteDoc(taskDocRef)
            handleClose()
            console.log('deleted successfully')
        } catch (err) {
            handleClose()
            alert(err)

        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };


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
                <div style={{flex: 1}}><h6>{product.data.BlockTitle}</h6></div>
                <div style={{flex: 1}}><h6>{product.data.Description}</h6></div>
                <div style={{flex: 1}}><h6><button style={{width: '100px', fontSize: '14px', padding: 2, height: 30}} onClick={()=> {
                    navigate(`/EditBlog/`+`${product.id}`)
                }
                }>Edit</button></h6></div>
                <div style={{flex: 1}}><h6><button style={{width: '100px', fontSize: '14px', padding: 2, height: 30}} onClick={handleClickOpen}>Delete</button></h6></div>
                <div style={{flex: 1, textAlign: 'start'}}><h6>{product.data.Approved? "Approved": "Pending"}</h6></div>

            </div>
        </>)
}



const Blogs = () => {
    let navigate = useNavigate();
    const { user } = useUserAuth();
    if(!user){
        navigate('/AdminLogin')
    }

    const [products, setProducts] = useState([]);
    useEffect(() => {
        const q = query(collection(db, 'Blog'))
        onSnapshot(q, (querySnapshot) => {
            setProducts(querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })

    }, []);
    const headers = [
        {name: 'Title'},
        {name: 'Description'},
        {name: 'Edit'},
        {name: 'Delete'},
        {name: 'Status'}
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
                    <NavLink to='/AddBlogs' activeStyle>
                        Add Blog
                    </NavLink>




                </NavMenu>

            </Nav>

            <div class="card card-body">

                <form  method="POST" enctype="multipart/form-data"></form>
                <h4 class="card-header">Blogs</h4><br></br>
                <br></br>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: "space-between"}}>
                    {headers.map((item)=> {
                        return <div  style={{flex: 1}}><h6 style={{color: 'black', fontWeight: 'bold', fontSize: '16px'}}>{item.name}</h6></div>
                    })}
                </div>
                <div>
                    {products && products.length && products.map((product)=> {
                        return <ShowBlog product={product}/>
                    })}
                </div>


            </div>
        </div>

    );
};

export default Blogs;

//
// <div style={{display: 'flex', alignItems: "center", justifyContent: "space-between"}}>
//     <div style={{flex: 1}}><h6>{product.data.BlockTitle}</h6></div>
//     <div style={{flex: 1}}><h6>{product.data.Description}</h6></div>
//     <div style={{flex: 1}}><h6><button style={{width: '100px', fontSize: '14px', padding: 2, height: 30}} onClick={()=> {
//         navigate(`/EditBlog/`+`${product.id}`)
//     }
//     }>Edit</button></h6></div>
//     <div style={{flex: 1}}><h6><button style={{width: '100px', fontSize: '14px', padding: 2, height: 30}} onClick={()=> handleDelete(product.id)}>Delete</button></h6></div>
//     <div style={{flex: 1, textAlign: 'start'}}><h6>{product.data.Approved? "Approved": "Pending"}</h6></div>
//
// </div>
