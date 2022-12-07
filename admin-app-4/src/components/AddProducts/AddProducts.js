import React, {useContext, useState} from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './NavbarElements';
import logo from './../image/fancy.jpg';
import './addpr.css';
import { MenuItem } from 'material-ui';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import {storage} from "../../firebase/firebase";
import {firebaseContext} from "../../context/FirebaseContext";
import {useNavigate} from "react-router-dom";
import {useUserAuth} from "../../context/UserAuthContext";


const AddProducts = () => {
    let navigate = useNavigate();
    const { user } = useUserAuth();
    if(!user){
        navigate('/AdminLogin')
    }
    const [file, setFile] = useState(undefined);
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState(0);
    const [description, setDescription] = useState('');
    const [showError, setShowError] = useState(false);
    const [image, setImage] = useState();
    const [videoLink, setVideoLink] = useState(null);
    const {addProduct} = useContext(firebaseContext);

    const handleProductCreate = ()=> {
        console.log(productName, price, category, stock, description, image);
        const file = image

        if (!file) {
            setShowError(true);
        }else {

            const storageRef = ref(storage, `images/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on("state_changed",
                (snapshot) => {
                    const progress =
                        Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgresspercent(progress);
                },
                (error) => {
                    alert(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImgUrl(downloadURL)
                        saveProduct(downloadURL)
                    });
                }
            )
        }
    }
const saveProduct=async (image)=> {
  await  addProduct(productName, price, category, stock, description, image,videoLink).then(()=> {
      navigate('/Products')
  });
}
    const [imgUrl, setImgUrl] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);

    const handleImageChange =(e)=> {
        setImage(e.target.files[0]);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
    return (

    <div style={{flex: 1, height: '100vh', width: '100vw'}}>
      <Nav>
      <img src={logo} alt="logo" className="logo1"></img>
      <h1 className="aaa">Fancy Hut</h1>
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
        <h4 class="card-header">Add Product</h4><br></br>
        <div class="card-text">
            <div class="form-group row">
                <label for="productName" class="col-sm-2 col-form-label">Product Name</label>
                <div class="col-sm-10">
                    <input type="text"  name="PNAME" class="form-control" id="productName" required onChange={(e)=> setProductName(e.target.value)}></input>
                </div>
            </div>
        </div><br></br>


        <div class="card-text">
            <div class="form-group row">
                <label for="price"   class="col-sm-2 col-form-label">Price</label>
                <div class="col-sm-10">
                    <input type="text" name="PRICE" class="form-control" id="price" required onChange={(e)=> setPrice(e.target.value)}></input>
                </div>
            </div>
        </div><br></br>


        <div class="card-text">
            <div class="form-group row">
            <label for="category"  class="col-sm-2 col-form-label">Category</label>
            <div class="col-sm-10">
            <select name="CATEGORY" class="form-select form-select-lg mb-3 form-control"  aria-label=".form-select-lg example" required onChange={(e)=> setCategory(e.target.value)}>
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
                    <input type="number" name="STOCK" class="form-control" id="quantity" required onChange={(e)=> setStock(e.target.value)}></input>
                </div>
            </div>
        </div><br></br>

          <div className="card-text">
              <div className="form-group row">
                  <label htmlFor="Youtube Video Link" className="col-sm-2 col-form-label">Video Link</label>
                  <div className="col-sm-10">
                      <input type="text" name="Link" className="form-control" id="Link" required
                             onChange={(e) => setVideoLink(e.target.value)}></input>
                  </div>
              </div>
          </div>
          <br></br>

        <div class="card-text">
            <div class="form-group row">
                <label for="description" class="col-sm-2 col-form-label">Description</label>
                <div class="col-sm-10">
                    <textarea class="form-control" name="DESCRIPTION" id="description" rows="4" onChange={(e)=> setDescription(e.target.value)}></textarea>
                </div>
            </div>
        </div><br></br>

        <div class="card-text">
            <div class="form-group row">
                <label for="importing" class="col-sm-2 col-form-label">Import Image</label>
                <div class="col-sm-10">
                    <div class="custom-file">
                        <input type="file" name="file" onChange={(e)=> {
                            handleImageChange(e);
                            setShowError(false);
                        }}></input>
                    </div>
                </div>
            </div>
            {showError && !image && <h6 style={{color: 'red'}}>Image required</h6>}
        </div><br></br>
          <div>
              {
                  !imgUrl && progresspercent !== 0 &&
                  <div className='outerbar'>
                      <div className='innerbar' style={{ width: `${progresspercent}%` }}>{progresspercent}%</div>
                  </div>
              }
              { file && <img src={file} style={{width: '100px', height: '100px'}}/>}
          </div>

        <div class="d-grid gap-2 col-6 mx-auto">
            <button type="submit" class="btn btn-primary btn-sm " name="sumbit" value="Add Product" onClick={handleProductCreate}>Add Product</button>
        </div>
</div>
    </div>

  );
};

export default AddProducts;
