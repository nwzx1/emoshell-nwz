import React, { useState} from 'react';
import "../dialogBox/dialog.css"
import { motion } from 'framer-motion';


export default function Dailog(props) {
    return(
            <div className="Dailog">
              <motion.div className="dai_box" 
                   initial={{ opacity: 0, scale: 0.5 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ duration: 0.2 }}
              >
                <div className="up">{props.text}</div>
                <div className="down">
                    <button className='btn01' onClick={props.ClickX}>Cancel</button>
                    <button className='btn02' onClick={props.ClickY}>Yes</button>
                </div>
              </motion.div>
            </div>
    )
}