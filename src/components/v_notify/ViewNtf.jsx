import React, { useState,useEffect } from 'react'
import "../v_notify/ViewNtf.css"
import { useLocation, useNavigate } from 'react-router-dom'
import Topnev from '../../pages/home/topnev/topnev';
import Footer from '../../pages/home/footer/footer';
import Bck from "../../assets/img/nes/back.png";
import Sidenev from '../../pages/home/sidenev/sidenev';
import { delete_Uniq_db } from '../../pullstore/userInfo';
import Dailog from '../dialogBox/dialog';


export default function ViewNtf() {
   const loc = useLocation()
   const [click,setClick] = useState(false)
   let datu = loc.state.data;
   let data = datu.data;
    const navigate = useNavigate();

	const goBack = () => {
		navigate(-1);
	}

   const deletmsg = () => {
      setTimeout(() => {
        delete_Uniq_db("Orders",datu.id).then(ans => {
         goBack()
      }).catch(err => {
         console.log(err)
      }) 
      }, 3000);
      
   }

    useEffect(() => {
        console.log(datu.id)
    },[data])
    return(
        <div className="dfdf flex">
            <Sidenev/>
            {click ? <Dailog
                           text={"Do you want to Delete this Message"} 
                           ClickX={() => setClick(!click)}
                           ClickY={deletmsg}
                           /> : ""}
        <div className='main  h-screen w-screen'>
        <Topnev/>
         <div className="Edit">
            <div className="midEdit">
                <div className="topNv">
                    <div className="bckbtn" onClick={goBack}>
                        <img src={Bck} className='img123'/>
                    </div>
                </div>
                <div className="midl">
                   Order details
                   <div className="orderBox">
                     <div className="IBox">
                        <img src={data.data.imgURL} alt="" className='img110'/>
                     </div>
                     <div className="discs">
                        <div className="title6">Product Name:</div><div className="anns">{data.data.title}</div>
                     </div>
                     <div className="discs">
                        <div className="title6">Product Price:</div><div className="anns">{`${data.data.price}rs`}</div>
                     </div>  
                   </div>
                   <div className="cusDE">
                     Customer details
                     <div className="discs">
                        <div className="title6">Customer Name:</div><div className="anns">{data.fullName}</div>
                     </div>
                     <div className="discs">
                        <div className="title6">Customer Phone Number:</div><div className="anns">{data.num}</div>
                     </div> 
                     <div className="discs">
                        <div className="title6">Customer Address1:</div><div className="anns">{data.fullAdd}</div>
                     </div> 
                     <div className="discs">
                        <div className="title6">Customer Address2:</div><div className="anns">{data.add2}</div>
                     </div> 
                     <div className="discs">
                        <div className="title6">Customer City/Town:</div><div className="anns">{data.cityTown}</div>
                     </div> 
                     <div className="discs">
                        <div className="title6">Customer Country:</div><div className="anns">{data.Country}</div>
                     </div> 
                     <div className="discs">
                        <div className="title6">Customer Pin code:</div><div className="anns">{data.pin}</div>
                     </div> 
                     <div className="btn_001" onClick={() => setClick(!click)}>
                     delete message
                     </div> 

                   </div>
                   
                  
                </div>
            </div>
              
          </div>
        <Footer/>
        </div>
        </div>
        
        
    )
};
