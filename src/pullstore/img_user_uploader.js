import {getDownloadURL,ref, getStorage,uploadBytes } from "firebase/storage";


export const set_img_uploader = (uid,filename,file) => {
   
    let p = new Promise((resolve,reject) => {
       
        const storage = getStorage();
        
            const store = ref(storage,`Upload/${uid}/profile/${Date.now()}-${filename}`)
            uploadBytes(store,file).then((sn) => {            
            getDownloadURL(store).then(som => {
            resolve(som)
        }).catch(err => reject(err))

   console.log("image uploaded")
   }).catch(err =>{
     console.log(err)
    
   })

       
    })
    
    return p;
}

