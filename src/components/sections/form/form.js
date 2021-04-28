import React,{useContext,useState,useEffect} from 'react'
import CurrencyContext from '../../../context/currency/currency-context';
import LocalStorageContext from '../../../context/localstorage/localstorage-context';
import QuotationContext from '../../../context/quotations/quotation-context'
import "./form.css"

export const Form = () => {
    const {makeQuotation,quotations}=useContext(QuotationContext);
    const {currencies}=useContext(CurrencyContext);
    const {selectedQuotation,storageQuotations}= useContext(LocalStorageContext); 
    // state + valores por defecto 
    const [formQuotation, setFormQuotation] = useState({
            quantity:"100",coin:"GTQ"})
    // functions
    const onChangeForm=e=>{
        setFormQuotation({...formQuotation,[e.target.name]:e.target.value});
    }
    const onSubmitForm=e=>{
        e.preventDefault();
        makeQuotation(formQuotation,quotations);
    }
    const {quantity,coin}=formQuotation;
    useEffect(() => {
        if(selectedQuotation){
            setFormQuotation({
                quantity:selectedQuotation.quantity,
                coin:selectedQuotation.coin});
            makeQuotation(formQuotation,selectedQuotation.quotations);
        }
    },[selectedQuotation])

    return (
        <form className="form" 
            onSubmit={onSubmitForm}>
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
                <input type="submit"  className="big-button" value="cotizar"/>
            </div>
        </form>
    )
}
