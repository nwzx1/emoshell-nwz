import React, { useState,useEffect, useLayoutEffect} from 'react'
import "../userEdit/useredit.css"
import { useNavigate } from 'react-router-dom'
import Topnev from '../topnev/topnev'
import Footer from '../footer/footer'
import Bck from "../../../assets/img/nes/back.png"
import { auth } from '../../../firebase.file/firebase'
import userimg from "../../../assets/img/imgsbnr/m_bnr.jpg"
import { updateProfile } from 'firebase/auth'
import Sidenev from '../sidenev/sidenev'
import { db } from '../../../firebase.file/firebase'
import { collection, onSnapshot ,doc,setDoc ,addDoc,getDoc,getDocs, query, updateDoc} from 'firebase/firestore'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import {UserStore,UserDet, getIndb, setTodb, UpdateTodb} from "../../../pullstore/userInfo"
import { getDownloadURL, getStorage,ref,uploadBytes} from "firebase/storage";



export default function UserEdit(props) {
  const storage = getStorage();
  const Uid = UserStore.Uid;
  
  
  const nevigate = useNavigate();
  const [data,setData] = useState([])
  const [usar, setUser] = useState({
    username:"",
    img:"",
    firstName:"",
    LastName:"", 
    email:"",
    phnnum:"",
    add:"",
    city:"",
    state: "",
    zip:"",
    country:"",
    password:"",
  });

  const sub = () => {
    data.map(u => {
      // let u = us.usar
      setUser({
        username:u.username,
        img: u.img,
        firstName: u.firstName,
        LastName: u.LastName, 
        email: u.email,
        phnnum: u.phnnum,
        add: u.add,
        city: u.city,
        state:  u.state,
        zip: u.zip,
        country: u.country,
        password: u.password
      })
     })
  }
 
const submituser = () => {
 
  setTodb("Register",usar).then(ans => {
    let usr = {isAuth:true}
    setTodb("StoreAuth",usr).then(r => {
      toast.success("Successfully Add your store")
      setTimeout(() => {
      navigate("/addStore/Store")
      window.location.reload(true)
      },3000);
      
    })
  }).catch(err => {
    console.log(err)
  })
  
}

useLayoutEffect(()  => { 
    UserDet()
    getIndb("Register").then(res => {

      let Detu = [];
        Detu.push({
          ...res,
      });
       setData(Detu)
    }).catch(err => console.log(err))
  },[Uid,UserStore])

  useEffect(() => {
    UserDet()
    sub()
  },[data])


  const [formerror, setvalidation] = useState("");
  const [file, setFile] = useState("");
    const [Sfile, setSfile] = useState("");

  const handleChange = (e) => {
   
    const {name, value} = e.target
    setUser({
      ...usar,
      [name]:value
    })
  }
  
  const { 
    username,
    img,
    firstName,
    LastName, 
    email,
    phnnum,
    add,
    city,
    state,
    zip,
    country,
    password
  } = usar;

    const validate = (values) =>{
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if(!values.email) {
          setvalidation("Email is required!");
          return false;
        }else if (!regex.test(values.email)){
            setvalidation("This is not valid Email!!")
            return false;
        }else if(!values.password) {
            setvalidation("Password is required!");
            return false;
        }else if (values.password.length < 6){
            setvalidation("password should more then 6 !!")
            return false;
        }else if (!values.phnnum) {
            setvalidation("phone-number is required!");
            return false;
        }else if (values.phnnum.length < 9) {
            setvalidation("phone-number is not valid");
            return false;
        }else {
            return true;
        }
      };



      

      //final api 
  const senddata =  (e) => {
    e.preventDefault();
    if (!usar.LastName || !usar.firstName || !usar.add || !usar.city || !usar.country || !usar.email || !usar.img || !usar.phnnum || !usar.state || !usar.zip) {
       toast.error("it is not valid")
    } else if (validate(usar)) {
      submituser();
      
    }


}
 const submiteImg = () => {
  const store = ref(storage,`Upload/${Uid}/profile/${Date.now()}-${file.name}`)
                                 uploadBytes(store, file).then((sn) => {            
                                  getDownloadURL(store).then(som => {
                                    setUser(prev => ({
                                      ...prev,
                                      img:som
                                    }))
                                  })

                                toast.success("image uploaded")
                                }).catch(err =>{
                                  console.log(err)
                                 
                                })
 }
// db setup

     
  

    const navigate = useNavigate();
	const goBack = () => {
		navigate(-1);
	}

    return(
        <div className='FSJA1 flex'>
            <Sidenev/>
        <div className='main1  h-screen w-screen'>
        <Topnev/>
         <div className="Edit1">
          {/* {formerror} */}
            {data.map((u) => {
             
              return (
                <div className="midEdit1" key={!Uid ? nevigate("/login"): Uid}>
                <div className="topNv1">
                    <div className="bckbtn1" onClick={goBack}>
                        <img src={Bck} className='img1231'/>
                    </div>
                </div>
                <div className="midl1">
                    <div className="txt1">
                        <div className="txt0">Add Store</div>
                        <div className="savebtb" onClick={senddata}>Save</div>
                    </div>
                    <div className="userFeild1">
                      <div className="mera">
                      <input type="file" className="file44" onChange={(e) =>  { 
                                e.preventDefault();
                                setFile(e.target.files[0])
                                setSfile(URL.createObjectURL(e.target.files[0]))
                                // submiteImg();
                                
                            }} />

                            <button className="btn_t" onClick={submiteImg}>save</button>
                      </div>
                       <div className="prPic1">
                          <img src={!Sfile ? usar.img : Sfile} className='imguser1' />
                       </div>
                       <ToastContainer
                       position="top-right"
                       autoClose={2000}
                       hideProgressBar={false}
                       newestOnTop={false}
                       closeOnClick
                       pauseOnFocusLoss
                       draggable
                       pauseOnHover
                       />
                    </div>
                    <div className="userNameF1">
                      <div className="FName1">
                        First Name
                         <input 
                         value={usar.firstName}
                         type="text1"
                         className='infid1'
                         name="firstName"
                         onChange={handleChange}
                          /> 
                      </div>
                      <div className="FName2">
                        Last Name
                        <input 
                        name='LastName'
                         value={usar.LastName}
                         type="text" 
                         onChange={handleChange}
                         className='infid2'/>
                      </div>
                      
  
                    </div>
                    <div className="EmailF1">
                        Email
                        <input 
                        name='email'
                        value={usar.email}
                        type="email" 
                        onChange={handleChange}
                        className='infid3'/>
                    </div>
                    <div className="EmailF1">
                        Contact - Number
                        <input 
                        name='phnnum'
                        value={usar.phnnum}
                        type="number" 
                        onChange={handleChange}
                        className='infid3'/>
                    </div>
                    <div className="EmailF1">
                        Address
                        <input 
                        name='add'
                        value={usar.add}
                        type="text" 
                        onChange={handleChange}
                        className='infid3'/>
                    </div>
  
                    <div className="userNameF1">
                      <div className="FName1">
                        City
                         <input 
                         name='city'
                         value={usar.city}
                         type="text1" 
                         onChange={handleChange}
                         className='infid1'/>
                      </div>
                      <div className="FName2">
                        State
                        <input 
                        name='state'
                        value={usar.state}
                        type="text" 
                        onChange={handleChange}
                        className='infid2'/>
                      </div>
                    
                    </div>
                    <div className="userNameF1">
                      <div className="FName1">
                        Zip - Code
                         <input 
                         name='zip'
                         value={usar.zip}
                         type="number" 
                         onChange={handleChange}
                         className='infid1'/>
                      </div>
                      <div className="FName2">
                        Country
                        <input 
                        name='country'
                        value={usar.country}
                        type="text"
                        onChange={handleChange}
                        className='infid2'/>
                      </div>  
  
                    </div>
                    <div className="userNameF1">
                      <div className="FName1">
                        Password
                         <input 
                         value={usar.password}
                         type="password"
                         className='infid1'
                         name="password"
                         onChange={handleChange}
                          /> 
                      </div>
                      <div className="FName2">
                        Username
                        <input 
                        name='username'
                         value={usar.username}
                         type="text" 
                         onChange={handleChange}
                         className='infid2'/>
                      </div>
                      
  
                    </div>
  
                </div>
            </div>
              )
            })} 
              
          </div>
        <Footer/>
        </div></div>
        
        
    )
};
