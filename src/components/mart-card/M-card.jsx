import React from "react"
import "../mart-card/M-card.css"
import {motion} from "framer-motion"

export default function MCard(props) {


    return(
         <motion.div className="mcard2"
        
         initial={{ opacity: 0, scale: 0.9 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ duration: 0.3 }}
         >
            <div className="mammama" onClick={props.click}>

                 <div className="img_box1">
                <img src={props.img} alt="" className="img23" />
             </div>
             <div className="bot_box">
                <div className="top2">
                    <div className="title3">{props.title}</div>
                    <div className="price3">{props.price}</div>
                </div>
                <div className="mid23">
                    {props.add}
                </div>
             </div>
            </div>
            
             <div className="bot2" onClick={props.btnClick}>
                <button>ADD TO CARD</button>
             </div>
         </motion.div>
    ) 
}