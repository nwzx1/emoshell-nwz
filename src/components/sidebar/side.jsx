import React,{useEffect, useState} from 'react'
// import "../sidebar/side.css"
import {signOut} from "firebase/auth"
import { auth } from '../../firebase.file/firebase'
import img from "../../assets/img/userDetails/user.png"
import userAdd from "../../assets/img/userDetails/userAdd.png"
import editUser from "../../assets/img/userDetails/userEdit.png"
import logoutUser from "../../assets/img/userDetails/logout.png"
import { useNavigate } from 'react-router-dom'
import Dailog from '../dialogBox/dialog'

export default function Side(props) {
const [isClick,setIsClick] = useState(false);
const CLICKX = () => {
     if (CLICKX) {
        setIsClick(false)
     }
}
const CLICKY = () => {
    if (CLICKY) {
       LogOut();
    }
}
const clickLogout = () => {
    if (!isClick) {
        setIsClick(true);
    }
}
const LogOut = () => {
    signOut(auth).then(() => {
        alert("auccesfully SignOut")
         window.location.reload(true)
      }).catch((error) => {
         console.log(error)
      });
}

    const navigate = useNavigate();
    const [userBook,setUserBook] = useState({
        username: "",
        email:"",
        image:""
    })
    const [Accept,setAccept] = useState("")
     useEffect(() => {
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
    
   

    return(
         <div className="Side" >
             
            <div className="side1">
                <div className="userImage">
                    {userBook.image ? <img src={userBook.image} className='img' />
                     : <img src= {img} className='img'></img>}
                     {console.log(userBook.image)}
                     </div>
                     <div className="userName">{userBook.username}</div>
                     <div className="userEmail">{userBook.email}</div>
             
            </div>
            <div className="side2">
                <div className="editUser"  onClick={() => navigate("/userEdit")}>
                    <img src={editUser} className='Add'/>
                    Edit Profile</div>
                <div className="editUser"  onClick={() => navigate("/notifi")}>
                    <img src={editUser} className='Add'/>
                    Notification</div>
                <div className="editUser" onClick={() => navigate("/register")}>
                    <img src={userAdd} className='Add' />
                    Add New Account</div>
                <div  className="editUser" onClick={clickLogout}>
                <img src={logoutUser} className='Add'/>
                    Logout</div>

                {isClick ? <Dailog
                                  text="Are you sure? You will Logout from this Account"
                                  ClickX={CLICKX}
                                  ClickY={CLICKY}
                                  /> : ""}
            </div>
         </div>
    )
}