import React, { useEffect, useState } from "react";
import "../bottom-barr/bot.css";
import { motion } from "framer-motion";
import add from "../../assets/img/bottumnev/add.png"
import cart from "../../assets/img/sidenev/noti.png"
import shop from "../../assets/img/bottumnev/shop.png"
import { getIndb } from "../../pullstore/userInfo";


export default function Bot(props) { 
    const [auth,setAuth] = useState(false)

    useEffect(() => {
        getIndb("StoreAuth").then(ans => {
                setAuth(ans.isAuth)
            }).catch(err => {
                setAuth(false)
            })
    },[])
    return(
        <>
          <motion.div className="bux1"  
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}>
            
            <div className="b01" onClick={props.cardClk}>
                <img src={cart} alt="" className="img09"/>
            </div>
          </motion.div>
        </>
    )
}