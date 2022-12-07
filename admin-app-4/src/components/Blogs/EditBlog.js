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
import '../AddProducts/addpr.css';
import { MenuItem } from 'material-ui';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import {db, storage} from "../../firebase/firebase";
import {firebaseContext} from "../../context/FirebaseContext";
import {useNavigate, useParams} from "react-router-dom";
import {collection, onSnapshot, query,getDocs, where, doc, updateDoc, getDoc} from "firebase/firestore";
import isMagnetURI from "validator/es/lib/isMagnetURI";
import {useUserAuth} from "../../context/UserAuthContext";



const EditBlogs = () => {
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
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState('');
    const [approved, setApproved] = useState(false);
    const [image, setImage] = useState("");
    const {addBlock} = useContext(firebaseContext);
    const handleImageChange =(e)=> {
        setImage(e.target.files[0])
        setFile(URL.createObjectURL(e.target.files[0]));
    }
    const [imgUrl, setImgUrl] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);

    const getProduct =async ()=> {
        const productRef = doc(db, "Blog", id);
        const docSnap = await getDoc(productRef);
        const product = docSnap.data();
        console.log('this is the data',docSnap.data())
        console.log('got user', product)
        setTitle(product.BlockTitle? product.BlockTitle: product.BlockTitle);
        setDescription(product.Description? product.Description : '');
        setImgUrl(product.Image? product.Image : "");
        setApproved(product.Approved? 1 : 0);
    }

    const handleUpdate = async (imageurl) => {
        const productRef = doc(db, 'Blog', id)
        try{
            await updateDoc(productRef, {
                BlockTitle: title,
                Description: description,
                Image: imageurl? imageurl : image,
                Approved: approved == 1,
            }).then(()=> {
                navigate('/Blogs')
            })
        } catch (err) {
            alert(err)
        }
    }

    const handleProductCreate = ()=> {
        console.log(title, description, image);
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

        <div style={{width:'100vw', height: '100vh'}}>



            <Nav>
                <img src={logo} alt="logo" className="logo1"></img>
                <h1 className="aaa">Fancy Hut</h1>


                <Bars />

                <NavMenu>
                    <NavLink to="/AdminHome" activeStyle>
                        Dashboard
                    </NavLink>
                    <NavLink to='/Blogs' activeStyle>
                        Blogs
                    </NavLink>



                </NavMenu>

            </Nav>

            <div class="card card-body mb-3" style={{paddingLeft: '30px', paddingRight: '30px'}}>

                <form  method="POST" enctype="multipart/form-data"></form>
                <h4 class="card-header">Edit Blog</h4><br></br>

                <div class="card-text">
                    <div class="form-group row">
                        <label for="productName" class="col-sm-2 col-form-label">Title</label>
                        <div class="col-sm-10">
                            <input type="text"  value={title} name="PNAME" class="form-control" id="productName" required onChange={(e)=> setTitle(e.target.value)}></input>
                        </div>
                    </div>
                </div><br></br>



                {/*<div class="card-text">*/}
                {/*    <div class="form-group row">*/}
                {/*        <label for="price"   class="col-sm-2 col-form-label">Price</label>*/}
                {/*        <div class="col-sm-10">*/}
                {/*            <input type="text"  value={price} name="PRICE" class="form-control" id="price" required onChange={(e)=> setPrice(e.target.value)}></input>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div><br></br>*/}

                {/*<div class="card-text">*/}
                {/*    <div class="form-group row">*/}
                {/*        <label for="category"  class="col-sm-2 col-form-label">Category</label>*/}
                {/*        <div class="col-sm-10">*/}
                {/*            <select name="CATEGORY"  value={category} class="form-select form-select-lg mb-3 form-control"  aria-label=".form-select-lg example" required onChange={(e)=> setCategory(e.target.value)}>*/}
                {/*                <option value="Flower" selected={category == "Flower"}>Flower Plants</option>*/}
                {/*                <option value="Cactus" selected={category == "Cactus"}>Cactus</option>*/}
                {/*                <option value="Air" selected={category == "Air"}>Air Plants</option>*/}
                {/*                <option value="Herbal" selected={category == "Herbal"}>Herbal Plants</option>*/}
                {/*                <option value="Table" selected={category == "Table"}>Table Plants</option>*/}
                {/*                <option value="Fruit" selected={category == "Fruit"}>Fruit Plants</option>*/}

                {/*            </select>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div><br></br>*/}


                {/*<div class="card-text">*/}
                {/*    <div class="form-group row">*/}
                {/*        <label for="quantity" class="col-sm-2 col-form-label">Stock quantity</label>*/}
                {/*        <div class="col-sm-10">*/}
                {/*            <input type="number"  value={stock} name="STOCK" class="form-control" id="quantity" required onChange={(e)=> setStock(e.target.value)}></input>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div><br></br>*/}

                <div class="card-text">
                    <div class="form-group row">
                        <label for="description"class="col-sm-2 col-form-label">Description</label>
                        <div class="col-sm-10">
                            <textarea class="form-control"  value={description}  name="DESCRIPTION" id="description" rows="4" onChange={(e)=> setDescription(e.target.value)}></textarea>
                        </div>
                    </div>
                </div><br></br>

                <div className="card-text">
                    <div className="form-group row">
                        <label htmlFor="category" className="col-sm-2 col-form-label">Approve Blog</label>
                        <div className="col-sm-10">
                            <select name="Approve Blog" className="form-select form-select-lg mb-3 form-control"
                                    aria-label=".form-select-lg example" required value={approved}
                                    onChange={(e) => setApproved(e.target.value)}>
                                <option selected>Choose...</option>
                                <option value="1">Accept</option>
                                <option value="0">Decline</option>

                            </select>
                        </div>
                    </div>
                </div>
                <br></br>
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

export default EditBlogs;
