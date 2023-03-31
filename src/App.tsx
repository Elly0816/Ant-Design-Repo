import {Fragment, ReactElement, useState, useEffect, createContext, useMemo, Suspense, lazy, useCallback} from 'react';
import {type COUNTRY,  COUNTRIES } from './helpers/countries';
import { type SelectProps } from 'antd';
import { getTableData, tableData } from './helpers/getTableData';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { addedNotification, removedNotification } from './components/Notification/Notification';
import Loading from './components/Loading/Loading';
import Error from './components/Error/Error';
import { type DataType } from './components/Tables/Helpers/Table.Utilities';
import Home from './views/Home/Home';
import Favs from './views/Favs/Favourites'



function reduceCountries(countries: COUNTRY[]): SelectProps[]{
/*
  This converts the array of country details to an array of 
  SelectProps
*/
  const newItem: SelectProps[] = countries.reduce((arr:SelectProps[] , country: COUNTRY) => {
    if (!arr.some(item => item?.id === country.currency.code)) {
      let countryCode: string;
      let countryName: string;
  
      switch (country.currency.code) {
        case 'EUR':
            countryCode = 'EU'
            countryName = 'European Euro'
            break;
        case 'USD':
            countryCode = 'US'
            countryName = 'United States Dollar'
            break;
      
        default:
            countryCode = country.code;
            countryName = country.currency.name;
            break;
      }
  
      arr.push({
        id: country.currency.code,
        value: (
          <div title={countryName}>
            <img src={`https://flagsapi.com/${countryCode}/shiny/16.png`} alt={country.currency.symbol} />
            <span>{country.currency.code} {country.currency.symbol}</span>
          </div>
        ),
        // value: `${country.currency.code} - ${countryName}`
      });
    }
    return arr;
  }, []);
  return newItem;
}



export default function App(): ReactElement{

  const [countries, setCountries] = useState<COUNTRY[]>(COUNTRIES);
  const countriesToShow = useMemo(() => reduceCountries(countries), [countries]);
  const [defValue, setDefValue] = useState<{label: string, value: string|undefined}>({ label: countriesToShow[0].value, value: countriesToShow[0].id });

  const [data, setData] = useState<DataType[] | undefined>();

  const [loading, setLoading] = useState<boolean>(true);

 
  
  const[view, setView] = useState<'currencies' | 'favorites'>('currencies');
  const [favorites, setFavorites] = useState<Array<string>>([]); //Gotten from local storage
  const [favData, setFavData] = useState<DataType[] | undefined>();

useEffect(() => {
    setLoading(true);
    const symbol: string | undefined = defValue.value;
    let oldData = localStorage.getItem('data');
    getFavorites(); //Gets the 
    if (!oldData || (oldData && !(symbol as string in JSON.parse(oldData)))){
      getData(symbol as string);
    } else {
      //Ensures that the base currency does not appear in the list of rates
      setData(JSON.parse(oldData as string)[symbol as string].filter((item: DataType) => item.name.currencyCode !== defValue.value));
      let timer = setTimeout(() => {
        setLoading(false);    
        clearTimeout(timer);
      }, 1500);
      return () => {
        // latestController.abort();
        // fluctController.abort();
      };
    }
}, [defValue]);



useEffect(()=> {
  getFavData();
}, [favorites]);



const getData = useCallback((symbol: string) => {
  setLoading(true);
  const controller = new AbortController();
  const signal = controller.signal;
  getTableData(symbol as string, signal).then((res: tableData[]) =>
        {
          let newData: DataType[] = res.map((data: tableData, index: number) => ({
          key: index.toString(),
          name: {
            countryCode: data.name.countryCode,
            currencyCode: data.name.currencyCode,
            currencyName: data.name.currencyName,
            currencySymbol: data.name.currencySymbol
          },
          rate: data.rates,
          '24 hour change': data.hours24Diff,
          '7 day change': data.weekDiff,
          '1 month change': data.monthDiff,
          '1 year change': data.yearDiff,
      }));
      setData(newData.filter(item => item.name.currencyCode !== defValue.value));
      localStorage.setItem('data', JSON.stringify({[symbol as string]: newData}));
      setLoading(false);
    }
)}, [defValue]);


const editFavorites = useCallback((currencyCode: string) => {
  /*
    This adds and removes the country code to the local storage.
    This also updates the favorite state by calling getFavorites()
  */
    let favoritesString = localStorage.getItem("favorites");
    if (favoritesString) {
      let favorites = JSON.parse(favoritesString);
      let codes: string[] = favorites.codes;
      let code = codes.filter((code: string) => code === currencyCode)[0];
      if (code){
        codes = codes.filter(item => item.indexOf(code) === -1);
        removedNotification(currencyCode);
      } else {
        codes.push(currencyCode);
        addedNotification(currencyCode)
      }
      localStorage.setItem('favorites', JSON.stringify({'codes': codes}));
    } else {
      let codes = [currencyCode];
      localStorage.setItem('favorites', JSON.stringify({'codes': codes}));
    }
    getFavorites();
}, []);


function getFavorites(): void{

  /*
    Sets the favorite state to an array of strings
    The array of string is gotten fron the local storage
    If there are no favorites in the local storage, the favorites is set to an empty array
  
  */
  let favsFromStorage: string | null | {codes: string} = localStorage.getItem('favorites');
  if (favsFromStorage){
    console.log(favsFromStorage);
    let favorites: {codes: string[]} = JSON.parse(favsFromStorage);
    setFavorites(favorites.codes);
  } else {
    setFavorites([]);
  }
}



const getFavData = useCallback(() => {
  /*
    This sets the favData state to items in the data that are also in the favorite state
  */
    // setLoading(true);
    const favs = data?.filter(item => {
      if (favorites.includes(item.name.currencyCode)){
        return item;
      }
    });
    console.log('THis is in favData');
    let favData: DataType[] =  favs as DataType[];
    console.log(favData);
    setFavData(favData);
    // let timer = setTimeout(()=> {
    //   setLoading(false);
    //   clearTimeout(timer);
    // }, 1000);
}, [data, favorites])




  return (
    <appContext.Provider value={{getData, favData, getFavData, favorites, editFavorites, view, setView, countriesToShow, defValue, setDefValue, data, loading, setLoading}}>
      <Fragment>
            <Router>
                <Routes>
                  <Route path='/' Component={Home}/>
                  <Route path='/favorites' Component={Favs}/>
                  <Route path='*' Component={Error}/>
                </Routes>
            </Router>
      </Fragment>
    </appContext.Provider>
      )
}


 export const appContext: any = createContext(null);