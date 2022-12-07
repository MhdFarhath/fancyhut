import {createContext, useEffect, useState} from "react";
import 'firebase/compat/firestore';
import app from 'firebase/compat/app'
import {addDoc, collection, query, onSnapshot, doc, deleteDoc, updateDoc, where, getDocs, orderBy} from "firebase/firestore";
import {auth, db} from "../firebase/firebase";
import {onAuthStateChanged} from "firebase/auth";
export const firebaseContext = createContext();
export function FirebaseContextProvider({ children }) {
    const [orders, setOrders] = useState([]);
    const [order, setOrder] = useState([]);
    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [trendingProducts, setTrendingProducts] = useState([]);
    useEffect(()=>{
        if(user){
            getAllOrders();
            getAllUsers();
            getAllProducts()
        }
    },[user])


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
            console.log("Auth", currentuser);
            setUser(currentuser);
        });

        return () => {
            unsubscribe();
        };
    }, []);
    async function addProduct(name, price, category, stock, description,image, videoLink) {
        const productsRef = collection(db, 'AddProducts');

        try {
                try{
                    await addDoc(collection(db, 'AddProducts'), {
                        ProductName: name,
                        Price: price,
                        Category: category,
                        StockQuantity: stock,
                        Description: description,
                        Image: image,
                        Video: videoLink,
                        SoldProductCount: 0
                    })
                }catch  (e) {
                    console.debug('error white add product', e);
                }
            return true;
        }
        catch (e) {
            console.debug('error', e);
        }
    }

    async function addBlock(title, description,image, user , userId) {
        const blockRef = collection(db, 'Blog');

        try {
            try{
                await addDoc(collection(db, 'Blog'), {
                    BlockTitle: title,
                    Description: description,
                    Image: image,
                    Approved: true,
                    Author: user,
                    AuthorId: userId
                })
            }catch  (e) {
                console.debug('error white add block', e);
            }
            return true;
        }
        catch (e) {
            console.debug('error', e);
        }
    }
    async function getAllOrders() {
        const ordersRef = collection(db, 'Order');

        try {
            try{
                const q = query(collection(db, 'Order'))
                onSnapshot(q, (querySnapshot) => {
                    setOrders(querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                })
            }catch  (e) {
                console.debug('error white add product', e);
            }
            return true;
        }
        catch (e) {
            console.debug('error', e);
        }
    }
    async function getAllUsers() {

        try {
            try{
                const q = query(collection(db, 'Users'))
                onSnapshot(q, (querySnapshot) => {
                    setUsers(querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                })
            }catch  (e) {
                console.debug('error white get all users', e);
            }
            return true;
        }
        catch (e) {
            console.debug('error', e);
        }
    }
    async function getAllProducts() {

        try {
            try{
                const q = query(collection(db, 'AddProducts'))
                onSnapshot(q, (querySnapshot) => {
                    setProducts(querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                })
            }catch  (e) {
                console.debug('error white get all products', e);
            }
            return true;
        }
        catch (e) {
            console.debug('error', e);
        }
    }

    const handleDeleteOrder = async (id) => {
        const taskDocRef = doc(db, 'Order', id)
        try{
            await deleteDoc(taskDocRef)
            console.log('deleted successfully')
        } catch (err) {
            alert(err)
        }
    }

    const handleUpdateOrderStatus = async (status, orderId) => {
        const orderRef = doc(db, 'Order', orderId)
        try{
            const res = await updateDoc(orderRef, {
                orderStatus: status,
            });
            console.log('order status update success', res);
        } catch (err) {
            alert(err)
        }
    }

    async function getOrder(id) {
        // const q = query(collection(db, "Users"), where("uid", "==", user.uid));

        try {
            try{
                const q = query(collection(db, 'Order'), where('id', "==", id));
                onSnapshot(q, (querySnapshot) => {
                    setOrder(querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                })

            }catch  (e) {
                console.debug('error white get order', e);
            }
            return true;
        }
        catch (e) {
            console.debug('error', e);
        }
    }
    return (
        <firebaseContext.Provider
            value={{addProduct,trendingProducts, addBlock, orders, user, handleDeleteOrder, handleUpdateOrderStatus, getOrder, order,users,products}}
        >
            {children}
        </firebaseContext.Provider>
    );
}

// export function useUserAuth() {
//     return useContext(userAuthContext);
// }

