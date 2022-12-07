import React, {useContext, useEffect, useState} from 'react';
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
import {db, storage} from "../../firebase/firebase";
import {firebaseContext} from "../../context/FirebaseContext";
import {useNavigate, useParams} from "react-router-dom";
import {collection, onSnapshot, query,getDocs, where, doc, updateDoc, getDoc} from "firebase/firestore";
import isMagnetURI from "validator/es/lib/isMagnetURI";
import {useUserAuth} from "../../context/UserAuthContext";



const EditProduct = () => {
    let navigate = useNavigate();
    const { user } = useUserAuth();
    if(!user){
        navigate('/AdminLogin')
    }
    const {id}  = useParams();
    useEffect(() => {
        getProduct()
    }, []);
    const [file, setFile] = useState(undefined);
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState(0);
    const [description, setDescription] = useState('');
    const [image, setImage] = useState("");
    const [videoLink, setVideoLink] = useState(null);
    const {addProduct} = useContext(firebaseContext);
    const handleImageChange =(e)=> {
        setImage(e.target.files[0])
        setFile(URL.createObjectURL(e.target.files[0]));
    }
    const [imgUrl, setImgUrl] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);

    const getProduct =async ()=> {
        const productRef = doc(db, "AddProducts", id);
        const docSnap = await getDoc(productRef);
        const product = docSnap.data();
        console.log('this is the data',docSnap.data())
        console.log('got user', product)
       setProductName(product.ProductName? product.ProductName: product.ProductName);
        setPrice(product.Price? product.Price : "");
        setCategory(product.Category? product.Category: "");
        setDescription(product.Description? product.Description : '');
        setStock(product.StockQuantity?product.StockQuantity: 0);
        setImgUrl(product.Image? product.Image : "");
        setVideoLink(product.Video? product.Video : null);
    }

    const handleUpdate = async (imageurl) => {
        const productRef = doc(db, 'AddProducts', id)
        try{
            await updateDoc(productRef, {
                ProductName: productName,
                Price: price,
                Category: category,
                Description: description,
                StockQuantity: stock,
                Image: imageurl? imageurl : image,
                Video: videoLink? videoLink : null,
            }).then(()=> {
                navigate('/Products')
            })
        } catch (err) {
            alert(err)
        }
    }

    const handleProductCreate = ()=> {
        console.log(productName, price, category, stock, description, image);
        if(image) {
            const file = image

            if (!file) return;

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
                        handleUpdate(downloadURL)
                    });
                }
            )
        }else {
            handleUpdate(imgUrl)
        }
    }

    return (

        <div style={{width: '100vw', height: '100vh'}}>



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

            <div class="card card-body mb-3 pl-3 pr-3" style={{paddingLeft: '30px',  paddingRight: '30px'}}>

                <form  method="POST" enctype="multipart/form-data"></form>
                <h4 class="card-header">Edit Product</h4><br></br>

                <div class="card-text">
                    <div class="form-group row">
                        <label for="productName" class="col-sm-2 col-form-label">Product Name</label>
                        <div class="col-sm-10">
                            <input type="text"  value={productName} name="PNAME" class="form-control" id="productName" required onChange={(e)=> setProductName(e.target.value)}></input>
                        </div>
                    </div>
                </div><br></br>



                <div class="card-text">
                    <div class="form-group row">
                        <label for="price"   class="col-sm-2 col-form-label">Price</label>
                        <div class="col-sm-10">
                            <input type="text"  value={price} name="PRICE" class="form-control" id="price" required onChange={(e)=> setPrice(e.target.value)}></input>
                        </div>
                    </div>
                </div><br></br>

                                <div class="card-text">
                    <div class="form-group row">
                        <label for="category"  class="col-sm-2 col-form-label">Category</label>
                        <div class="col-sm-10">
                            <select name="CATEGORY"  value={category} class="form-select form-select-lg mb-3 form-control"  aria-label=".form-select-lg example" required onChange={(e)=> setCategory(e.target.value)}>
                                <option value="Flower" selected={category == "Flower"}>Flower Plants</option>
                                <option value="Cactus" selected={category == "Cactus"}>Cactus</option>
                                <option value="Air" selected={category == "Air"}>Air Plants</option>
                                <option value="Herbal" selected={category == "Herbal"}>Herbal Plants</option>
                                <option value="Table" selected={category == "Table"}>Table Plants</option>
                                <option value="Fruit" selected={category == "Fruit"}>Fruit Plants</option>

                            </select>
                        </div>
                    </div>
                </div><br></br>


                <div class="card-text">
                    <div class="form-group row">
                        <label for="quantity" class="col-sm-2 col-form-label">Stock quantity</label>
                        <div class="col-sm-10">
                            <input type="number"  value={stock} name="STOCK" class="form-control" id="quantity" required onChange={(e)=> setStock(e.target.value)}></input>
                        </div>
                    </div>
                </div><br></br>

                <div className="card-text">
                    <div className="form-group row">
                        <label htmlFor="VideoLink" className="col-sm-2 col-form-label">Video Link</label>
                        <div className="col-sm-10">
                            <input type="text" value={videoLink} name="link" className="form-control" id="video"
                                   required onChange={(e) => setVideoLink(e.target.value)}></input>
                        </div>
                    </div>
                </div>
                <br></br>

                <div class="card-text">
                    <div class="form-group row">
                        <label for="description"class="col-sm-2 col-form-label">Description</label>
                        <div class="col-sm-10">
                            <textarea class="form-control"  value={description}  name="DESCRIPTION" id="description" rows="4" onChange={(e)=> setDescription(e.target.value)}></textarea>
                        </div>
                    </div>
                </div><br></br>

                <div class="card-text">
                    <div class="form-group row">
                        <label for="importing" class="col-sm-2 col-form-label">Import Image</label>
                        <div class="col-sm-10">
                            <div class="custom-file">
                                <input type="file" name="file" onChange={(e)=>handleImageChange(e)} ></input>
                            </div>
                        </div>
                    </div>
                </div><br></br>
                <div>
                    {
                        !imgUrl && progresspercent !== 0 &&
                        <div className='outerbar'>
                            <div className='innerbar' style={{ width: `${progresspercent}%` }}>{progresspercent}%</div>
                        </div>
                    }
                    {
                        file ?
                        <img src={file} alt='uploaded file' height={100} /> : <img src={imgUrl} alt='uploaded file' height={100} />
                    }
                </div>
                <div class="d-grid gap-2 col-6 mx-auto">
                    <button type="submit" class="btn btn-primary btn-sm " name="sumbit" value="Add Product" onClick={handleProductCreate}>Save changes</button>
                </div>


            </div>
        </div>

    );
};

export default EditProduct;
