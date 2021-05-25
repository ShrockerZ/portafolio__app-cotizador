import {MAKE_QUOTATION,
        SET_QUOTATION,
        GET_QUOTATIONS, 
        STORE_QUOTATION,
        DELETE_QUOTATION,
        VIEW_QUOTATION,
        CLEAR_QUOTATION,
        OTHER_QUOTATION} from '../../types';

const QuotationReducer=(state,action)=>{
    switch (action.type) {
        case MAKE_QUOTATION:
        case SET_QUOTATION:
            return {...state,
            coin:action.payload.coin,
            quantity:action.payload.quantity,
            quotations:action.payload.quotations,
            change:false
            }
        case STORE_QUOTATION:
            return {...state,
            change:false,
            storageQuotations:[...state.storageQuotations,action.payload]}
        case DELETE_QUOTATION:
            return {...state,
            change:false,
            storageQuotations:state.storageQuotations.filter(quotation=>quotation.id!==action.payload)}
        case GET_QUOTATIONS:
            return {...state,
            change:false,
            storageQuotations:action.payload}
        case VIEW_QUOTATION:
            return {...state,
            change:false,
            selectedQuotation:state.storageQuotations.filter(quote=>quote.id===action.payload)[0]}
        case CLEAR_QUOTATION:
            return {...state,
            change:false,
            selectedQuotation:null}
        case OTHER_QUOTATION:
            return {...state,
            change:true,
            quotations:state.quotations.map(quote=>quote.id===action.payload.id?action.payload:quote)}
        default:  return state;
    }
}
export default QuotationReducer;