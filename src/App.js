import React, { Fragment } from 'react';
import { Form } from './components/sections/form/form';
import { Historia } from './components/sections/historia/historia';
import { Quotation } from './components/sections/quotation/quotation';
import CurrencyState from './context/currency/currency-state';
import QuotationState from './context/quotations/quotation-state';

function App() {
  return (
    <Fragment>
      <CurrencyState>
      <QuotationState >
          <h1 className="title">COTIZADO DE DIVISAS</h1>
        <Form />
        <Quotation />
        <Historia />
      </QuotationState>
      </CurrencyState>
    </Fragment>)}

export default App;
