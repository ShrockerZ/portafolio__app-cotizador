import React,{useContext,useEffect} from 'react'
import QuotationContext from '../../../context/quotations/quotation-context';
import "./historia.css"

export const Historia = () => {
    const {storageQuotations,getStoragedQuotations,deleteQuotation,viewQuotation}=useContext(QuotationContext);
    const textHistory=quotations=>{
        let text=""
        quotations.forEach(quotation=>{
            text+= `${quotation.coin}|`
        })
        return text;
    }
    useEffect(() => {
        getStoragedQuotations();
    }, [])
    return (
        <section className="historia">
            <div className="historia-container">
                <div className="historia-title">
                    <p>Historico</p>
                </div>
                <div className="historia-data">
                    {storageQuotations || storageQuotations.length>0?
                        storageQuotations.map(quotes=>(
                        <div className="historia-element" 
                            key={quotes.id} >
                        <button className="close"
                            onClick={()=>{deleteQuotation(quotes.id)}}>&times;</button>
                        <p>
                            {quotes.coin+'|'+quotes.quantity+
                            '-->'+textHistory(quotes.quotations)}</p>
                        <button className="button"
                            onClick={()=>{viewQuotation(quotes.id)}}>Ver</button>
                        </div>
                    )):
                    <p>No existen elementos</p>}
                </div>
            </div>
        </section>
    )
}
