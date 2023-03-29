import { useState } from "react"
import {auth,db, r_db} from "../firebase.file/firebase"
import {get,ref,remove} from "firebase/database"
import { doc,setDoc,collection,updateDoc,getDoc, getDocs, query, deleteDoc} from "firebase/firestore"





const UserStore = ({
    Uid:"",
})
export const UserDet = () => {
try {
     auth.onAuthStateChanged(async usar =>{
    if (usar) {
       UserStore.Uid = usar.uid
        const userRef = doc(db,'users',`${usar.uid}/user_details/UserAuth`);
       await setDoc(userRef, {UserStore}).then(ans => {
        console.log("signIn")
        // console.log(db.app)
       }).catch(err => {
        console.log(err)
       });
       } else {
        console.log("plz signin")
       }
       
    })
} catch (error) {
    console.log(error)
}
   

}


export function get_Uniq_db(coll,newProd) {
    const aTodb = new Promise((resolve,reject) => {
    auth.onAuthStateChanged(async usar =>{
        if (usar) {
            let Uid = usar.uid
        const q = query(collection(db, `users/${Uid}/user_details/${coll}/prod`));
        await getDocs(q).then(ans => {
            
            resolve(ans.docs)
        }).catch(err => {
            reject(err)
        })
        } else {
            console.log("404")
        }
        
     })
    });
    return aTodb;
}

export const set_Uniq_db = (coll,whattosave) => {
    const addTodb = new Promise((resolve,reject) => {
        auth.onAuthStateChanged(user => {
            if (user) {

                let uid = user.uid;
                 let numer = Math.floor(Math.random() * 1000000000);
         
        const userRef = doc(db,'users',`${uid}/user_details/${coll}/prod/${numer}`);
        setDoc(userRef, {...whattosave}).then(ans => {
         console.log(ans)
         resolve(ans) ;
        }).catch(err => {
         console.log(err)
         reject(err);
        });
            } else {
                console.log(":<")
            }
        })
       
            
       
        

    });
    return addTodb;
}

export const delete_Uniq_db = (coll,numer) => {
    const addTodb = new Promise((resolve,reject) => {
        auth.onAuthStateChanged(user => {
            if (user) {

                let uid = user.uid;
         
        const userRef = doc(db,'users',`${uid}/user_details/${coll}/prod/${numer}`);
        deleteDoc(userRef).then(ans => {
         console.log(ans)
         resolve(ans) ;
        }).catch(err => {
         console.log(err)
         reject(err);
        });
            } else {
                console.log(":<")
            }
        })
       
            
       
        

    });
    return addTodb;
}


export const set_Uniq_db_01 = (coll,whattosave,uid) => {
    const addTodb = new Promise((resolve,reject) => {

       
            let numer = Math.floor(Math.random() * 1000000000);
         
        const userRef = doc(db,'users',`${uid}/user_details/${coll}/prod/${numer}`);
        setDoc(userRef, {...whattosave}).then(ans => {
         console.log(ans)
         resolve(ans) ;
        }).catch(err => {
         console.log(err)
         reject(err);
        });
       
        

    });
    return addTodb;
}

export function get_multiple_Indb (coll) {
    const getTodb = new Promise((resolve,reject) => {
    auth.onAuthStateChanged(async usar =>{
        if (usar) {
        let Uid = usar.uid
       const userRef = doc(db,'users',`${Uid}/user_details/${coll}`);
       await getDoc(doc(db,'users',`${Uid}/user_details/${coll}`)).then(ans => {         
         resolve({...ans.data()})
       }).catch(err => {
        console.log(err)
        reject(err);
       });

        } else {
            console.log("404")
        }
       
    })
})
return getTodb;
}


export function get_multiple_Indb_for_Card (coll) {
    const getTodb = new Promise((resolve,reject) => {
    auth.onAuthStateChanged(async usar =>{
        if (usar) {
            
        let Uid = usar.uid
       const userRef = doc(db,'users',`${Uid}/user_details/${coll}`);
       await getDoc(doc(db,'users',`${Uid}/user_details/${coll}`)).then(ans => {         
         resolve({...ans.data()})
       }).catch(err => {
        console.log(err)
        reject(err);
       });

        } else {
            console.log("404")
        }
       
    })
})
return getTodb;
}
//register
export function getIndb (coll) {
     const getTodb = new Promise((resolve,reject) => {
     auth.onAuthStateChanged(async usar =>{
        if (usar) { 
        let Uid = usar.uid
        const userRef = doc(db,'users',`${Uid}/user_details/${coll}`);
        await getDoc(userRef).then(ans => {            
          resolve({...ans.data()})
        }).catch(err => {
         console.log(err)
         reject(err);
        });

        } else {
            console.log("404")
        }
       
     })
})
return getTodb;
}


export const setTodb = (coll,user) => {
    const addTodb = new Promise((resolve,reject) => {
    auth.onAuthStateChanged(async usar =>{
        
        if (usar) {
        let Uid = usar.uid
        const userRef = doc(db,'users',`${Uid}/user_details/${coll}`);
        await setDoc(userRef, {...user}).then(ans => {
         console.log(ans)
         resolve(ans) ;
        }).catch(err => {
         console.log(err)
         reject(err);
        });

        } else {
            console.log("404")
        }
        
     })
    });
    return addTodb;
}



export const UpdateTodb = (coll,user) => {
    const addTodb = new Promise((resolve,reject) => {
    auth.onAuthStateChanged(async usar =>{
        if (usar) {
         let Uid = usar.uid
        const userRef = doc(db,'users',`${Uid}/user_details/${coll}`);
        await updateDoc(userRef, {...user}).then(ans => {
         console.log(ans)
         resolve(ans) ;
        }).catch(err => {
         console.log(err)
         reject(err);
        });

        } else {
            console.log("404")
        }
       
     })
    });
    return addTodb;
}




// realtime data base ???????? +> 

export const set_Realtime_db = (product) => {
    const addTodb = new Promise((resolve,reject) => {
        auth.onAuthStateChanged(async usar =>{
            if (usar) {
            let Uid = usar.uid;
            const res = fetch(
                `https://emoa-5f7b3-default-rtdb.firebaseio.com/users/${Uid}.json`,
                {method : "POST",
                Headers: {
                    "content-Type":"application/json",
                },
                body: JSON.stringify({...product})
            }
            );
            if (res) {
                resolve(res)
            } else {
                reject("errorroororor")
            }

            } else {
                console.log("404")
            }
            
            })
         })
         return addTodb;
}

export const delete_Realtime_db = (delet) => {
    const addTodb = new Promise((resolve,reject) => {
        auth.onAuthStateChanged(async usar =>{
            if (usar) {
                let Uid = usar.uid;
            let rfff = ref(r_db,`users/${Uid}/${delet}`)
            remove(rfff).then(ans => {
                resolve(ans)
            }).catch(err => {
                reject(err)
            })

            } else {
                console.log("404")
            }
            
            })
         })
         return addTodb;
}


export const get_Realtime_db = () => {
    const addTodb = new Promise((resolve,reject) => {
        auth.onAuthStateChanged(async usar =>{
            if (usar) {
                let Uid = usar.uid;
            let rfff = ref(r_db,`users/${Uid}`)
            get(rfff).then(ans => {
                let data = ans.val();
                if (data) {
                     let newdata = Object.keys(data).map(key => (
                {
                    id:key,
                    data:data[key]
                }

                ))
                resolve(newdata)
                }else {
                    console.log(":<")
                }
               
                
            }).catch(err => {
                reject(err)
            })

            } else {
                console.log("404")
            }
            
            })
         })
         return addTodb;
}


export const get_Realtime_onpage_db = () => {
    const addTodb = new Promise((resolve,reject) => {
        
            let rfff = ref(r_db,`users`)
            get(rfff).then(ans => {
                let data = ans.val();
                if (data) {
                    let newdata = Object.keys(data).map(key => (
                {
                    id:key,
                    data:data[key]
                }

                ))
                resolve(newdata)
                } else {
                    console.log(":<")
                }
                
                
            }).catch(err => {
                reject(err)
            })
            })
       
         return addTodb;
}


// image uploader


export {UserStore}

