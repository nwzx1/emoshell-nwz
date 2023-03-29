import React, { useState } from "react"
import "../buy_now/buy.css"
import {motion} from "framer-motion"
import { useEffect } from "react"
import { set_Uniq_db, set_Uniq_db_01 } from "../../pullstore/userInfo"
import { toast ,ToastContainer} from "react-toastify"
import { set_img_uploader } from "../../pullstore/img_user_uploader"


export default function Buy({data,Xclick}) {


    const [file, setFile] = useState("");
    const [Sfile, setSfile] = useState("");
    const Data = data;
    const [prod,setProd] = useState({
        data:Data,
        id:"",
        image:"",
        fullName:"",
        num:"",
        fullAdd:"",
        cityTown:"",
        Country:"",
        add2:"",
        pin:"",
    })

    const submiteData = () => {
        console.log(".........")
        
        
        if (file) {
            setTimeout(() => {
            set_Uniq_db_01("Orders",prod,data.uid).then(ans => {
                set_Uniq_db("MyOrder",prod).then(use => {
                   toast.success("done") 
                })
            setTimeout(() => {
            Xclick()
        }, 3000);
        })  
        }, 500);

        
        }else {
            console.log("...")
        }
        
        
        
    }


    // const submitimg = () => {
    //     console.log(file)
    //         set_img_uploader(Data.uid,file.name,file).then(ans => {
    //             console.log(ans)
    //             setProd(prev => ({
    //                 ...prev,
    //                 image:ans
    //             }))
    //         })
    // }
    
  const handleChange = (e) => {
    const {name, value} = e.target
    setProd({
      ...prod,
      [name]:value,
      id:Date.now()
    })
  }

  const subMe = (e) => {
    e.preventDefault();
    if (prod.Country == "" || prod.add2 == "" || prod.cityTown == ""  || prod.fullAdd == ""  || prod.fullName == ""  || file == "" || prod.num == ""  || prod.pin == "" ) {
        console.log("plzz fill form")
    } else {
        submiteData()
    }
  }
   
    useEffect(() => {
        console.log(Data)
        console.log(prod)
        console.log(file)
    },[data,prod,file])

    return(
        <>
          <motion.div  className="buy2" 
                 initial={{ opacity: 0, scale: 0.5 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.1 }}
          >
            <div className="topG1" >
                <div className="XX" onClick={Xclick}>
                    Back
                </div>
            </div>
          <div className="byPOP">
            <div className="img_box_10">
                <form action="" className="frmmm1"
                  onClick={() => document.querySelector(".img_up").click()}
                >
                    <input type="file" className="img_up" 
                     onChange={(e) =>  { 
                        e.preventDefault();
                        setFile(e.target.files[0])
                        setSfile(URL.createObjectURL(e.target.files[0]))
                        
                        
                        
                    }}
                    hidden/>
                      
                    {Sfile ? 
                    <img src={Sfile} alt="" /> : 
                    "Select A form for Verification"
                    }
                </form>
                <div className="verif">
                    <div className="xcl">x</div>
                    <div className="flnam">{file.name}</div>
                </div>
                
                
            </div>
            <div className="inp_box1">
                    Full Name :
                    <input 
                    onChange={(e) => handleChange(e)}
                    value={prod.fullName}
                   type="text" 
                   name="fullName" 
                   id="#txt1"  
                   className="txt1100"/>
                </div>
                <div className="inp_box1">
                    Contact Number :
                    <input 
                    onChange={(e) => handleChange(e)}
                    value={prod.num}
                   type="number" 
                   name="num" 
                   id="#txt1"  
                   className="txt1100"/>
                </div>
                <div className="inp_box1">
                    Full Address :
                    <input 
                    onChange={(e) => handleChange(e)}
                    value={prod.fullAdd}
                   type="text" 
                   name="fullAdd" 
                   id="#txt1"  
                   className="txt1100"/>
                </div>
                <div className="inp_box1">
                    Apt ,suite,etc :
                    <input 
                    onChange={(e) => handleChange(e)}
                    value={prod.add2}
                   type="text" 
                   name="add2" 
                   id="#txt1"  
                   className="txt1100"/>
                </div>
                <div className="inp_box1">
                    City/Town :
                    <input 
                    onChange={(e) => handleChange(e)}
                    value={prod.cityTown}
                   type="text" 
                   name="cityTown" 
                   id="#txt1"  
                   className="txt1100"/>
                </div>
                <div className="inp_box1">
                    Country :
                    <input 
                    onChange={(e) => handleChange(e)}
                    value={prod.Country}
                   type="text" 
                   name="Country" 
                   id="#txt1"  
                   className="txt1100"/>
                </div>
                <div className="inp_box1">
                    Pin Code :
                    <input 
                    onChange={(e) => handleChange(e)}
                    value={prod.pin}
                   type="number" 
                   name="pin" 
                   id="#txt1"  
                   className="txt1100"/>
                </div>
                <ToastContainer
position="top-right"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
{/* Same as */}
<ToastContainer />
                <div className="ins">
                    <input 
                        type="checkbox"
                        className="ccbx"/>
                        These product is sold to you on the premise that you have received advice from a doctor and that you are not self-medicating. Information on this site is provided for Informational purposes only. It is not meant to substitute for the advice provided by your own physician or other medical professional. You should not use the information contained herein for diagnosing or treating a health problem or disease, or prescribe any medication without consulting your doctor.
                </div>
                <div className="butttn1" onClick={subMe}>
                    ORDER
                </div>
          </div>
        </motion.div>
        </>
    ) 
}