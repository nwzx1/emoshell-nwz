import React,{useEffect, useLayoutEffect, useState} from 'react';
import Footer from '../home/footer/footer';
import {motion} from "framer-motion"
import locationicon from "../../assets/img/location.png"
import search from "../../assets/img/Search2.png"
import Topnev from '../home/topnev/topnev';
import "../mapmarkit/mapmart.css"
import Leftnev from './leftnev/leftnev';
import Midport from './mid portion/midport';
import Sidenev from '../home/sidenev/sidenev';
import Bot from '../../components/bottom-barr/bot';
import AddProd from '../../components/addprod/addProd';
import { useTransition,animated } from 'react-spring';
import {getIndb, get_Realtime_onpage_db, set_Uniq_db, UserDet, UserStore,} from "../../pullstore/userInfo";
import { doc, getDoc } from 'firebase/firestore';
import { db,auth } from '../../firebase.file/firebase';
import { useLocation, useNavigate } from 'react-router-dom';
import Popuplist from '../../components/popuplist/popup';
import MCard from '../../components/mart-card/M-card';


  
 
export default function Markit() {
  const Loc = useLocation();
  try {
    var serc = Loc.state.data;
  } catch (e) {
    console.log(":<")
  }
  
  const nevigate = useNavigate();
  const [Search,setSearch] = useState("")
  const [filterData,setFilterData] = useState([])
  const [popup,setpop] = useState(false);

    const handlemyclick =(e)=> {
        setpop(!popup)
    }

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

      getIndb("UserAuth").then(ans => {
        if (ans) {
          setclick(true)
        }else {
          setclick(false)
        }
        
      })


      setSearch(serc)
    },[serc])
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
   },[pro,data,detu])
  
   
   const hndlFilter = () => {
    const newpata = newdata.filter((vall) => {
      if (Search) {
        return vall.title.toLowerCase().includes(Search.toLowerCase()) || vall.disc.toLowerCase().includes(Search.toLowerCase()) || vall.location.toLowerCase().includes(Search.toLowerCase())
      }
      
    }) 

    setFilterData([...newpata])

   }
    useEffect(() => {
      hndlFilter()
    },[Search,newdata])
 

  return (
    <div className="dfdf flex">
      <Sidenev/>
      <div className='Xmain h-screen w-screen'>
      <Topnev/>
      {popup ? <Popuplist
                 clkme1={(e) => {
                  setSearch(e.target.innerHTML)
                  setpop(!popup)
                 }}
                 area1="mumbai"
                 area2="gujrat"
                 area3="delhi"
                 clkme={handlemyclick}
                 
           /> : ""}
     <div className="toparea w-screen">
     <motion.div className="textbox" 
               initial={{ opacity: 0, scale: 0.5 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.2 }}
       >
        <h1 className="h1text">Search Nearest Medical Products here</h1>
        <h2 className="h0text">Now find More then Million + medical stores around you!</h2>
       </motion.div>
       <motion.form className='Searchbox'  animate={{x:[-1000,300,0]}}>
        <div className='locationbox' onClick={() => setpop(true)}>
        <img src={locationicon} alt="" className="locationicon bg-transparent" />
         <div className="lctn bg-transparent">Locations</div> 
        </div>
        <input 
            onChange={(e) => {
              e.preventDefault()
              setSearch(e.target.value)
              
            }}
            type="text" 
            placeholder='Search medical products ,from nearest location' 
            className="Search" 
            />
          <div className='iconbox1'>
            <div className="icongool">
              <img src={search} alt="Search" className="iconin" />
            </div>
           </div>
       </motion.form>
       
           <div className="boxy h-20"></div>
     </div>
      <div className="ymidbox">
       {/* <Midport search={Search}/>  */}
       <div className="row2">
            
            <div className="r2">
              {Search ? filterData.map(ans => {
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
              }) : newdata.map(ans => {
                return(
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
      </div>
      {click ? <Bot
        cardClk={() => nevigate("/notifi")}
      /> : ""}
      <Footer/>
     
      </div> 
    
   </div>

  )
}