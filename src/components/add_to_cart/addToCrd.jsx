import React, { useEffect } from "react"
import "../add_to_cart/addToCrd.css"

import {motion} from "framer-motion"
import left1 from "../../assets/img/nes/left.png"
import Sidenev from "../../pages/home/sidenev/sidenev"
import Topnev from "../../pages/home/topnev/topnev"
import Footer from "../../pages/home/footer/footer"
import { useLocation, useNavigate } from "react-router-dom"

export default function AddToCrd() {
    const nevigate = useNavigate();
    

    useEffect(() => {
       
    },[])

    return (
          <div className="dfdf flex">
            <Sidenev/>
             <div className='Xmain3 h-screen w-screen'>
               <Topnev/>
               <div className="v_prod">
                 <div className="backB">
                  <img src={left1} alt="" className="img61" onClick={() => nevigate(-1)}/>
                 </div>
                  <div className="listView">
                    <div className="listV">
                        
                    </div>
                  </div>
                 </div>
               <Footer/>
             </div>
          </div>
    ) 
}