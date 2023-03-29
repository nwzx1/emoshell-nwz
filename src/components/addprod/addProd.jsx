import React,{useEffect, useState} from "react";
import "../addprod/add.css";
import { AnimatePresence, motion } from "framer-motion";
import 'react-awesome-slider/dist/styles.css';
import { getDownloadURL, getStorage,ref,uploadBytes} from "firebase/storage";
import Slides1 from "./slides/slides1";
import { useNavigate } from "react-router-dom";
import Slides2 from "./slides/slides2";
import { getIndb, set_Realtime_db, set_Uniq_db, UserDet, UserStore } from "../../pullstore/userInfo";
import { addDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase.file/firebase";
import {ToastContainer, toast } from "react-toastify";




export default function AddProd(props) {
    
    const Uid = UserStore.Uid;
    const [validation,setvalidation] = useState("")
    const [slide,setSlide] =useState({})
    const [click,setClick] = useState(0)
    const nextClick = () => {
        if (validateImg(file)) {
             hndlsub();
         setClick(click + 1)
         toast.success("good job!!")
        console.log(click)
        } else {
            toast.error("image is not valid")
        }
        
        
    }

    const nevigate = useNavigate()
    const [file, setFile] = useState("");
    const [Sfile, setSfile] = useState("");
    const [product,setProd] = useState({
        uid:"",
        id:"",
        imgURL:"",
        title:"",
        disc:"",
        price:"",
        location:"",
        phnnum:""
    });


    useEffect(() => {
        UserDet();
    },[])
    const storage = getStorage();
    
    const validate = (pro) =>{
        
         if(!pro.title) {
            setvalidation("product title is required?");
            return false;
          } else if (!pro.price){
              setvalidation("price cant be empty")
              return false;
          } else if (!pro.disc) {
            setvalidation("plz fill the product details")
            return false;
          }else if (pro.disc) {
            if (pro.disc.length < 10 ) {
                setvalidation("make it true")
                return false;
              }else if (!pro.disc.length < 10) {
                setvalidation("")
                return true;
            }
        } 
    }
    const validateImg = pro => {
        if (!pro) {
            setvalidation("plz fill your image")
            return false;
        }else if (pro) {
            setvalidation("")
            return true;
        }
    }
    

    const hndlsub = (e) => {
        const store = ref(storage,`Upload/${Uid}/${Date.now()}-${file.name}`)
           uploadBytes(store, file).then((snapshot) => {
            getDownloadURL(store).then(som => {
                setProd(prev => ({
                  ...prev,
                    imgURL:som
                }))
              })
            getIndb('Register').then(ans => {
                console.log(ans)
                let user = ans;
                const Phnnum = user.phnnum;
                const location = `${user.add} ,${user.city} ,${user.state} ,${user.country} ,${user.zip}`;

                auth.onAuthStateChanged(user => {
                  if(user) {
                     setProd(prev => ({
                    ...prev,
                    uid:user.uid,
                    location:location,
                    phnnum:Phnnum,
                    id:Date.now(),
                }))
                  }
                })
        
               
            }).catch(e => {
                console.log(e)
            })
            

            
          }).catch(err =>{
            console.log(err)
           
          })

    }
    const hendlesbmt = async (e) => {
           if (!validate(product)) {
             toast.error("fill details properly")
           } else if (validate(product)) {
            e.preventDefault();
           UserDet();
           await set_Realtime_db(product).then(ans => {
            toast.success("product saved successfully")
            setTimeout(() => {
              window.location.reload(true);
              props.clk(false) 
            }, 1000);
            

          }).catch(err => {
            console.log(err)
          })
           }
           
        }

    const handlechng = (e) =>  { 
        
        setFile(e.target.files[0])
        setSfile(URL.createObjectURL(e.target.files[0]))
        
        }
    const handleChng = (e) => {
        
        const {name, value} = e.target
        setProd({
          ...product,
          [name]:value
          })
          validate(product)
        
    }

    const { 
        uid,
        id,
        imgURL,
        title,
        disc,
        price,
        location,
        phnnum
      } = product;



    useEffect(() => {

    },[product,file,slide,validation])
   
   
       
    




    return(
        <div className="meixbox">
          <motion.div className="addProd" >
             <div className="toplist">
                <div className="text23">Product Detail Form</div>
                <div className="gol" onClick={props.clk}>
                    <div className="gol1"></div>
                    <div className="gol2"></div>
                    <div className="gol3"></div>
                </div>
             </div>
             <div className="botlist">
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
                <AnimatePresence>
                 {click === 0 && <Slides1 
                                    val={validation}
                                    text="next" 
                                    next={nextClick} 
                                    Sfile={Sfile} 
                                    handlechng={handlechng} 
                                    />}
                 {click === 1 && <Slides2 
                                    val={validation}
                                    text="back"
                                    Text="Submit" 
                                    next={nextClick}
                                    onsubmite={hendlesbmt} 
                                    Sfile={Sfile} 
                                    handleChng={handleChng} 
                                    price={product.price}
                                    />}
                 {click === 2 && <>{setClick(0)}<Slides1 
                                                   val={validation}
                                                   text="next" 
                                                   next={nextClick} 
                                                   Sfile={Sfile} 
                                                   handlechng={handlechng} 
                                                   />
                                    </>}
                </AnimatePresence>
                
             </div>
          </motion.div>
        </div>
    )
}