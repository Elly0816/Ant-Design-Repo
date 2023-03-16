import {Fragment, ReactElement, useState, useEffect} from 'react';
import Header from './components/Header/Header'
import Home from './views/Home/Home';
import { latest, symbol } from './api/routes';


export default function App(): ReactElement{

  const [result, setResult] = useState<string>();
  const [toRun, settoRun] = useState<boolean>(true);

  useEffect(() => {
    if (toRun){
        symbol()
        .then(res => {
          setResult(res);
          console.log(JSON.parse(JSON.stringify(res)).symbols);
          settoRun(false);
        })
      }
}, []);


  return (<Fragment>
      <Header/>
      <Home/>
  </Fragment>)
}