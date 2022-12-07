import React, { useState, useEffect, useRef,useContext } from 'react'
import SendMessage from './SendMessage'
import {addDoc, collection, onSnapshot, query, where, updateDoc, doc, deleteDoc ,orderBy } from "firebase/firestore";
import {auth, db} from "../../firebase/firebase";
import {  useLocation } from 'react-router-dom';
import {firebaseContext} from "../../context/FirebaseContext";


function Chat() {
    const scroll = useRef();
    let location  = useLocation();
    const [messages, setMessages] = useState([]);
    const { uid } = auth.currentUser;
    // const updateMessageStatus = async (messageId)=> {
    //     console.log('update method called', messageId)
    //     const orderRef = doc(db, 'Messages', messageId)
    //     try{
    //         const res = await updateDoc(orderRef, {
    //             adminRead: "READ",
    //         });
    //         console.log('message status update success', messages.length, location.pathname, new Date(),  res);
    //     } catch (err) {
    //         alert(err)
    //     }
    // }
    // const isMounted = useRef(false);
    // useEffect(() => {
    //     const q = query(collection(db, 'Messages'), orderBy('createdAt'))
    //     onSnapshot(q, (querySnapshot) => {
    //         let newMessage = querySnapshot.docs.map(doc => {
    //             return {
    //                 id: doc.id,
    //                 data: doc.data()
    //             }
    //         });
    //         newMessage.map((message)=> {
    //             console.log({message})
    //             if((message.data.adminRead == 'UNREAD' || message.data.adminRead == undefined)){
    //                 updateMessageStatus(message.id);
    //                 console.log('update messate')
    //             }
    //         })
    //     })
    //     return () => {
    //         isMounted.current = false;
    //     };
    // }, [messages.length == 0])
    useEffect(() => {
        const q = query(collection(db, 'Messages'), orderBy('createdAt'))
        onSnapshot(q, (querySnapshot) => {
            let newMessage = querySnapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    data: doc.data()
                }
            });
            // newMessage.map((message)=> {
            //     console.log({message})
            //     if((message.data.adminRead == 'UNREAD' || message.data.adminRead == undefined && messages.length == 0)){
            //         // updateMessageStatus(message.id);
            //         console.log('update messate')
            //     }
            // })
            setMessages(querySnapshot.docs.map(doc => doc.data()))

        })
    }, [])
    return (
        <div className='mb-5 p-5' style={{marginTop: 200}}>
            <div className='mb-5'>
                <h3 style={{color:'black'}}>SEND US A MESSAGE</h3>
            </div>
            <div className="msgs">
                {messages.map(({ id, text, photoURL, uid }) => (
                    <div>
                        <div key={id} className={`msg ${uid === auth.currentUser.uid ? 'sent' : 'received'}`}>
                            <img className={'imgPhoto'} src={photoURL} alt="" style={{width: '15px', height: '15px'}}/>
                            <p>{text}</p>
                        </div>
                    </div>
                ))}
            </div>
            <SendMessage scroll={scroll} />
            <div ref={scroll}></div>
        </div>
    )
}

export default Chat
