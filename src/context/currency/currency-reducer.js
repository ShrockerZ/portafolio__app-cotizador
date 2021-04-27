import {GET_CURRENCY} from "../../types"
export default (state,action)=>{
    switch (action.type) {
        case GET_CURRENCY:return {currencies:action.payload} 
        default: return state;
    }
}