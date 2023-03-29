import React, { useEffect, useState } from "react"
import "../veiw_prod/viewProd.css"
import left1 from "../../assets/img/nes/back.png"
import {motion} from "framer-motion"
import Sidenev from "../../pages/home/sidenev/sidenev"
import Topnev from "../../pages/home/topnev/topnev"
import Footer from "../../pages/home/footer/footer"
import { useLocation, useNavigate } from "react-router-dom"
import { click } from "@testing-library/user-event/dist/click"
import Buy from "../buy_now/buy"
import { getIndb } from "../../pullstore/userInfo"

export default function ViewProd() {
    const [log,setLog] = useState(false)
    const [Click,setClick] = useState(false)
    const LOcation = useLocation();
    let data = LOcation.state.data;
    const nevigate = useNavigate();

    useEffect(() => {
            getIndb("UserAuth").then(ans => {
              if (ans) {
                setLog(true)
              }else {
                setLog(false)
              }
            })
    },[data])

    const Xclick = () => {
        setClick(!Click)
    }
    return(
        <div className="dfdf flex">
        {Click ? <Buy data={data} Xclick={Xclick}/> : ""}
      <Sidenev/>
      <div className='Xmain3 h-screen w-screen'>
      <Topnev/>
      
      <div className="v_prod">
        <div className="backB">
            <img src={left1} alt="" className="img61" onClick={() => nevigate(-1)}/>
        </div>
        <div className="prod_img_box">
            <img src={data.imgURL} alt="" className="img70"/>
        </div>
        <div className="bot_09">
            <div className="topG">
                <div className="title54">{data.title}</div>
                <div className="rev54">{`Good`}</div>
            </div>
            <div className="midG">
                <div className="discc">
                    <div className="fst1">PHONE - NUMBER:</div>
                    <div className="scd1">{`+91 ${data.phnnum}`}</div>
                </div>
                <div className="discc">
                    <div className="fst1">DESCRIPTION:</div>
                    <div className="scd1">{data.disc}</div>
                </div>
                <div className="discc">
                    <div className="fst1">LOCATION:</div>
                    <div className="scd1">{data.location}</div>
                </div>
                <div className="Bys1">
                    <div className="lef1">{`${data.price} rs`}</div>
                    <div className="rigt1" onClick={log ? Xclick : () => nevigate("/login")}>
                        ORDER NOW
                    </div>
                </div>
            </div>
        </div>
      </div>
    <Footer/>
   </div>
    </div>
    ) 
}