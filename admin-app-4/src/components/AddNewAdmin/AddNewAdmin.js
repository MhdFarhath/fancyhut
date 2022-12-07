import {useState} from "react";
import {NavLink, useNavigate} from 'react-router-dom';
import './Ind.css';
import {useUserAuth} from "../../context/UserAuthContext";
import validator from 'validator';
function AddNewAdmin() {
    let navigate = useNavigate();
    const { user,addAdmin } = useUserAuth();
    if(!user){
        navigate('/AdminLogin')
    }
const [userName, setUserName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [password2, setPassword2] = useState("");
const [selectedRole , setSelectedRole] = useState("");
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
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

         <div class="form-group">
                    <label for="">User Name  </label>
                    <input type="text" name="userName" id="" placeholder = "User Name" class="form-control" required onChange={(e)=> setUserName(e.target.value)}></input>
                </div>
           <div>{showError && userName == '' && <label htmlFor="" style={{color: 'red'}}>name required</label>}</div>

           <div class="form-group">
                    <label for="">Email Address  </label>
                    <input type="email" name="email" id="" placeholder = "Email" class="form-control" required onChange={(e)=> setEmail(e.target.value)}></input>
                </div>
           <div>{showError && email == '' && <label htmlFor="" style={{color: 'red'}}>email required</label>}</div>
           <div>{showError && email != ''&& !validator.isEmail(email) && <label htmlFor="" style={{color: 'red'}}>email invalid</label>}</div>

           <div class="form-group">
                    <label for="">Password</label>
                    <input type="password" name="password" id="txtPassword" placeholder = "Password" class="form-control" required onChange={(e)=> setPassword(e.target.value)}></input>
                </div>
           <div>{showError && password == '' && <label htmlFor="" style={{color: 'red'}}>password required</label>}</div>

           <div class="form-group">
                    <label for="">Confirm Password</label>
                    <input type="password" name="cpassword" id="txtConfirmPassword" placeholder = "Password" onclick="return Validate()" class="form-control" required onChange={(e)=> setPassword2(e.target.value)}></input>
                </div><br></br>
                <div>{showError && password2 !== password && <label htmlFor="" style={{color: 'red'}}>Password Not Matched</label>}</div>
                <select name="role" class="form-select form-select-lg mb-3 form-control"  aria-label=".form-select-lg example" required onChange={(e)=> setSelectedRole(e.target.value)}>
                        <option selected>Choose Admin Roles...</option>
                        <option value="ADMIN">Admin</option>
                        <option value="MARKETING_ANALYSIST">Marketing Analysis</option>
                        <option value="BLOCK_ADMIN">Blog Admin</option>



                    </select>
           <div>{showError && selectedRole == '' && <label htmlFor="" style={{color: 'red'}}>role required</label>}</div>

           <div class="form-group">
                <button class="btn btn-success btn-sm form-control" onClick={()=> handleAddAdmin()}>Add new admin</button>
            </div><br></br>
            <div class="form-group">
                <a href="#" class="btn btn-success btn-sm form-control" > Log In Page</a>
            </div>

       </div>



     </div>
    </div>
  );
}

export default AddNewAdmin;
