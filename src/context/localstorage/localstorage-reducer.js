import { GET_QUOTATIONS, STORE_QUOTATION,DELETE_QUOTATION
        ,VIEW_QUOTATION, 
        CLEAR_QUOTATION} from "../../types";


export default (state,action)=>{
    switch (action.type) {
        case STORE_QUOTATION:
            return {...state,
            storageQuotations:[...state.storageQuotations,action.payload]}
        case DELETE_QUOTATION:
            return {...state,
            storageQuotations:state.storageQuotations.filter(quotation=>quotation.id!==action.payload)}
        case GET_QUOTATIONS:
             return {...state,
            storageQuotations:action.payload}
        case VIEW_QUOTATION:
            return {...state,
            selectedQuotation:state.storageQuotations.filter(quote=>quote.id===action.payload)[0]}
        case CLEAR_QUOTATION:
            return {...state,
            selectedQuotation:null}
        default: return {...state}
    }
}