import React from 'react';
import Footer from '../home/footer/footer';
import Topnev from '../home/topnev/topnev';
import "../aboutus/aboute.css";
import Sidenev from '../home/sidenev/sidenev';


export default function Midside() {
 
  return (
    <div className="dfd flex">
      <Sidenev/>
       <div className='clss h-screen w-screen '>
      <Topnev/>
       <div className="abuteus">
         <div className="textbox1">
          <div className="h1text4">Feedback</div>
          <div className="h0text1">
            We would love to respond to your queries and help you succeed feel free to get in touch with us.
            </div>
         </div>

      </div>
      <div className="aboutebox w-screen">
    
          <form 
            className="Acrd"
            action='https://formspree.io/f/meqwldej'
            method='POST'
            >
          <div className="flds">
              Feedback Card
            </div>
            <div className="flds">
              <input 
                  placeholder='example@gmail.com'
                  type="email" 
                  name="Email" 
                  className='txtxt'
                  required
                  />
            </div>
            <div className="flds">
              <input 
                  placeholder='FullName'
                  type="text" 
                  name="FullName" 
                  className='txtxt'
                  required
                  />
            </div>
            <div className="flds">
              <textarea 
                  required
                  placeholder='Message'
                  type="text"
                  name="Message" 
                  className='txtxtA'
                  />
            </div>
            <div className="flds">
               <input 
                  className='btntxtx'
                  type="submit"
                  value="Send"
                  contentEditable="false"
                  />
            </div>
          </form>
          
      
      </div>
     <Footer/>
    </div>
    </div>

   
  )
}
