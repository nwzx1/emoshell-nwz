import React,{useState} from 'react'
import "../../../../src/App.css"
import  "../../../index.css"
import '../midsite/mids.css'
import search from "../../../assets/img/Search2.png";
import locationicon from "../../../assets/img/location.png";
import Topnev from '../topnev/topnev';
import Footer from '../footer/footer';
import Popuplist from '../../../components/popuplist/popup';
import Card from '../../../components/card/card';
import Pill from "../../../assets/img/card/prod.png";
import prod from "../../../assets/img/card/prod2.png";
import cont from "../../../assets/img/card/cont.png";
import Sidenev from '../sidenev/sidenev.jsx';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Bot from '../../../components/bottom-barr/bot';
import Dailog from '../../../components/dialogBox/dialog';
import { useEffect } from 'react';
import { getIndb } from '../../../pullstore/userInfo';



export default function Midside(props) {
 
  const nevigate = useNavigate();
  const [show,setShow] = useState(false)
  const [Click,setClick] = useState(false)
  const [popup,setpop] = useState(false);

    const handlemyclick =()=> {
        setpop(!popup)
    }

    useEffect(() => {
      getIndb("UserAuth").then(ans => {
        if (ans) {
          setShow(true)
        }else {
          setShow(false)
        }
      })
    },[])

  return (
    <div className='FSJA1'>
     <Sidenev/>
     {popup ? <Popuplist 
                 
                 area1="mumbai"
                 area2="gujrat"
                 area3="delhi"
                 clkme={handlemyclick}
                 
           /> : ""}
    <div className='main h-screen w-screen'>
   
      <Topnev  />
      {Click ? <Dailog
                 text="Do you want to create your Store"
                 ClickX={() => setClick(false)}
                 ClickY={() => nevigate("/addStore")}
                 /> : ""}
 {/* --------------top nev end - ---------------0 */}
     <div className="midbox w-screen ">
       <motion.div className="textbox" 
               initial={{ opacity: 0, scale: 0.5 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.2 }}
       >
        <h1 className="h1text">Search Nearest Medical Products here</h1>
        <h2 className="h0text">Now find More then Million + medical stores around you!</h2>
       </motion.div>
       
           <div className="boxy h-20"></div>
     </div>
     
      
        <div className="cardscrool">
         
          <Card 
             onclick={() => {nevigate("/markit")}}
             img={Pill}
             title="Medical Market"
             disc="Find nearest medical, fast as soon as u need!"
          /> 
          <Card 
             onclick={() => {setClick(!Click)}}
             img={prod}
             title="Add Your Store"
             disc="Make your own Store and sell your products online!"
          />
          <Card 
             onclick={() => {nevigate("/aboute")}}
             img={cont}
             title="Contact Card"
             disc="Contact us if any problem with website or any consumer violence!"
          />

       </div>
       {show ? <Bot
        cardClk={() => nevigate("/notifi")}
      /> : ""}
       
    <Footer/>
   </div>
   </div>

    
  )
}
