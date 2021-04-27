import React,{useContext} from 'react'
import QuotationContext from '../../../context/quotations/quotation-context';
import "./historia.css"

export const Historia = () => {
    const {storageQuotations}= useContext(QuotationContext);
    
    const textHistory=quotations=>{
        let text=""
        quotations.forEach(quotation=>{
            text+= `${quotation.coin}|`
        })
        return text;
    }


    return (
        <section className="historia">
            <div className="historia-container">
                <div className="historia-title">
                    <p >Historico</p>
                </div>
                <div className="historia-data">
                    {storageQuotations.map(quotations=>(
                        <div className="historia-element" >
                        <button className="close">&times;</button>
                        <p>{textHistory(quotations)}</p>
                        <button className="button">Ver</button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
