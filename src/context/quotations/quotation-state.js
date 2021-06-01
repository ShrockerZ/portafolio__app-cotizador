// use of local storage to keeep quotation
import axios from 'axios';
import { cloneDeep } from "lodash";
import {v4 as uuidV4} from "uuid"
import React,{useReducer,useEffect} from 'react';
import {MAKE_QUOTATION,
        GET_QUOTATIONS, 
        STORE_QUOTATION,
        DELETE_QUOTATION,
        VIEW_QUOTATION,
        OTHER_QUOTATION,
        CLEAR_QUOTATION} from '../../types';
import QuotationContext from './quotation-context';
import QuotationReducer from './quotation-reducer';


const QuotationState = props => {
    // default values
    const initialState={
        coin:null,
        quantity:null,
        quotations:[
            {   id:1,
                coin:'EUR',
                quotation:0},
            {   id:2,
                coin:'USD',
                quotation:0},
            {   id:3,
                coin:'BTC',
                quotation:0},
        ],
        change:false,
        storageQuotations:[],
        selectedQuotation:null
    };
    // reducer
    const [state, dispatch] = useReducer(QuotationReducer, initialState)
    
    // functions
    const makeQuotation=async ({coin,quantity},quotations)=>{
        const copy=cloneDeep(quotations);
        try {            
            const result=await axios.get(`${process.env.REACT_APP_URL}/latest.json?app_id=${process.env.REACT_APP_API_KEY}`);
            const rates= result.data.rates;
            const base=quantity/result.data.rates[coin];
            copy.map(quote=>{
                quote.quotation=rates[quote.coin]*base;
                return quote; 
            });
            const quote={
                coin,quantity,quotations:copy
            }
            dispatch({  
                type:MAKE_QUOTATION,
                payload:quote
            })
        } catch (error) {
            console.log(error)
        }
    }
    const setQuotation=selectedQuotation=>{
        if(selectedQuotation){
            const quote={
                coin:selectedQuotation.coin,
                quantity:selectedQuotation.quantity,
                quotations:selectedQuotation.quotations
            }
            dispatch({  
                type:MAKE_QUOTATION,
                payload:quote
            })
            clearQuotation();}
    }
    const getStoragedQuotations= ()=>{
        let quotations=[];
        if(localStorage.getItem('quotations')){
          quotations=JSON.parse(localStorage.getItem('quotations'));}
        dispatch({
            type:GET_QUOTATIONS,
            payload:quotations
        });
    }
    const storeQuotation=(coin,quantity,quotations)=>{
        const quotate={
            quantity,
            coin,
            quotations,
            id:uuidV4()
        }        
        dispatch({
            type:STORE_QUOTATION,
            payload:quotate
        });   
    }

    const deleteQuotation=id=>{
        dispatch({
            type:DELETE_QUOTATION,
            payload:id
        });
    }

    const viewQuotation=id=>{
        dispatch({
            type:VIEW_QUOTATION,
            payload:id
        });
    }

    const clearQuotation=()=>{
        dispatch({
            type:CLEAR_QUOTATION
        });
    }

    const otherQuotation=quotation=>{
        dispatch({
            type:OTHER_QUOTATION,
            payload:quotation
        })

    }
    // effect -localstorage
    useEffect(() => {
        if(state.storageQuotations && state.storageQuotations.length>0){
            localStorage.setItem('quotations',JSON.stringify(state.storageQuotations));
        }else{
            localStorage.setItem('quotations',JSON.stringify(''));
        }
        
    }, [state.storageQuotations])
    return ( 
        <QuotationContext.Provider
        value={{
            storageQuotations:state.storageQuotations,
            selectedQuotation:state.selectedQuotation,
            coin:state.coin,
            quantity:state.quantity,
            quotations:state.quotations,
            change:state.change,
            getStoragedQuotations,
            storeQuotation,
            deleteQuotation,
            viewQuotation,
            clearQuotation,
            setQuotation,
            makeQuotation,
            otherQuotation
        }}>
         {props.children}   
        </QuotationContext.Provider>
     );
}
 
export default QuotationState;