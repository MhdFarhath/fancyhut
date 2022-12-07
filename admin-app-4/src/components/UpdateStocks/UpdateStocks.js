import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './NavbarElements';
import logo from './../image/fancy.jpg';
import './upsto.css';
import {useNavigate} from "react-router-dom";
import {useUserAuth} from "../../context/UserAuthContext";



const UpdateStocks = () => {
    let navigate = useNavigate();
    const { user } = useUserAuth();
    if(!user){
        navigate('/AdminLogin')
    }
  return (

    <>



      <Nav>
      <img src={logo} alt="logo" className="logo8"></img>
      <h1 className="aah">Fancy Hut</h1>


        <Bars />

        <NavMenu>
          <NavLink to='/AdminHome' activeStyle>
            Dashboard
          </NavLink>
          <NavLink to='/Stocks' activeStyle>
            Stocks
          </NavLink>





        </NavMenu>

      </Nav>

      <div class="card card-body">

    <form  method="POST" enctype="multipart/form-data"></form>
        <h4 class="card-header">Update Stock</h4><br></br>

        <div class="card-text">
            <div class="form-group row">
                <label for="productName" class="col-sm-2 col-form-label">Product Name</label>
                <div class="col-sm-10">
                    <input type="text"  name="PNAME" class="form-control" id="productName" required></input>
                </div>
            </div>
        </div><br></br>


         <div class="card-text">
            <div class="form-group row">
                <label for="productName" class="col-sm-2 col-form-label">Product ID</label>
                <div class="col-sm-10">
                    <input type="text"  name="ID" class="form-control" id="productName" required></input>
                </div>
            </div>
            </div><br></br>


        <div class="card-text">
            <div class="form-group row">
                <label for="quantity" class="col-sm-2 col-form-label">Stock quantity</label>
                <div class="col-sm-10">
                    <input type="number" name="STOCK" class="form-control" id="quantity" required></input>
                </div>
            </div>
        </div><br></br>



        <div class="d-grid gap-2 col-6 mx-auto">
            <input type="submit" class="btn btn-primary btn-sm " name="sumbit" value="Update"></input>
        </div>

</div>
    </>

  );
};

export default UpdateStocks;
