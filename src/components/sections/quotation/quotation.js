import React, { useContext } from 'react'
import CurrencyContext from '../../../context/currency/currency-context';
import QuotationContext from '../../../context/quotations/quotation-context';
import "./quotation.css"

export const Quotation = () => {
    const {quotations,storeQuotation}= useContext(QuotationContext);
    const {currencies}= useContext(CurrencyContext);
    
    const getValue= text=>{
        let result;
        currencies.forEach(currency=>{
            if(currency.coin===text){
                result=currency.name
            }
        });
        return result;
    }
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
                    <small className="quotation-text">{getValue(quotationValue.coin)}</small>
                    </div>
                ))}
            </div>
            <button className="big-button center"
            onClick={()=>{storeQuotation(quotations)}}>guardar</button>
        </section>
    )
}
