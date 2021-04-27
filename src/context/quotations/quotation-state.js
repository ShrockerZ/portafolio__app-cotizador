// use of local storage to keeep quotation
import axios from 'axios';
import React,{useReducer} from 'react';
import {    MAKE_QUOTATION,
            SET_QUOTATION,
            GET_QUOTATIONS,
            STORE_QUOTATION
         } from '../../types';
import QuotationContext from './quotation-context';
import QuotationReducer from './quotation-reducer';


const QuotationState = props => {
    const initialState={
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
        storageQuotations:[]
    };
    // obetener todas las cotizaciones del LocalStorage
    const [state, dispatch] = useReducer(QuotationReducer, initialState)
    const allQuotationStorage= ()=>{
        dispatch({
            type:GET_QUOTATIONS
        });
    }
    // reqlizar cotizacion al cambiar numbero 
    const makeQuotation=async (form,quotations)=>{
        try {
            const {coin,quantity}= form;
            const result=await axios.get(`${process.env.REACT_APP_URL}/latest.json?app_id=${process.env.REACT_APP_API_KEY}`);
            const rates= result.data.rates;
            const base=quantity/result.data.rates[coin];
            quotations.map(quote=>{
                quote.quotation=rates[quote.coin]*base;
                return quote;
            });
            console.log(quotations)
            const quote={
                coin,quantity,quotations
            }
            dispatch({  
                type:MAKE_QUOTATION,
                payload:quote
            })
        } catch (error) {
            console.log(error)
        }
    }
    // setear valors para la cotizacion diferente
    const setQuotation=(quotations)=>{
        dispatch({  
            type:SET_QUOTATION,
            payload:quotations
        })
    }
    const storeQuotation=(quotation)=>{
        dispatch({
            type:STORE_QUOTATION,
            payload:quotation
        });
        localStorage.setItem('quotations',JSON.stringify(state.storageQuotations));
    }

    
    return ( 
        <QuotationContext.Provider
        value={{
            quotations:state.quotations,
            quotationsChange:state.quotationsChange,
            storageQuotations:state.storageQuotations,
            allQuotationStorage,
            makeQuotation,
            setQuotation,
            storeQuotation
        }}>
         {props.children}   
        </QuotationContext.Provider>
     );
}
 
export default QuotationState;