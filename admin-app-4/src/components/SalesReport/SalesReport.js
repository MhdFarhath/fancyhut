import React, {useEffect, useState, useContext} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './NavbarElements';
import logo from './../image/fancy.jpg';
import './saleRep.css';
import {useNavigate} from "react-router-dom";
import {useUserAuth} from "../../context/UserAuthContext";
import {firebaseContext} from "../../context/FirebaseContext";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

const SalesReport = () => {
    let navigate = useNavigate();
    const { user } = useUserAuth();
    if(!user){
        navigate('/AdminLogin')
    }
    const {orders} = useContext(firebaseContext);
    const allMonths = ['Jan', 'Feb', 'Mar', "Apr", 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const returnMonth = (month)=> {
        return allMonths[month -1]
    }
    console.log(orders)
        // con
    let Data = [{month: null , countOrders: 0}]
    orders.map((item)=> {
        let find = Data.findIndex((d)=> d.month == new Date(new Date(item.data.CreatedAt.seconds*1000)).getMonth() +1);
        console.log(find, new Date(new Date(item.data.CreatedAt.seconds*1000)).getMonth() +1)

        if(find > -1){
        Data[find].countOrders =  Data[find].countOrders +1
    } else {
        Data.push({month: new Date(new Date(item.data.CreatedAt.seconds*1000)).getMonth() +1, countOrders:  1})
    }
        // Data.map((d)=> {
        //     if( d.month == new Date(item.data.CreatedAt.seconds*1000).getMonth()){
        //         d.countOrders = d.countOrders +1
        //     }
            // else {
            //     Data.push({month: new Date(item.data.CreatedAt.seconds*1000).getMonth(), countOrders:  1})
            // }
        // })
        // if(Data.filter((d)=> d.month == new Date(item.data.CreatedAt.seconds*1000).getMonth())){
        //     Da
        // }
    });
    console.log({Data})
        orders.map((item)=> console.log(new Date(item.data.CreatedAt.seconds*1000).getDate()))


   const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Number of orders per month',
            },
        },
    };

    const n_numbers = [1,2,3,4,5,6,7,8,9,10, 11, 12];
   const DataSet = n_numbers.map((item)=> {
       let num = 0;
       Data.map((i)=>{
           if(i.month == item){
               num = i.countOrders
           }
       } );
       return num;
   })
    console.log({DataSet})
    const data = {
        labels: allMonths,
        datasets: [
            {
                fill: true,
                data:DataSet,
                label: 'Number of orders',
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    return (

    <div style={{width: '100vw', height: '100vh'}}>



      <Nav>
      <img src={logo} alt="logo" className="logo2"></img>
      <h1 className="aab">Fancy Hut</h1>


        <Bars />

        <NavMenu>
          <NavLink to='/AdminHome' activeStyle>
            Dashboard
          </NavLink>





        </NavMenu>

      </Nav>

      <div class="card card-body">

    <form  method="POST" enctype="multipart/form-data"></form>
        <h4 class="card-header">Sales Report</h4><br></br>
         <br></br>
          <div style={{width: '70%', height: '70%'}}>
          <Line options={options} data={data} />;
          </div>
</div>
    </div>

  );
};

export default SalesReport;
