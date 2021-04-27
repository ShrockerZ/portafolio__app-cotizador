import {    STORE_QUOTATION,
            MAKE_QUOTATION ,
            // DELETE_QUOTATION,
            // VIEW_QUOTATION
        } from "../../types";

export default (state,action)=>{
    switch (action.type) {
        case STORE_QUOTATION: return {...state,
        storageQuotations:[...state.storageQuotations,action.payload]};
        case MAKE_QUOTATION: return {...state,...action.payload}
        default:  return state;
    }
}