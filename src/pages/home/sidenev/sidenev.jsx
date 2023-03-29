import React, { useState ,useEffect} from "react"
import {motion} from "framer-motion"
import "../sidenev/sidenev.css"
import {signOut} from "firebase/auth"
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../../firebase.file/firebase";
import Dailog from "../../../components/dialogBox/dialog";
import Slogo from "../../../assets/img/sidenev/EmoS.png";
import Home from "../../../assets/img/sidenev/home.png";
import mart from "../../../assets/img/sidenev/markit.png";
import aboute from "../../../assets/img/sidenev/aboute.png"
import img from "../../../assets/img/userDetails/user.png"
import userAdd from "../../../assets/img/userDetails/userAdd.png"
import editUser from "../../../assets/img/bottumnev/shop.png"
import logoutUser from "../../../assets/img/userDetails/logout.png"
import noti from "../../../assets/img/sidenev/noti.png"
import 'react-toastify/dist/ReactToastify.css';
import { toast ,ToastContainer} from "react-toastify";
import { doc, getDoc } from "firebase/firestore";
import { getIndb, get_multiple_Indb, UserDet, UserStore } from "../../../pullstore/userInfo";


export default function Sidenev(props) {
    const navigate = useNavigate();
    const [isAuth,setAuth] = useState(false)
    const [sizeis ,setSize] = useState("sideNev_close");
    const [open,close] = useState(true)
    const Uid = UserStore.Uid;


    const [isClick,setIsClick] = useState(false);
const CLICKX = () => {
     if (CLICKX) {
        setIsClick(false)
     }
}
const CLICKY = () => {
    if (CLICKY) {
       LogOut();
       toast.success("logout Successfully")
    }
}
const oncllk = () => {
  UserDet();
  getDoc(doc(db,Uid,"StoreAuth")).then(f => {

    if (isAuth) {
      navigate("/addStore/Store")
      window.location.reload(true)
    } else {
      navigate("/addStore")
      window.location.reload(true)
    }

      
  
  })

  
}
const clickLogout = () => {
    if (!isClick) {
        setIsClick(true); 
       
    }
}
const LogOut = () => {
    signOut(auth).then(() => {
        localStorage.setItem("Uid","")
        window.location.reload(true)
      }).catch((error) => {
         console.log(error)
      });
}
const nevigate = useNavigate()
const [signIn ,setSignIn] = useState(false)
useEffect(() => {
 
  auth.onAuthStateChanged((user) =>{
    if (user) {
      setSignIn(true);
    } else {
      setSignIn(false)
    }
  })
}, [])
    const [userBook,setUserBook] = useState({
        username: "",
        email:"",
        image:""
    })
    const [Accept,setAccept] = useState("")
     useEffect(() => {
      UserDet();
      get_multiple_Indb("StoreAuth").then(ans => {
        setAuth(ans.isAuth);
      }).catch(err => {
        setAuth(false)
      })
     auth.onAuthStateChanged((user) =>{
      if (user) {
        setAccept(user.displayName);
        setUserBook({
            username:user.displayName,
            email:user.email,
            image:user.photoURL
        })
       } 
    })
  },[])
    
     
    return (
        <motion.div className={sizeis} animate={{width: open ? 83 : 290}} onClick={() =>{
          if (sizeis === "sideNev_close") {
              setSize("sideNev_open")
              close(false)
          }else {
              setSize("sideNev_close")
              close(true)
          }
         }}>
          
           
           <div className="nevtix1"> 
           <div className="logo01" >
           {open ?  <img className="img1234" src={Slogo} alt="" /> : <>
           <img className="img1234" src={Slogo} alt="" />
           <div className="etxt41">EMO - </div>
           </>}
           
           </div> 
            <div className="UserMode1">
            </div> 
            <div className="userLogs1">

             
            
             <div className="side21">
             
            <div className="editUser1"  onClick={() => navigate("/")}>
                    {open ? <img src={Home} className='Add1'/> : 
                    <>
                    <img src={Home} className='Add1'/>
                    <div className="etxt1">Home</div>
                    </>}          
            </div>
            <div className="editUser1"  onClick={() => navigate("/markit")}>
                    {open ? <img src={mart} className='Add1'/> : 
                    <>
                    <img src={mart} className='Add1'/>
                    <div className="etxt1">Market - Place</div>
                    </>}          
            </div>
           {isAuth ?  <div className="editUser1"  onClick={oncllk}>
                    {open ? <img src={editUser} className='Add1'/> : 
                    <>
                    <img src={editUser} className='Add1'/>
                    <div className="etxt1">myStore</div>
                    </>}          
            </div> : ""}
            <div className="editUser1"  onClick={() => navigate("/aboute")}>
                    {open ? <img src={aboute} className='Add1'/> : 
                    <>
                    <img src={aboute} className='Add1'/>
                    <div className="etxt1">Feedback</div>
                    </>}          
            </div>
            {isAuth ? <div className="editUser1"  onClick={() => navigate("/notifi")}>
                    {open ? <img src={noti} className='Add1'/> : 
                    <>
                    <img src={noti} className='Add1'/>
                    <div className="etxt1">Notification</div>
                    </>}          
            </div> : ""}
            <div className="editUser1"  onClick={() => navigate("/login")}>
                    {open ? <img src={userAdd} className='Add1'/> : 
                    <>
                    <img src={userAdd} className='Add1'/>
                    <div className="etxt1">Add New Account</div>
                    </>}          
            </div>
            {signIn ? <div className="editUser1"  onClick={clickLogout}>
                    {open ? <img src={logoutUser} className='Add1'/> : 
                    <>
                    <img src={logoutUser} className='Add1'/>
                    <div className="etxt1">Logout</div>
                    </>}          
            </div> : ""}
                 
                 {isClick ? <Dailog
                                   text="Are you sure? You will Logout from this Account"
                                   ClickX={CLICKX}
                                   ClickY={CLICKY}
                                   /> : ""}
             </div>
            </div>
          
            <div className="accInfo">
             

            </div>
           
           
 
          </div>
        </motion.div>
    )
};
