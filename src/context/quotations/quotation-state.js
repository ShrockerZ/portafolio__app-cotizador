// use of local storage to keeep quotation
import axios from 'axios';
import { clone } from "lodash";
import React,{useReducer,useContext} from 'react';
import {MAKE_QUOTATION} from '../../types';
import LocalStorageContext from '../localstorage/localstorage-context';
import QuotationContext from './quotation-context';
import QuotationReducer from './quotation-reducer';



const QuotationState = props => {
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
    };
    // obetener todas las cotizaciones del LocalStorage
    const [state, dispatch] = useReducer(QuotationReducer, initialState)
    const {selectedQuotation,clearQuotation}= useContext(LocalStorageContext);
    // reqlizar cotizacion al cambiar numbero 
    const makeQuotation=async (form,quotations)=>{
        const other=clone(quotations);
        try {
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
                clearQuotation();
                return
            }
            const {coin,quantity}= form;
            const result=await axios.get(`${process.env.REACT_APP_URL}/latest.json?app_id=${process.env.REACT_APP_API_KEY}`);
            const rates= result.data.rates;
            const base=quantity/result.data.rates[coin];
            other.map(quote=>{
                quote.quotation=rates[quote.coin]*base;
                return quote;
            });
            const quote={
                coin,quantity,quotations:other
            }
            dispatch({  
                type:MAKE_QUOTATION,
                payload:quote
            })
        } catch (error) {
            console.log(error)
        }
    }
    return ( 
        <QuotationContext.Provider
        value={{
            coin:state.coin,
            quantity:state.quantity,
            quotations:state.quotations,
            selectedQuotation:state.selectedQuotation,
            makeQuotation
        }}>
         {props.children}   
        </QuotationContext.Provider>
     );
}
 
export default QuotationState;