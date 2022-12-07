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
import './uppro.css';
import { MenuItem } from 'material-ui';
import {useNavigate} from "react-router-dom";
import {useUserAuth} from "../../context/UserAuthContext";



const UpdateProduct = () => {
    let navigate = useNavigate();
    const { user } = useUserAuth();
    if(!user){
        navigate('/AdminLogin')
    }
  return (

    <>



      <Nav>
      <img src={logo} alt="logo" className="logo7"></img>
      <h1 className="aag">Fancy Hut</h1>


        <Bars />

        <NavMenu>
          <NavLink to="/AdminHome" activeStyle>
            Dashboard
          </NavLink>
          <NavLink to='/Products' activeStyle>
            Products
          </NavLink>




        </NavMenu>

      </Nav>

      <div class="card card-body">

    <form  method="POST" enctype="multipart/form-data"></form>
        <h4 class="card-header">Update Products</h4><br></br>
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
                <label for="productName" class="col-sm-2 col-form-label">Product Name</label>
                <div class="col-sm-10">
                    <input type="text"  name="PNAME" class="form-control" id="productName" required></input>
                </div>
            </div>
        </div><br></br>



        <div class="card-text">
            <div class="form-group row">
                <label for="price"   class="col-sm-2 col-form-label">Price</label>
                <div class="col-sm-10">
                    <input type="text" name="PRICE" class="form-control" id="price" required ></input>
                </div>
            </div>
        </div><br></br>


        <div class="card-text">
            <div class="form-group row">
            <label for="category"  class="col-sm-2 col-form-label">Category</label>
            <div class="col-sm-10">
            <select name="CATEGORY" class="form-select form-select-lg mb-3 form-control"  aria-label=".form-select-lg example" required>
                <option selected>Choose...</option>
                <option value="Flower">Flower Plants</option>
                <option value="Cactus">Cactus</option>
                <option value="Air">Air Plants</option>
                <option value="Herbal">Herbal Plants</option>
                <option value="Table">Table Plants</option>
                <option value="Fruit">Fruit Plants</option>

            </select>
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

        <div class="card-text">
            <div class="form-group row">
                <label for="description" class="col-sm-2 col-form-label">Description</label>
                <div class="col-sm-10">
                    <textarea class="form-control" name="DESCRIPTION" id="description" rows="4"></textarea>
                </div>
            </div>
        </div><br></br>

        <div class="card-text">
            <div class="form-group row">
                <label for="importing" class="col-sm-2 col-form-label">Import Image</label>
                <div class="col-sm-10">
                    <div class="custom-file">
                        <input type="file" name="file" ></input>
                    </div>
                </div>
            </div>
        </div><br></br>

        <div class="card-text">
            <div class="form-group row">
                <label for="importing" class="col-sm-2 col-form-label">Import Video</label>
                <div class="col-sm-10">
                    <div class="custom-file">
                        <input type="file" name="file"></input>
                    </div>
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

export default UpdateProduct;
