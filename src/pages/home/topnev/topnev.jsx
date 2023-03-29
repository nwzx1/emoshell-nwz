import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import  "../../../index.css"
import "../topnev/topnev.css"
import search from "../../../assets/img/Search2.png";
import  dark from "../../../assets/img/mode/dark.png"
import  lightimg from "../../../assets/img/mode/light.png"
import  dots from "../../../assets/img/mode/dots.png"
import {UserStore,UserDet, getIndb, setTodb} from "../../../pullstore/userInfo"
import img1 from "../../../assets/img/sidenev/home2.png"
import about from "../../../assets/img/sidenev/aboute.png"
import img2 from "../../../assets/img/sidenev/markit.png"
import store from "../../../assets/img/bottumnev/shop.png"
import log from "../../../assets/img/userDetails/userAdd.png"
import noti from "../../../assets/img/sidenev/noti.png"
import logout from "../../../assets/img/userDetails/logout.png"
import { is_Sign_in, Logout_user } from '../../../pullstore/log_info';
import Dailog from '../../../components/dialogBox/dialog';
import { useNavigate } from 'react-router-dom';
import {motion} from "framer-motion"

function DostIn (props) {
  return (
    <>
    <motion.div className="clk33"
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.15 }}
    >
      <div className="clm33" onClick={props.click}>
        <img src={dark} className="img33" />
        <div className="poch">Change Mode</div>
      </div>
    </motion.div>
    </>
  )
}

export default function Topnev(props) {
 const nevigate = useNavigate();
 const [clk,setClk] = useState(false);
 let md = window.localStorage.getItem("Mode")
 const [mode,setMode] = useState(md ? md : "lightmode");
 const [Search,setSearch] = useState("")
 const [signIn,setSignIn] = useState(false);
 const [auth,setAuth] = useState(false)
 const [hover,setHover] = useState(false)
 const [click,setClick] = useState(false); 
 var Uid = UserStore.Uid



const modeCng = () => {
  if (mode == "lightmode") {
    setMode("darkmode")
    window.localStorage.setItem("Mode","darkmode")
    window.location.reload(true)
    
  } else {
    setMode("lightmode")
    window.localStorage.setItem("Mode","lightmode")
    window.location.reload(true)
  }
}




  useEffect(() => {
    
    UserDet()
    getIndb("StoreAuth").then(ans => {
      setAuth(ans.isAuth)
    })
    is_Sign_in().then(ans => {
      setSignIn(ans)
    }).catch(err => {
      console.log(err)
    })
    console.log(Search)

    document.body.className = mode;
  }, [Uid,Search])

   useEffect(() => {
    
   },[mode])


   useEffect(() => {
    
   },[md])









  return (
    <>{click ?  <Dailog
                        text="Are you sure? You will Logout from this Account"
                        ClickX={()=> setClick(false)}
                        ClickY={()=> Logout_user()}
                        /> : ""}
       
    <div className="topnev">
     {clk ? <DostIn click={modeCng}/> : ""}
        <div className="emo">EMO </div>

         <div className="nevigaters">
         </div>
         <div className="nevicons2">
         <form className='Searchbx'  
                onMouseEnter={() => {setHover(true)}}
                onMouseLeave={() => {setHover(false)}}>
          <motion.input 
              type="text" 
              onChange={(e) => {
                e.preventDefault()
                setSearch(e.target.value)
                
              }}
              placeholder='Search ' 
              className="search" 
              animate={{width: hover ? 100 : 0}} 
              transition={0.5} 
              />
          <div className='iconbx1'onClick={() => nevigate("/markit",{state:{data:Search}})} >         
              <img src={search} alt="Search" className="icnin" />
           </div>
        </form>
        
         <div className="nextlogin">
           {signIn ? <img src={dots} alt="" className="img03" onClick={() => setClk(!clk)}/> : <div onClick={() => nevigate("/login") } className="log bg-transperent">login</div> }
         </div>
         </div>
      </div>
      <div className="vn1">
      <div className="b02" onClick={() => {nevigate("/")}}>
                <img src={img1} alt=""  className="img09" />
            </div>
            <div className="mt1"></div> 
            {auth ? <div className="b02" onClick={() => {nevigate("/addStore/Store")}}>
                <img src={store} alt=""  className="img09"/>
            </div> : "" }
            <div className="mt1"></div>
            <div className="b02" onClick={() => nevigate("/markit")}>
                <img src={img2} alt="" className="img09"/>
            </div>
            <div className="mt1"></div>
            <div className="b02" onClick={() => nevigate("/aboute")}>
                <img src={about} alt="" className="img09"/>
            </div>
            <div className="mt1"></div>
            <div className="b02" >
            {signIn ?  <img src={logout} alt="icnbx" className="img09" onClick={()=> {!click ? setClick(true): setClick(false)}}/> :  <Link className='b03' to="/register"><img src={log} alt="" className="img09"/></Link>}
            </div>
      </div>
      </>
      
  )
}