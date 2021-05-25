import {GET_CURRENCY} from "../../types"
const CurrencyReducer =(state,action)=>{
    switch (action.type) {
        case GET_CURRENCY:return {currencies:action.payload} 
        default: return state;
    }
}
export default CurrencyReducer;