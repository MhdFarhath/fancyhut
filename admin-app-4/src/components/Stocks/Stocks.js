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
import './sto.css';
import {useNavigate} from "react-router-dom";
import {collection, deleteDoc, doc, onSnapshot, query, updateDoc} from "firebase/firestore";
import {db} from "../../firebase/firebase";
import {useUserAuth} from "../../context/UserAuthContext";



const Stocks = () => {
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
    const [quantity, setQuantity] = useState(0);
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
        {name: 'Stock'},
        {name: 'change stock'},
        {name: 'Save'}
    ]
    const handleUpdate =async (id)=> {
        const productRef = doc(db, 'AddProducts', id)
        try{
            await updateDoc(productRef, {
                StockQuantity: Number(quantity)
            }).then(()=> {
                setQuantity(0)
            })
        } catch (err) {
            alert(err)
        }
    }
  return (

    <div style={{width: '100vw', height: '100vh'}}>



      <Nav>
      <img src={logo} alt="logo" className="logo6"></img>
      <h1 className="aaf">Fancy Hut</h1>


        <Bars />

        <NavMenu>
          <NavLink to='/AdminHome' activeStyle>
            Dashboard
          </NavLink>

        </NavMenu>

      </Nav>

      <div class="card card-body p-5" style={{paddingLeft: '10%', paddingRight: '10%'}}>

    <form  method="POST" enctype="multipart/form-data"></form>
        <h4 class="card-header">Stocks</h4><br></br>
         <br></br>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: "space-between"}}>
              {headers.map((item)=> {
                  return <div  style={{flex: 1}}><h6 style={{color: 'black', fontWeight: 'bold', fontSize: '16px'}}>{item.name}</h6></div>
              })}
          </div>
          <div>
              {products && products.length && products.map((product)=> {
                  return <div style={{display: 'flex', alignItems: "center", justifyContent: "space-between"}}>
                      <div style={{flex: 1}}><h6>{product.data.ProductName}</h6></div>
                      <div style={{flex: 1}}><h6>{product.data.StockQuantity}</h6></div>
                      <div style={{flex: 1}}><h6><input type={"text"} style={{paddingLeft: 20, width: '50%', borderWidth: '1px', borderRadius: '15px', borderColor: 'black'}} onChange={(e)=> setQuantity(e.target.value)}/></h6></div>
                      <div style={{flex: 1}}><button onClick={()=> handleUpdate(product.id)} style={{ width: '50%', fontSize: '1rem'}} >Save</button></div>
                       </div>
              })}
          </div>


</div>
    </div>

  );
};

export default Stocks;
