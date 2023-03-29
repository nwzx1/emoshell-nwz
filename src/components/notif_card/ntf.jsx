import React from "react"
import "../notif_card/ntf.css"
import {motion} from "framer-motion"


export function Ntf_sml(props) {
    return (
        <motion.div className="mcard290"
        
         initial={{ opacity: 0, scale: 0.9 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ duration: 0.3 }}
         >
            <div className="list_noti11">
                                <div className="img_box11">
                                    <img src={props.imgURL} alt="" className='im11g'/>
                                </div>
                                <div className="mid11G">
                                    <div className="disc1d">Your Order is Placed successfully</div>
                                    <div className="disc1d">Order will get in 7 working days</div>
                                    <div className="disc1d">For any problem contact us on {props.num}</div>
                                    
                                </div>
            </div>
         </motion.div>
    )
}

export default function Ntf(props) {


    return(
         <motion.div className="mcard290"
        
         initial={{ opacity: 0, scale: 0.9 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ duration: 0.3 }}
         >
             <div className="list_noti" key={props.id}>
                                <div className="img_box01">
                                    <img src={props.imgURL} alt="" className='im1g'/>
                                </div>
                                <div className="mid1G">
                                    <div className="discd">new Order from {props.cityTown}</div>
                                    <div className="v_btn" onClick={(e) =>props.Lclk(e)}>VIEW</div>
                                </div>
            </div>
            
         </motion.div>
    ) 
}