import {Fragment, ReactElement, useState, useEffect, createContext, useMemo, useCallback} from 'react';
import Header from './components/Header/Header'
import Home from './views/Home/Home';
import Favs from './views/Favs/Favourites';
import { COUNTRIES } from './helpers/countries';
import { RATES } from './helpers/currencies';
import { SelectProps } from 'antd';
import { getTableData, tableData } from './helpers/getTableData';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { addedNotification, removedNotification } from './components/Notification/Notification';


const router = createBrowserRouter([
  {
    path: "/", 
    element: <Home/>
  },
  {
    path: "/favorites",
    element: <Favs/>
  }
])


interface COUNTRY {
  "name": string,
  "code": string,
  "capital": string,
  "region": string,
  "currency": {
      "code": string,
      "name": string,
      "symbol": string
  },
  "language": {
      "iso639_2"?: string,
      "code": string,
      "name": string,
      "nativeName"?: string
  },
  "flag": string
}

interface DataType {
  key: string;
  name: {
    countryCode: string,
    currencySymbol: string,
    currencyCode: string,
    currencyName: string
};
  rate: number;
  '24 hour change': number;
  '7 day change': number;
  '1 month change': number;
  '1 year change': number
}


function reduceCountries(countries: COUNTRY[]): SelectProps[]{

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
  const [favorites, setFavorites] = useState<Array<string>>([]);
  const [favData, setFavData] = useState<DataType[] | undefined>();

useEffect(() => {
    const symbol: string | undefined = defValue.value;
    let oldData = localStorage.getItem('data');
    getFavorites();
    if (!oldData || (oldData && !(symbol as string in JSON.parse(oldData)))){
      getData(symbol as string);
    } else {
      setData(JSON.parse(oldData as string)[symbol as string].filter((item: DataType) => item.name.currencyCode !== defValue.value));
      let timer = setTimeout(() => {
        setLoading(false);    
      }, 1500);
      return () => clearTimeout(timer);
    }
}, [defValue]);



useEffect(()=> {
  getFavData();
}, [favorites]);

function getData(symbol: string): void{
  getTableData(symbol as string).then((res: tableData[]) =>
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
      );
}


function editFavorites(currencyCode: string): void{
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
};


function getFavorites(): void{
  let favsFromStorage: string | null | {codes: string} = localStorage.getItem('favorites');
  if (favsFromStorage){
    console.log(favsFromStorage);
    let favorites: {codes: string[]} = JSON.parse(favsFromStorage);
    // const favCurr = data?.filter(item => {
    //   favorites.codes.includes(item.name.currencyCode)
    // })
    setFavorites(favorites.codes);
  } else {
    setFavorites([]);
  }
}

function getFavData(): void{
  setLoading(true);
  const favs = data?.filter(item => {
    if (favorites.includes(item.name.currencyCode)){
      return item;
    }
  });
  console.log('THis is in favData');
  let favData: DataType[] =  favs as DataType[];
  console.log(favData);
  setFavData(favData);
  setLoading(false);
}




  return (
    <appContext.Provider value={{favData, getFavData, favorites, editFavorites, view, setView, countriesToShow, defValue, setDefValue, data, loading, setLoading}}>
      <Fragment>
          {/* <Header/> */}
          <RouterProvider router={router}/>
          {/* <Home/> */}
      </Fragment>
    </appContext.Provider>
      )
}


 export const appContext: any = createContext(null);