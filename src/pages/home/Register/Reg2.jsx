import React from "react";
import "../Register/register.css"

export default function Reg2(props) {
    return (
        <>
       
     
       <form className='midllbox' >

        <h1 className='logintext'>Login</h1>

        <div className="welcome">Welcome </div>


       <input 
        className="feild" 
        name="email" 
        value={props.email} 
        placeholder='Example@gmail.com'  
        onChange={props.handleChange}
        />
       <input 
        className="feild" 
        name="phnnum" 
        value={props.phnnum} 
        placeholder='Phone-number'  
        onChange={props.handleChange}
        />
       <div className="validate">
             {props.formerror}
         </div>
         
         <div onClick={props.toggle} className="toggle1">
         <div className="togglemove2">Back</div>
         <div className="btn" onClick={props.senddata} >Register</div>
        </div>

        
       
        </form>
        </>
    );
};
