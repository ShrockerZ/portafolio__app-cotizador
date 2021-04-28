import React,{useReducer,useEffect} from 'react';
import LocalStorageContext from './localstorage-context';
import LocalStorageReducer from './localstorage-reducer';
import {v4 as uuidV4} from "uuid"
import { GET_QUOTATIONS, STORE_QUOTATION,DELETE_QUOTATION,VIEW_QUOTATION,
        CLEAR_QUOTATION} from "../../types";


const LocalStorageState = props => {
    const initialState={
        storageQuotations:[],
        selectedQuotation:null
    }
    const [state, dispatch] = useReducer(LocalStorageReducer, initialState)
    // recurepar valores en local storage
    const allStorageQuotation= ()=>{
        let quotations=[];
        if(localStorage.getItem('quotations')){
          quotations=JSON.parse(localStorage.getItem('quotations'));}
        dispatch({
            type:GET_QUOTATIONS,
            payload:quotations
        });
    }
    // almacenar valores en local storage
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
    // borrar una cotizacion 
    const deleteQuotation=id=>{
        dispatch({
            type:DELETE_QUOTATION,
            payload:id
        });
    }
    // ver una cotizcion 
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
    useEffect(() => {
        if(state.storageQuotations && state.storageQuotations.length>0){
            localStorage.setItem('quotations',JSON.stringify(state.storageQuotations));
        }else{
            localStorage.setItem('quotations',JSON.stringify('[]'));
        }
    }, [state.storageQuotations])
    return ( 
        <LocalStorageContext.Provider
        value={{
            storageQuotations:state.storageQuotations,
            selectedQuotation:state.selectedQuotation,
            allStorageQuotation,
            storeQuotation,
            deleteQuotation,
            viewQuotation,
            clearQuotation
        }}>
            {props.children}
        </LocalStorageContext.Provider>
     );
}
 
export default LocalStorageState;