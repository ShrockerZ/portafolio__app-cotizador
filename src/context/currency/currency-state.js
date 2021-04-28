import React,{useReducer,useEffect} from 'react';
import { GET_CURRENCY } from '../../types';
import CurrencyContext from './currency-context';
import CurrencyReducer from "./currency-reducer";
import axios from "axios";


const CurrencyState = props => {
    // get currencies
    const initialState={
        currencies:[]
    }
    const [state, dispatch] = useReducer(CurrencyReducer, initialState)
    const getAllCurrencies=async ()=>{
        try {
            const result=await axios.get(`${process.env.REACT_APP_URL}/currencies.json`);
            const arreglo= []
            Object.keys(result.data).forEach(llave=>{
                const currency= {
                    coin:llave,
                    name:result.data[llave]
                }
                arreglo.push(currency);
            });
            dispatch({
                type:   GET_CURRENCY,
                payload:arreglo
            });  
        } catch (error) {
            console.log(error)
        }

    }
    // effect 
    useEffect(() => {
        getAllCurrencies();
    }, [])
    return ( 
        <CurrencyContext.Provider
        value={{
            currencies:state.currencies,
        }}>
            {props.children}
        </CurrencyContext.Provider>
     );
}
 
export default CurrencyState;