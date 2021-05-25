import React,{useContext,useState,useEffect} from 'react'
import CurrencyContext from '../../../context/currency/currency-context';
import QuotationContext from '../../../context/quotations/quotation-context'
import "./form.css"

export const Form = () => {
    const {makeQuotation,quotations,setQuotation,selectedQuotation}=useContext(QuotationContext);
    const {currencies}=useContext(CurrencyContext);
    // state + valores por defecto 
    const [formQuotation, setFormQuotation] = useState({
            quantity:"100",
            coin:"GTQ"})
    // functions
    const onChangeForm=e=>{
        setFormQuotation({...formQuotation,[e.target.name]:e.target.value});
    }

    const {quantity,coin}=formQuotation;
    // effects
    useEffect(() => {
        if(selectedQuotation){
            setFormQuotation({
                quantity:selectedQuotation.quantity,
                coin:selectedQuotation.coin});
            setQuotation(selectedQuotation);
        }
    },[selectedQuotation,setQuotation]);

    useEffect(()=>{
        if(coin.trim().length>0){
            makeQuotation(formQuotation,quotations);
        }
    // eslint-disable-next-line
    },[quantity,coin,formQuotation]);
    return (
        <form className="form" >
            <div className="form-content">
                <label 
                    htmlFor="quantity">cantidad:</label>
                <input  type="number" name="quantity" 
                        id="quantity" value={quantity} 
                        placeholder="escriba un valor" onChange={onChangeForm}/>
                <div>
                    <label 
                        htmlFor="coin">moneda de origen:</label>
                    <select 
                        name="coin" id="coin" 
                        value={coin} onChange={onChangeForm}>
                        { currencies.length>0?
                                currencies.map(currency=>(
                                    <option key={currency.coin}
                                            value={currency.coin}
                                    >{currency.coin} - {currency.name}</option>
                                ))
                            :<option>No existen opciones</option>
                        }
                    </select>
                </div>
            </div>
        </form>
    )
}
