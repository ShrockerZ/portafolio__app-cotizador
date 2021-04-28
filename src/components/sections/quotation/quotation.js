import React, { useContext,useEffect } from 'react'
import CurrencyContext from '../../../context/currency/currency-context';
import LocalStorageContext from '../../../context/localstorage/localstorage-context';
import QuotationContext from '../../../context/quotations/quotation-context';
import "./quotation.css"

export const Quotation = () => {
    const {quotations,coin,quantity}= useContext(QuotationContext);
    const {storeQuotation,selectedQuotation}= useContext(LocalStorageContext);
    const {currencies}= useContext(CurrencyContext);
    
    // obhtener el valor de texto 
    const getName= text=>{
        let result;
        currencies.forEach(currency=>{
            if(currency.coin===text){
                result=currency.name
            }
        });
        return result;
    };
    useEffect(() => {
    }, [selectedQuotation])


    
    return (
        <section className="quotation">
            <h1 className="title red">Cotizar a:</h1>
            <div className="quotation-container">
                {
                    quotations.map(quotationValue=>(
                    <div className="quotation-element" key={quotationValue.coin}>
                    <p>
                        {quotationValue.coin}&nbsp;
                        <small>
                            {quotationValue.quotation.toFixed(5)}
                        </small>
                        
                    </p> 
                    <small className="quotation-text">{getName(quotationValue.coin)}</small>
                    </div>
                ))}
            </div>
            <button className="big-button center"
            onClick={()=>{storeQuotation(coin,quantity,quotations)}}>guardar</button>
        </section>
    )
}
