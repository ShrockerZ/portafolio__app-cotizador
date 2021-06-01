import React, { Fragment } from 'react';
import CurrencyState from './context/currency/currency-state';
import QuotationState from './context/quotations/quotation-state';
import { Form } from './components/sections/form/form';
import { Historia } from './components/sections/historia/historia';
import { Quotation } from './components/sections/quotation/quotation';
import Header from './components/header';
import Footer from './components/footer';

function App() {
  return (
    <Fragment>
          <CurrencyState>
            <QuotationState >
                <Header />
                  <Form />
                  <Quotation />
                  <Historia />
                <Footer />
            </QuotationState>
          </CurrencyState>
    </Fragment>)}
export default App;
