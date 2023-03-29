import React, { useState,useEffect } from 'react'
import "../notify/notifi.css"
import { useNavigate } from 'react-router-dom'
import Topnev from '../../pages/home/topnev/topnev';
import Footer from '../../pages/home/footer/footer';
import Bck from "../../assets/img/nes/back.png";
import Sidenev from '../../pages/home/sidenev/sidenev';
import { get_Uniq_db } from '../../pullstore/userInfo';
import Ntf, { Ntf_sml } from '../notif_card/ntf';

export default function Notifi(props) {
   
    const [show,setShow] = useState(false)
    const [noti,setnoti] = useState([])
    const [crt,setCrt] = useState([])
    const nevigate = useNavigate();
	const goBack = () => {
		nevigate(-1);
	}


    const Lclk = (e,ans) => {
        console.log(ans)
        nevigate("/NotifiView",{state:{data:ans}})
    }
    useEffect(() => {
        get_Uniq_db("Orders").then(ans => {
            if (ans) {
                ans.forEach(e => {
                    setnoti(prev => [...prev,{
                        id:e.id,
                        data:e.data()}
                                     ])
                                     
                });
            }
            else {
                console.log(":<")
            }
            
        })
    },[])



    useEffect(() => {
        get_Uniq_db("MyOrder").then(des => {
            if (des) {
                des.forEach(e => {
                    setCrt(prev => [...prev,{
                        id:e.id,
                        data:e.data()}
                                     ])
                                     
                });
            }
        })
    },[])

    useEffect(() => {},[noti])
    return(
        <div className="dfdf flex">
            <Sidenev/>
        <div className='main  h-screen w-screen'>
        <Topnev/>
         <div className="Edit">
            <div className="midEdit">
                <div className="topNv">
                    <div className="bckbtn" onClick={goBack}>
                        <img src={Bck} className='img123'/>
                    </div>
                </div>
                <div className="midl">
                    <div className="txt">Notifications</div>
                     <div className="userFeild">

                        <div className="box77">
                            <div className="orders" onClick={() => setShow(true)}>
                                My Cart
                            </div>
                            <div className="orders" onClick={() => setShow(false)}>
                                Orders
                            </div>
                        </div>
                        <div className="maisd">
                        {noti.map(ans => {
                        let id = ans.id;
                        let sns = ans.data;
                        let dete = ans.data.data;
                        return (
                            <div className='misd' key={ans.id}>
                            {show && <Ntf
                                       cityTown={sns.cityTown}
                                       imgURL={dete.imgURL}
                                       Lclk={(e) => Lclk(e,ans)}
                                       />}
                            </div>
                        )
                       })}
                            
                        </div>
                        
                       {crt.map(ans => {
                        let id = ans.id;
                        let sns = ans.data;
                        let dete = ans.data.data;
                        return (
                            <div className='misd' key={ans.id}>
                            {!show && <Ntf_sml
                                       num={dete.phnnum}
                                       imgURL={dete.imgURL}
                                       />}
                            </div>
                        )
                       })}
                     </div>
                </div>
            </div>
              
          </div>
        <Footer/>
        </div>
        </div>
        
        
    )
};
