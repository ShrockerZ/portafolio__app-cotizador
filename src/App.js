import React, { Fragment } from 'react';
import CurrencyState from './context/currency/currency-state';
import LocalStorageState from './context/localstorage/localstorage-state';
import QuotationState from './context/quotations/quotation-state';
import { Form } from './components/sections/form/form';
import { Historia } from './components/sections/historia/historia';
import { Quotation } from './components/sections/quotation/quotation';

function App() {
  return (
    <Fragment>
        <LocalStorageState>
          <CurrencyState>
            <QuotationState >
                <h1 className="title">COTIZADO MONEDAS Y DIVISAS</h1>
              <Form />
              <Quotation />
              <Historia />
            </QuotationState>
          </CurrencyState>
        </LocalStorageState>
    </Fragment>)}
export default App;
