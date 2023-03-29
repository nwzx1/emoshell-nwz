import { ActionTypes } from "../contants/action-types";


const initialState = {
    products: [
       {
        id:"",
        imgURL:"",
        title:"",
        disc:"",
        price:"",
        location:"",
        phnnum:""
       },
    ],
}

export const productReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case ActionTypes.SET_PRODUCTS:
            return state;
        default:
           return state;
    }
}