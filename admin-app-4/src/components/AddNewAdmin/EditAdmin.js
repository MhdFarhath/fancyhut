import {useEffect, useState} from "react";
import {NavLink, useNavigate, useParams} from 'react-router-dom';
import './Ind.css';
import {useUserAuth} from "../../context/UserAuthContext";
import validator from 'validator';
import {collection, onSnapshot, query,getDocs, where, doc, updateDoc, getDoc} from "firebase/firestore";
import {db} from "../../firebase/firebase";
function EditAdmin() {
    let navigate = useNavigate();
    const { user,addAdmin } = useUserAuth();
    if(!user){
        navigate('/AdminLogin')
    }
    const {id} = useParams();
    useEffect(() => {
        getDatas()
    }, []);

    const displayRole =(roles)=> {
        if(roles.ADMIN){
            return "ADMIN"
        }else if(roles.BLOCK_ADMIN){
            return "BLOCK_ADMIN"
        }else if(roles.MARKETING_ANALYSIST){
            return "MARKETING_ANALYSIST"
        }
    }
    const getDatas =async ()=> {
        const docRef = doc(db, "Admin", id);
        const docSnap = await getDoc(docRef);
        const user = docSnap.data();
        console.log('this is the data',docSnap.data())
        console.log('got user', user)
        setUserName(user.userName);

        setEmail(user.email);
        setSelectedRole(displayRole(user.role));
    }


    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [selectedRole , setSelectedRole] = useState("");
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    function chooseRole(roles){
        const  role = {
            ADMIN : roles == "ADMIN" ? true : false,
            MARKETING_ANALYSIST : roles == "MARKETING_ANALYSIST" ? true : false,
            BLOCK_ADMIN : roles == "BLOCK_ADMIN" ? true : false
        }
        return role;
    }
    const handleUpdate = async () => {
        const userRef = doc(db, 'Admin', id)
        try{
           await updateDoc(userRef, {
                role : chooseRole(selectedRole)
            }).then(()=> {
                navigate('/AdminRoles')
           })
        } catch (err) {
            alert(err)
        }
    }
    const handleAddAdmin =async () => {
        if(userName !== '' && email !== '' && selectedRole !== '' && password !== '' && validator.isEmail(email)) {

            if (password2 == password) {
                const result = await addAdmin(userName, email, password, selectedRole);
                if (result) {
                    navigate("/AdminRoles")
                }
            } else {
                setShowError(true);
            }
        }else {
            setShowError(true)
        }

        // console.log('its colled', result);
        console.log(userName, email, password, password2, selectedRole)
    }
    return (
        <div className="main">
            <div className="sub-main">
                <div>
                    <button className="das"><NavLink to='/AdminHome' activeStyle>Go Back to Dashboard</NavLink></button>

                    <br></br>
                    <label clasName="ana">Add New Admin</label>

                    {/*<div class="form-group">*/}
                    {/*    <label for="">User Name  </label>*/}
                    {/*    <input type="text" name="userName" id="" value={userName} placeholder = "User Name" class="form-control" required onChange={(e)=> setUserName(e.target.value)}></input>*/}
                    {/*</div>*/}
                    {/*<div>{showError && userName == '' && <label htmlFor="" style={{color: 'red'}}>name required</label>}</div>*/}

                    {/*<div class="form-group">*/}
                    {/*    <label for="">Email Address  </label>*/}
                    {/*    <input type="email" name="email" id="" value={email} placeholder = "Email" class="form-control" required onChange={(e)=> setEmail(e.target.value)}></input>*/}
                    {/*</div>*/}
                    {/*<div>{showError && email == '' && <label htmlFor="" style={{color: 'red'}}>email required</label>}</div>*/}
                    {/*<div>{showError && email != ''&& !validator.isEmail(email) && <label htmlFor="" style={{color: 'red'}}>email invalid</label>}</div>*/}
                    {/*{console.log('selected role', selectedRole)}*/}
                   <select name="role" style={{marginTop: 20}} class="form-select form-select-lg mb-3 form-control"  aria-label=".form-select-lg example" required value={selectedRole} onChange={(e)=> setSelectedRole(e.target.value)}>
                       <option value="ADMIN" selected={selectedRole == "ADMIN"}>Admin</option>
                       <option value="MARKETING_ANALYSIST" selected={selectedRole == "MARKETING_ANALYSIST"}>Marketing Analysis</option>
                        <option value="BLOCK_ADMIN" selected={selectedRole == "BLOCK_ADMIN"}>Blog Admin</option>
                    </select>
                    <div>{showError && selectedRole == '' && <label htmlFor="" style={{color: 'red'}}>role required</label>}</div>

                    <div class="form-group">
                        <button class="btn btn-success btn-sm form-control" onClick={()=> handleUpdate()}>Update Admin</button>
                    </div><br></br>
                    <div class="form-group">
                        <a href="#" class="btn btn-success btn-sm form-control" > Log In Page</a>
                    </div>

                </div>



            </div>
        </div>
    );
}

export default EditAdmin;
