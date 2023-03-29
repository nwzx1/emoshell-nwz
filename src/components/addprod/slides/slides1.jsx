import React from "react";
import "../slides/slides.css";
import { motion } from "framer-motion";




export default function Slides1(props) {



    return(
       <motion.div  initial={{x: -100 }} animate={{ x: 0}} exit={{x: 100}} >
            
               <div className="slider-range1">
                   <h2 className="h2">Add Image for your product</h2>
                   <input type="file" onChange={props.handlechng} className="file23"  />
                   <div className="imgplace"> 
                      <img src={props.Sfile}  className="Fshow"/>
                    </div>
                     
               </div>
               <div className="val">{props.val}</div>
               <div className="nextox">
                     <button className="bEtn" onClick={props.next}>{props.text}</button>
                 </div>
         </motion.div>
    )
}