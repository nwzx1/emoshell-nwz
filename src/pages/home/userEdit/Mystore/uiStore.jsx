import React, { useEffect, useLayoutEffect, useState } from "react";
import "../Mystore/uiStore.css";
import { motion } from "framer-motion";
import Sidenev from "../../sidenev/sidenev";
import Topnev from "../../topnev/topnev";
import Footer from "../../footer/footer";
import {  useNavigate } from "react-router-dom";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { db} from "../../../../firebase.file/firebase";
import { delete_Realtime_db, getIndb, getTodb, get_multipal_db, get_Realtime_db, get_Uniq_db, UserDet, UserStore } from "../../../../pullstore/userInfo";
import ProdCard from "../../../../components/card_my_product/product_card";
import imgd from "../../../../assets/img/userDetails/user.png"
import add from "../../../../assets/img/bottumnev/add.png"
import AddProd from "../../../../components/addprod/addProd";
import Dailog from "../../../../components/dialogBox/dialog";
import Bot from "../../../../components/bottom-barr/bot";



export default function UiStore(props) {
    const [id,setId] = useState("")
    const [del,setDel] = useState(false)
    const [load,setload] = useState(false)
    const [addclk,setaddClk] = useState(false)
    const [data,setData] = useState([])
    const [pro,setPro] = useState([])
    const nevigate = useNavigate();
    const Uid = UserStore.Uid;

    useEffect(() => {

    },[Uid,UserStore])
    useEffect(() => { 
        UserDet();
        getIndb("Register").then(ans => {
            setData([ans])
        }).catch(err => {

        })
        get_Realtime_db().then(ans => {
            ans.forEach( e => {
                setPro(prev => [...prev,e])
            });
            
        })
        
       
    },[Uid,UserStore])

    const deletmsg = () => {
        setTimeout(() => {
            delete_Realtime_db(id).then(ans => {
                window.location.reload(true);
        })
        }, 1000);
        
    }

    const addClk = () => { 
        setaddClk(!addclk)
      }
    useEffect(() => {

    },[data,pro,id])

    return(
        <div className='FSJA1 flex'>
        <Sidenev/>
        {del ? <Dailog
                     text="Do you want to delete this product"
                     ClickX={() => setDel(false)}
                     ClickY={() => deletmsg()}
                     /> : ""}
    <div className='main1  h-screen w-screen'>
    <Topnev/>
        {data.map(ans => {
            let user = ans;
            return (
                <div className="store"key={ans}>
          <div className="top-st">
            <div className="st-m">
                <div className="EditStore">
                    <div className="etxt09">MyStore</div>
                    <button className="btn_st" onClick={() => {
                        setload(true)
                        setTimeout(() => {
                        setload(false);
                        nevigate("/addStore");
                    }, 2000)
                    }}>{load ? <motion.div className="golll" transition={{ duration: 3 }} animate={{x:[20,-20,20,-20,20,-20,20,-20,20],y:[5,-5]}}>
                        
                    </motion.div> : "Edit"} </button>
                </div>
                <div className="user_dit">
                    <div className="pr0_crlc">
                        <img src={user.img ? user.img : imgd} alt="" className="pr1_crlc" />
                    </div>
                </div>
            </div>
            <div className="nd-m">
                <div className="urn"><div className="Qs">Username</div><div className="ans">{user.username}</div></div>
                <div className="urn"><div className="Qs">Full name</div><div className="ans">{user.firstName + " " + user.LastName}</div></div>
                <div className="urn"><div className="Qs">Phone number</div><div className="ans">{user.phnnum}</div></div>
                <div className="urn"><div className="Qs">Email</div><div className="ans">{user.email}</div></div>
                <div className="urn"><div className="Qs">Address</div><div className="ans">{`${user.add} ,${user.city} ,${user.state} ,${user.country} ,${user.zip}`}</div></div>
                
            </div>
            <div className="pst">
                <div className="post" onClick={addClk}>
                    <img src={add} alt="" className="img22 bg-transparent"/>
                </div>
            </div>
            <div className="bot-st">
            {pro.map(ans => {
                let a = ans.data;
                return (
                    <div className="crd3" key={ans.id}>
                        <ProdCard
                            img={a.imgURL}
                            title={a.title}
                            disc={a.disc}
                            price={`${a.price}rs`}
                            click={() => {
                                setId(ans.id);
                                setDel(true)
                            }}
                        />
                    </div>
                )
            })}
          </div>
          </div>
          
      </div>
        )
        })}

      <Bot
        cardClk={() => nevigate("/notifi")}
      /> 
    <Footer/>
    </div>
 {addclk ?  <AddProd clk={addClk}/> : ""}
 </div>
    
    )
}


{/* <div className="bot-st">
            {pro.forEach(ans => {
                let a = ans.whattosave;
                return (
                    <div className="crd3" key={a.id}>
                        <ProdCard
                            img={a.imgURL}
                        />
                    </div>
                )
            })}
          </div> */}