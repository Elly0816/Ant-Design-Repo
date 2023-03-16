import {Fragment, ReactElement} from 'react';
import Header from './components/Header/Header'
import Home from './views/Home/Home';



export default function App(): ReactElement{



  return (<Fragment>
      <Header/>
      <Home/>
  </Fragment>)
}