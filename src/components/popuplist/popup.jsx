import React,{useState} from 'react'
import "../popuplist/popup.css"
import { motion } from 'framer-motion'

export default function Popuplist(props) {

    

    return(
      <div className="sims">
        <motion.div className="popuplist" animate={{opacity:[0,1] ,y:[-30,0]}}>
            <div className="localclass" onClick={props.clkme}>{props.localarea}</div>
            <div className="txte bg-transparent">Popular location</div>
            <div className="listclass" onClick={props.clkme1}>{props.area1}</div>
            <div className="listclass" onClick={props.clkme1}>{props.area2}</div>
            <div className="listclass" onClick={props.clkme1}>{props.area3}</div>
          </motion.div>
      </div>
         
    )
}