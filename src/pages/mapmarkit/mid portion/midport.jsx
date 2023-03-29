import React, { useEffect, useState } from "react";
import "../mid portion/midport.css";
import {useSelector} from "react-redux"
import MCard from "../../../components/mart-card/M-card";
import { collection ,getDocs,query} from "firebase/firestore";
import { db } from "../../../firebase.file/firebase";
import { get_Realtime_onpage_db, setTodb, set_Uniq_db } from "../../../pullstore/userInfo";
import { useNavigate } from "react-router-dom";
import ViewProd from "../../../components/veiw_prod/viewProd";
 
export default function Midport({Search}) {
  const [search,setSearch] = useState(Search)
  const nevigate = useNavigate();
  const [click,setclick] = useState(false);
  const [pro,setPro] = useState([])
  const [data,setData] = useState([])
  const [newdata ,setnewdata] = useState([])
  useEffect(() => {
    get_Realtime_onpage_db().then(ans => {
      ans.forEach( e => {
        let detu = e.data
        let newdetu  =  Object.keys(detu).map(key => ({
                    id:key,
                    ...detu[key]
        }))
        setPro(prev => [...prev,newdetu])
        
    });
    })
  },[])
 useEffect(() => {
setPro([new Set(pro)])
 },[])


  useEffect(() => {
    pro.map(ans => { 
      console.log()
     
      setData(prev => [...prev,ans])
      // setData(prev => [new Set(prev)])
    })
  },[pro])
const [detu ,setDetu] = useState([])
const clickit = (e,duta) => {
  nevigate("/markit/ViewProd",{state:{data:duta}})
  
}

const btnclk = (data) => {
  console.log(data)
  set_Uniq_db("AddToCard",{data}).then(ans => {
    console.log(ans)
  })
}
  
  useEffect(() => {
    data.map(ans => {
      setnewdata(prev => [...prev,...ans])
    })
    console.log(search)
 },[pro,data,detu,search])

 

/// main area  



    return(
        <>
          <div className="row2">
            
            <div className="r2">
              {newdata.filter(srch => {
                let srcL = srch.location;
                srcL.toLowerCase().includes(Search)
              
              }).map(ans => {
                return (
                  <div key={ans.id} className="crd23" > 
   
                       <MCard
                         click={(e) => clickit(e,ans)}
                         btnClick={() => btnclk(ans)}                         
                         img={ans.imgURL}
                         title={ans.title}
                         price={`${ans.price}rs`}
                         add={ans.location}
                     />
                     </div>
                )
              })}
             
            </div> 
          </div>
        </>
    )
}

// {newdata.map(ans => {

//   // takeme(ans)
//   return (
//     <div key={ans.id} className="crd23" > 
   
//     <MCard
//         click={(e) => clickit(e,ans)}
//         btnClick={() => btnclk(ans)}
//         img={ans.imgURL}
//         title={ans.title}
//         price={`${ans.price}rs`}
//         add={ans.location}
//     />
//     </div>
//   )
// })}