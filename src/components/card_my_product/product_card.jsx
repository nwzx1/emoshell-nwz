import React from "react"
import "../card_my_product/product_card.css"
import {motion} from "framer-motion"

export default function ProdCard(props) {
    return(
        <motion.div className="crds" 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        >
            <div className="img_box">
                <img src={props.img} alt="" className="img2"/>
            </div>
            <div className="same">
                <div className="cll">
                     <div className="title">{props.title}</div>
                     <div className="dics">{props.disc}</div>
                </div>
                <div className="rw">
                    <div className="price">{props.price}</div>
                </div>
                
            </div>
            <button className="edit" onClick={props.click}>Delete Product</button>
        </motion.div>
    ) 
}