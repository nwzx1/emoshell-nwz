import React from "react"
import "../card/card.css"
import {motion} from "framer-motion"

export default function Card(props) {


    return(
        <>
          <motion.div className="card" 
                 initial={{ opacity: 0, scale: 0.5 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.1 }}
          >
          <div className="card-imgbox">
            <img src={props.img} alt="medical" className="mgif" />
          </div>
            <div className="textbox21">
               <h1 className="cardtext1">{props.title}</h1>
               <h2 className="cardtext2">{props.disc}</h2>
               <div className="NWZbtn" onClick={props.onclick}>Explore</div>
           </div> 
        </motion.div>
        </>
    ) 
}