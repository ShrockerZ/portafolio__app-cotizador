import {  MAKE_QUOTATION } from "../../types";

export default (state,action)=>{
    switch (action.type) {
        case MAKE_QUOTATION:
            return {...state,
            coin:action.payload.coin,
            quantity:action.payload.quantity,
            quotations:action.payload.quotations,
            }
        default:  return state;
    }
}