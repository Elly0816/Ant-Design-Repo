import {Fragment, ReactElement, useState, useEffect} from 'react';
import Header from './components/Header/Header'
import Home from './views/Home/Home';
import { latest, convert, timeSeries, fluct } from './api/exchange';
import { COUNTRIES } from './helpers/countries';
import { RATES } from './helpers/currencies';


export default function App(): ReactElement{

  const [result, setResult] = useState<string>();
  const [toRun, settoRun] = useState<boolean>(true);

  useEffect(() => {
    // if (toRun){
    //   let availableRates: Object[] = []
    //   for (let country of COUNTRIES){
    //     if (country.currency.code in RATES){
    //       availableRates.push(country);
    //     }
    //   }
    //   console.log(availableRates);
    // }
  }, []);


  return (<Fragment>
      <Header/>
      <Home/>
  </Fragment>)
}