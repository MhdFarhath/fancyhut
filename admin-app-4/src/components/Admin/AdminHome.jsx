import React, {useState,useEffect} from 'react';
import Dashboard from './Dashboard';
import Sidebar from './Sidebar';
import Header from './Header';
import {useUserAuth} from "../../context/UserAuthContext";
import {useNavigate} from "react-router-dom";
import {addDoc, collection, onSnapshot, query, where, updateDoc, doc, deleteDoc  } from "firebase/firestore";
import {db} from '../../firebase/firebase'




function AdminHome() {
 let navigate = useNavigate();
 const { user } = useUserAuth();
 if(!user){
  navigate('/AdminLogin')
 }
 const [requests, setRequests] = useState([]);
 const handleUpdateRequestStatus = async (requestId) => {
  const requestRef = doc(db, 'videoRequest', requestId)
  try{
   const res = await updateDoc(requestRef, {
    requestMake: false,
   });
   console.log('request seen status updated', res);
  } catch (err) {
   alert(err)
  }
 }
 const  getRequestsForVideo  = async ()=> {
   try{
    const q = query(collection(db, 'videoRequest'), where('requestMake', "==", true))
    onSnapshot(q, (querySnapshot) => {
     setRequests(querySnapshot.docs.map(doc => ({
      id: doc.id,
      data: doc.data()
     })));
    })

   }catch  (e) {
    console.debug('error white get my orders', e);
   }
 }
 useEffect(() => {
 getRequestsForVideo();
 }, []);

 return (

<>

 <div style={{backgroundColor: 'transparent', overflowX: 'hidden', width: '18rem', position: 'fixed', top: 100, bottom: 0, right: '0' }}>
  {console.log({requests})}
  {/*productId: "mhgoh76gOSvFzJbI33EN"*/}
  {/*productImage: "https://firebasestorage.googleapis.com/v0/b/fancyhut-9e6c2.appspot.com/o/images%2FTagetes_erecta_chendumalli_chedi%20(1).jpg?alt=media&token=c1b7ce5e-1095-464a-b70b-6ae7ea06ab43"*/}
  {/*productName: "Marigold"*/}
  {/*requestMake: true*/}
  {/*userEmail: "codetesing2022@gmail.com"*/}
  {/*userId: "1WvCYNGrsDeGBqQYyT2mVQ1Wgw12"*/}
  {/*userName: "code tesing"*/}
  {requests && requests.length > 0 && requests.map((item)=> {
   return   <div className="card" style={{width: '18rem', marginTop: 14}}>
    {/*<img className={'imgPhoto'} src={'https://cdn-icons-png.flaticon.com/512/146/146031.png'} alt="" style={{width: '35px', height: '35px', marginTop: 15, marginLeft: 10}}/>*/}
    <div className="card-body">
     <span style={{color: 'black', fontSize: 15}}> New Request created for upload video to this product</span>
     <div style={{display: 'flex', alignItems: 'center', flexDirection: 'row', marginTop: 10}}>
     <img src={item.data.productImage} alt="" style={{width: '50px', height: '50px', borderRadius: 15, marginRight: 10}}/>
      <h5 > {item.data.productName}</h5>
     </div>
     <div style={{display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
      <img className={'imgPhoto'} src={'https://cdn-icons-png.flaticon.com/512/146/146031.png'} alt="" style={{width: '35px', height: '35px', marginTop: 15, marginLeft: 10}}/>
      <span style={{color: 'green', fontSize: 13, marginLeft: 10}} >created by:  {item.data.userName? item.data.userName : item.data.userEmail ? item.data.userEmail : item.data.userId}</span>
     </div>
     <a className="btn btn-primary mt-2" onClick={()=> handleUpdateRequestStatus(item.id)}>Close</a>
    </div>
   </div>
  })}


 </div>
<div class="container-fluid" >
<div class="row" style={{width: '100vw', height: '100vh'}}>
<div class="col-sm-2 col-md-3"><Sidebar/></div>
<div class="col-sm-10 col-md-9"><Dashboard/></div>


</div>
</div>
<Header/>
</>
 )
};

export default AdminHome;
