import './dashboard.css';
import React, {useContext} from "react";
import user from './../image/user.png';
import {firebaseContext} from "../../context/FirebaseContext";


 export default function Widgetsm(){
     const {orders} = useContext(firebaseContext);
     const Button = ({type}) => {
   return <button className={"widgetlgButton " + type}> {type} </button>;
    };

     const getOrderTotal = (order)=> {
         let total = 0;
         if(order){
        total  =  order.reduce((acc, curr)=> {
                 let to = acc;
                 acc = acc + Number(curr.Price)* Number(curr.Quantity);
                 return acc
             }, 0)
             return total;
         }else {
             return 0
         }
     }
    return(

        <div className="widgetlg">
            <h3 className="widgetlgTitle" id="">Latest transaction</h3>
            <table className="widgetlgTable">
                <tr className="widgetlgTr">
                    <th className="widgetlgTh">Customer</th>
                    <th className="widgetlgTh">date</th>
                    <th className="widgetlgTh">Amount</th>
                    {/*<th className="widgetlgTh">Status</th>*/}

                </tr>

                {orders && orders.length > 0 && orders.slice(0,4).map((item)=> {
                    console.log('order ittem', item)
                    return  <tr className="widgetlgTr">
                        <td className="widgetlgUser">


                            <span className="widgetlgName">{item.data.BuyerName}</span>
                        </td>
                        <td className="widgetlgDate">{new Date(new Date(item.data.CreatedAt.seconds*1000)).toLocaleDateString()}</td>
                        <td className="widgetlgAmount">{getOrderTotal(item.data.order)}</td>
                        {/*<td className="widgetlgStatus">*/}


                        {/*<Button type="Pending"/>*/}
                        {/*</td>*/}

                    </tr>
                })}

            </table>
            </div>
    )
 }
