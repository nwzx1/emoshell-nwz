import React from "react";
import "../Register/register.css"
import sn from "../../../assets/img/sn.png"
import hd from "../../../assets/img/hd.png"
import { useState } from "react";

export default function Reg1(props) {

    const [seen,setseen] = useState(false)

    return (
        <>
       
     
       <form className='midllbox' >
         {console.log(props.user)}
        <h1 className='logintext'>Register</h1>

       
        <div className="welcome">Welcome</div>


        <input className="feild" 
         type="text" 
         name="username" 
         value={props.username} 
         placeholder='Username'  
         onChange={props.handleChange}
         />

         

          <div className="mdfd">
          <input 
         type={!seen ? "password" : "text"} 
         className="feild2" 
         name="password" 
         value={props.password} 
         placeholder='Password'  
         onChange={props.handleChange}
         />
         <div className="icns">
          <img src={seen ? sn : hd} alt="" className='iomg' onClick={() => setseen(!seen)} />
         </div>
         </div>
        <div className="validate">
             {props.formerror}
         </div>

         <div onClick={props.toggle} className="toggle2">
            <div className="togglemove1">Next</div>
         </div>
        </form>
      
        </>
    );
};
