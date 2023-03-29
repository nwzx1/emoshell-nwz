import React,{useState,useEffect} from 'react';
import './App.css';
import { auth } from './firebase.file/firebase';
import {Route,Routes} from 'react-router-dom';
import Reg from './pages/home/Register/Register';
import Home from './pages/home/home';
import Markit from './pages/mapmarkit/mapmarkit';
import Login from './pages/loginpage/login';
import Aboute from './pages/aboutus/about';
import UserEdit from './pages/home/userEdit/UserEdit';
import Notifi from './components/notify/Notifi';
import { useNavigate } from 'react-router-dom';
import UiStore from './pages/home/userEdit/Mystore/uiStore';
import { getIndb, get_multiple_Indb } from './pullstore/userInfo';
import ViewProd from './components/veiw_prod/viewProd';
import AddToCrd from './components/add_to_cart/addToCrd';
import ViewNtf from './components/v_notify/ViewNtf';

function App() {

  const nevigate = useNavigate()
  const [signIn ,setSignIn] = useState(false)
  const [Storeauth,setAuth] = useState(false);
  useEffect(() => {
    auth.onAuthStateChanged((user) =>{
      if (user) {
        setSignIn(true);
      } else {
        setSignIn(false)
      }
    })

    get_multiple_Indb("StoreAuth").then(ans => {
      setAuth(ans.isAuth);
    }).catch(err => {
      setAuth(false)
    })
  }, [])


  return (
     <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/markit/ViewProd" element={<ViewProd/>} />
      <Route exact path="/markit/addToCrd" element={<AddToCrd/>} />
      <Route exact path="/notifi" element={Storeauth ? <Notifi/> :  <UserEdit/>} />
      <Route exact path="/NotifiView" element={Storeauth ? <ViewNtf/> :  <UserEdit/>} />
      <Route exact path="/login" element={<Login/>} />
      <Route exact path="/markit" element={<Markit/>} />
      <Route exact path="/register" element={<Reg/>} />
      <Route exact path="/aboute" element={<Aboute/>} />
      <Route exact path="/addStore" element={signIn ? <UserEdit/> : <Login/>} />
      <Route exact path="/addStore/Store" element={Storeauth ? <UiStore/> : <UserEdit/>}/>
     </Routes>
    
  );
}

export default App;
