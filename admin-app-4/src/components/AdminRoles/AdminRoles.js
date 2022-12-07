import React, {useEffect,useState} from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './NavbarElements';
import logo from './../image/fancy.jpg';
import './adrol.css';
import { Button } from 'bootstrap';
import {collection, query, onSnapshot,doc,  deleteDoc} from "firebase/firestore"
import {db} from '../../firebase/firebase'
import {useNavigate} from "react-router-dom";
import {useUserAuth} from "../../context/UserAuthContext";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";



const ShowAdmin = ({admin})=> {
    let navigate = useNavigate();
    const { user } = useUserAuth();
    if(!user){
        navigate('/AdminLogin')
    }
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleDelete = async (id) => {
        const taskDocRef = doc(db, 'Admin', id)
        try{
            await deleteDoc(taskDocRef)
            console.log('deleted successfully')
            handleClose()
        } catch (err) {
            alert(err)
            handleClose()

        }
    }
    const displayRole =(roles)=> {
        if(roles && roles.ADMIN){
            return "ADMIN"
        }else if(roles && roles.BLOCK_ADMIN){
            return "BLOG_ADMIN"
        }else if(roles && roles.MARKETING_ANALYSIST){
            return "MARKETING_ANALYSIST"
        } else {
            return "ADMIN"
        }
    }
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
                    <div style={{display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', width: '100%', cursor: 'pointer'}}>
                        <div onClick={handleClose}>Disagree</div>
                        <div onClick={()=> handleDelete(admin.id)}>Confirm</div>
                    </div>
                </DialogActions>
            </Dialog>
            <div style={{display: 'flex', alignItems: "center", justifyContent: "space-between"}}>
                <div style={{flex: 1, width: '20vw'}}><h6>{admin.data?.userName}</h6></div>
                <div style={{flex: 1,width: '20vw'}}><h6>{admin.data?.email}</h6></div>
                <div style={{flex: 1, width: '20vw'}}><h6>{displayRole(admin.data?.role)}</h6></div>
                <div style={{flex: 1,  width: '20vw',marginLeft: '-10px'}}><h6><button style={{width: '100px', fontSize: '14px', padding: 2, height: 30}} onClick={()=> {
                    navigate(`/editAdmin/`+`${admin.id}`)
                }
                }>Edit</button></h6></div>
                <div style={{flex: 1, marginLeft: '-10px',width: '20vw'}}><h6><button style={{width: '100px', fontSize: '14px', padding: 2, height: 30}} onClick={handleClickOpen}>Delete</button></h6></div>
            </div>
        </>)
}

const AdminRoles = () => {
    let navigate = useNavigate();
    const { user } = useUserAuth();
    if(!user){
        navigate('/AdminLogin')
    }

    const headers = [
        {name: 'User Name'},
        {name: 'Email'},
        {name: 'Roles'},
        {name: 'Edit'},
        {name: 'Delete'},
    ]
    const [tasks, setTasks] = useState([])
    useEffect(() => {
        const q = query(collection(db, 'Admin'))
        if(q) {
            onSnapshot(q, (querySnapshot) => {
                if (querySnapshot.docs.length > 0) {
                    setTasks(querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                }
            })
        }

    }, []);


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
        <h4 class="card-header">Admin Roles and Details</h4><br></br>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: "space-between"}}>
          {headers.map((item)=> {
              return <div  style={{flex: 1, width: '20vw'}}><h6 style={{color: 'black', fontWeight: 'bold', fontSize: '16px'}}>{item.name}</h6></div>
          })}
          </div>
          <div>
              {tasks && tasks.length > 0 && tasks.map((admin)=> {
                      return <ShowAdmin admin={admin}/>
              })}
          </div>
         <br></br>



</div>
    </div>

  );
};

export default AdminRoles;

//
// <div style={{display: 'flex', alignItems: "center", justifyContent: "space-between"}}>
//     <div style={{flex: 1, width: '20vw'}}><h6>{user.data.userName}</h6></div>
//     <div style={{flex: 1,width: '20vw'}}><h6>{user.data.email}</h6></div>
//     <div style={{flex: 1, width: '20vw'}}><h6>{displayRole(user.data.role)}</h6></div>
//     <div style={{flex: 1,  width: '20vw',marginLeft: '-10px'}}><h6><button style={{width: '100px', fontSize: '14px', padding: 2, height: 30}} onClick={()=> {
//         navigate(`/editAdmin/`+`${user.id}`)
//     }
//     }>Edit</button></h6></div>
//     <div style={{flex: 1, marginLeft: '-10px',width: '20vw'}}><h6><button style={{width: '100px', fontSize: '14px', padding: 2, height: 30}} onClick={()=> handleDelete(user.id)}>Delete</button></h6></div>
// </div>
