import React,{useReducer,useEffect} from 'react';
import { GET_CURRENCY } from '../../types';
import CurrencyContext from './currency-context';
import CurrencyReducer from "./currency-reducer";
import axios from "axios";


const CurrencyState = props => {
    const initialState={
        currencies:[]
    }
    //  dispatch
    const [state, dispatch] = useReducer(CurrencyReducer, initialState)
    //  functions
    const getAllCurrencies=async ()=>{
        try {
            const result=await axios.get(`${process.env.REACT_APP_URL}/currencies.json`);
            const array= []
            Object.keys(result.data).forEach(key=>{
                const currency= {
                    coin:key,
                    name:result.data[key]}
                array.push(currency);
            });
            dispatch({
                type: GET_CURRENCY,
                payload:array
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
            currencies:state.currencies}}>
            {props.children}
        </CurrencyContext.Provider>
     );
}
 
export default CurrencyState;