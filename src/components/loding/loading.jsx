import React, { useState} from 'react';
import "../loding/loading.css"
import { motion } from 'framer-motion';


export default function Loading(props) {
    return(
            <div className="boxinn">
               <motion.div animate={{
                rotate: 360
               }} transition={{ ease: "linear", duration: 1, repeat: Infinity }} 
               className="loding">
                 
               </motion.div>
            </div>
    )
}