import React from "react";
import "../slides/slides.css";
import { motion } from "framer-motion";


export default function Slides2(props) {



    return(
       <motion.div  initial={{x: -100 }} animate={{ x: 0}} exit={{x: 100}}>
            
               <div className="slider-range1">
                   <div className="title1">
                    <input 
                     type="text" 
                     className="feild4" 
                     name="title" 
                     value={props.title} 
                     placeholder='title'  
                     onChange={props.handleChng}/>
                      <input 
                       type="number" 
                       className="feild4" 
                       name="price" 
                       value={props.price} 
                       placeholder='price'  
                       onChange={props.handleChng}
                       />
                      
                   </div>
                   <div className="disc">
                   <textarea 
                     type="text" 
                     className="feild5" 
                     name="disc" 
                     value={props.disc} 
                     placeholder='Discriptions'  
                     onChange={props.handleChng}/>
                   </div>
                   <div className="num1">
                   
                     
                   </div>
                   
               </div>
               <div className="val">{props.val}</div>
               
               <div className="disclm">
               
In association with the product, Emo makes no warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, of title, or of noninfringement of third party rights.
               </div>
               <div className="nextox1">
                     <button className="bEtn" onClick={props.next}>{props.text}</button>
    
                     <button className="betn" onClick={props.onsubmite}>{props.Text}</button>
                 </div>
         </motion.div>
    )
}