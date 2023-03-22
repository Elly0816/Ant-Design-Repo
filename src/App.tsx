import {Fragment, ReactElement, useState, useEffect, createContext, useMemo, Suspense, lazy} from 'react';
import { COUNTRIES } from './helpers/countries';
import { SelectProps } from 'antd';
import { getTableData, tableData } from './helpers/getTableData';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { addedNotification, removedNotification } from './components/Notification/Notification';
import Loading from './components/Loading/Loading';
import Error from './components/Error/Error';


const Home = lazy(() => import('./views/Home/Home'));
const Favs = lazy(() => import('./views/Favs/Favourites'));
// const Error = lazy(() => import('./components/Error/Error'));



// const router = createBrowserRouter([
//   {
//     path: "/", 
//     element: <Home/>,
//     errorElement: <Error/>
//     Suspense: <Suspense/>
//   },
//   {
//     path: "/favorites",
//     element: <Favs/>,
//     errorElement: <Error/>
//   }
// ])


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
  const [favorites, setFavorites] = useState<Array<string>>([]);
  const [favData, setFavData] = useState<DataType[] | undefined>();

useEffect(() => {
    setLoading(true);
    const symbol: string | undefined = defValue.value;
    let oldData = localStorage.getItem('data');
    getFavorites(); //Gets the 
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
  /*
    This gets the data by calling the function below
    The response of the function is mapped to the DataType type for use in the whole app
  */
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
      
    }
      ).then(ans => setLoading(false));
}


function editFavorites(currencyCode: string): void{
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
};


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

function getFavData(): void{
  /*
    This sets the favData state to items in the data that are also in the favorite state
  */
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
    <appContext.Provider value={{getData, favData, getFavData, favorites, editFavorites, view, setView, countriesToShow, defValue, setDefValue, data, loading, setLoading}}>
      <Fragment>
            <Router>
              <Suspense fallback={<Loading/>}>
                <Routes>
                  <Route path='/' Component={Home} errorElement={<Error/>}/>
                  <Route path='/favorites' Component={Favs} errorElement={<Error/>}/>
                </Routes>
              </Suspense>
            </Router>
      </Fragment>
    </appContext.Provider>
      )
}


 export const appContext: any = createContext(null);