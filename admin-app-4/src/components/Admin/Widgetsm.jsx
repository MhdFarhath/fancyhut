import './dashboard.css';
import React, {useEffect, useState} from "react";
 import user from './../image/user.png';
import {collection, onSnapshot, query} from "firebase/firestore";
import {db} from "../../firebase/firebase";


 export default function    Widgetsm(){
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

     const displayRole =(roles)=> {
         if(roles.ADMIN){
             return "ADMIN"
         }else if(roles.BLOCK_ADMIN){
             return "BLOG_ADMIN"
         }else if(roles.MARKETING_ANALYSIST){
             return "MARKETING_ANALYSIST"
         }
     }
    const Button = ({type}) => {
   return <button className={"widgetsmButton " + type}> {type} </button>;
    };
    return(

        <div className="widgetsm">
            <h3 className="widgetsmTitle" id=""> Members</h3>
            <table className="widgetsmTable">
                <tr className="widgetsmTr">
                    <th className="widgetsmTh">Profile</th>
                    <th className="widgetsmTh">Name</th>
                    <th className="widgetsmTh">Role</th>
                    {/*<th className="widgetsmTh">Details</th>*/}

                </tr>
                {tasks && tasks.length > 0 && tasks.map((person)=> {
                    return  <tr className="widgetsmTr">
                        <td className="widgetsmUser">
                            <img src={user} width ="30px" height="30px" alt="" className="widgetsmImg" />

                        </td>
                        <td className="widgetsmName">{person.data.userName}</td>
                        <td className="widgetsmAmount">{displayRole(person.data.role)}</td>
                        {/*<td className="widgetsmStatus">*/}


                        {/*    <Button type="Details"/>*/}

                        {/*</td>*/}

                    </tr>
                })}

            </table>
            </div>
    )
 }
