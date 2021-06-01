import React, { useContext,useEffect,useState } from 'react'
import CurrencyContext from '../../../context/currency/currency-context';
import QuotationContext from '../../../context/quotations/quotation-context';
import "./quotation.css"

export const Quotation = () => {
    const {quotations,coin,quantity,storeQuotation,otherQuotation
            ,makeQuotation,change}= useContext(QuotationContext);
    const {currencies}= useContext(CurrencyContext);
    const [select,setSelect]=useState({
        number:0,
        visible:false
    })
    // local functions
    const getName= text=>{
        let result;
        currencies.forEach(currency=>{
            if(currency.coin===text){
                result=currency.name}
        });
        return result;
    };
    const showSelect=(idQuotation)=>{
        setSelect({number:idQuotation,visible:true});
    }
    const closeSelect=(idQuotation)=>{
        setSelect({number:idQuotation,visible:false});
    }
    const changeSelect=(id,{target})=>{
        const newQuotation={
            id,
            coin:target.value,
            quotation:0}
        otherQuotation(newQuotation);
        closeSelect(id);
    }
    // effect
    useEffect(() => {
        if(change){
            makeQuotation({coin,quantity},quotations);
        }
    // eslint-disable-next-line
    }, [quotations])
    return (
        <section className="quotation">
            <h1 className="title red">Cotizar a:</h1>
            <div className="quotation-container">
                {
                    quotations.map(quotationValue=>(
                    <div className="quotation-element" key={quotationValue.id}>
                    <p>
                        {quotationValue.coin}&nbsp;
                        <small>
                            {quotationValue.quotation.toFixed(5)}
                        </small>  
                    </p> 
                    <small className="quotation-text">{getName(quotationValue.coin)}</small>
                    <button 
                        className="quotation-edit-button"
                        onClick={()=>{showSelect(quotationValue.id)}}>
                                <i className="fa fa-edit"></i></button>
                    {/* select coin */}
                    {select.visible===true && select.number===quotationValue.id?
                        <div className="quoataion-edit">
                            <button className="close"
                            onClick={()=>{closeSelect(quotationValue.id)}}>&times;</button>
                            <select 
                                onChange={e=>{changeSelect(quotationValue.id,e)}}
                                className="quotation-edit-select">
                                {currencies.length>0?
                                    currencies.map(currency=>(
                                        <option key={currency.coin}
                                        value={currency.coin}
                                        >{currency.coin} - {currency.name}</option>
                                    ))
                                :<option>No existen opciones</option>}
                            </select>
                        </div>
                    :null}

                    </div>
                    
                ))}
            </div>
            <button className="big-button center"
            onClick={()=>{storeQuotation(coin,quantity,quotations)}}>guardar</button>
        </section>
    )
}
