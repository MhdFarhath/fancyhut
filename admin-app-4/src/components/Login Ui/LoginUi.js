import './LoginUi.css';
import profile from "./../image/a.png";
import email from "./../image/email.jpg";
import pass from "./../image/pass.png";
import React, {useRef,useState} from 'react';

function LoginUi() {
  
  return (
    <div className="main">
     <div className="sub-main">
       {/* <div>
         <div className="imgs">
           <div className="container-image">
             <img src={profile} alt="profile" className="profile"/>

           </div>


         </div>
         <div>
           <h1>Login Page</h1>
           <div>
             <img src={email} alt="email" className="email"/>
             <input type="text" placeholder="user name" className="name"/>
           </div>
           <div className="second-input">
             <img src={pass} alt="pass" className="email"/>
             <input type="password" placeholder="password" className="name"/>
           </div>
          <div className="login-button">
          <button>Login</button>
          </div>
           
            <p className="link">
              <a href="#">Forgot password ?</a> Or <a href="#">Sign Up</a>
            </p>
           
 
         </div>
       </div> */}
       

       <div>

         <label clasName="ana"><h2>Admin Dashboard</h2></label>
          <div>
            <br></br>
          </div>
          
         <div class="form-group"> 
                    <label for="">User Name  </label>
                    <input type="text" name="userName" id="" placeholder = "User Name" class="form-control" required></input>
                </div><br></br>
                
                <div class="form-group">
                    <label for="">Password</label>
                    <input type="password" name="password" id="txtPassword" placeholder = "Password" class="form-control" required></input>
                </div><br></br>
                
                

                 
            <div class="form-group">
                <a href="#" class="btn btn-success btn-sm form-control"> Log In</a>
            </div> 

       </div>

     </div>
    </div>


    
  );
}

export default LoginUi;