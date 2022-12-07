import React, { useState, useContext } from 'react'
import { db, auth } from '../../firebase/firebase'
import { Input, Button } from '@material-ui/core'
import {addDoc, collection, onSnapshot, query, where, updateDoc, doc, deleteDoc ,serverTimestamp ,setDoc} from "firebase/firestore";
function SendMessage({ scroll }) {
    const [msg, setMsg] = useState('')

    async function sendMessage(e) {
        e.preventDefault()

        const { uid } = auth.currentUser;
        // const userRef = doc(db, "Messages", user.uid);
        // await setDoc(userRef, {
        //     chatId: user.uid,
        //     chatBy: "USER",
        //     text: msg,
        //     photoURL: 'https://cdn-icons-png.flaticon.com/512/146/146031.png',
        //     uid: user.uid,
        //     createdAt: serverTimestamp()
        // });
        //
        await addDoc(collection(db, 'Messages'), {
            chatId: uid,
            chatBy: "Admin",
            text: msg,
            photoURL: 'https://cdn1.iconfinder.com/data/icons/bokbokstars-121-classic-stock-icons-1/512/person-man.png',
            uid: uid,
            createdAt: serverTimestamp()
        })
        setMsg('')
        scroll.current.scrollIntoView({ behavior: 'smooth' })
    }
    return (
        <div>
            <form onSubmit={sendMessage}>
                <div className="sendMsg">
                    <Input style={{width: '15%', fontSize: '15px', fontWeight: '550', marginLeft: '5px', marginBottom: '-3px' }} placeholder='Message...' type="text" value={msg} onChange={e => setMsg(e.target.value)} />
                    <Button style={{ width: '48%', fontSize: '15px', fontWeight: '550', margin: '4px 5% -13px 5%', maxWidth: '200px',backgroundColor: 'blue'}} type="submit">Send</Button>
                </div>
            </form>
        </div>
    )
}

export default SendMessage
