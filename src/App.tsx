import {Fragment, ReactElement, useState, useEffect, createContext, useMemo, useCallback} from 'react';
import Header from './components/Header/Header'
import Home from './views/Home/Home';
import { COUNTRIES } from './helpers/countries';
import { RATES } from './helpers/currencies';
import { SelectProps } from 'antd';
import { getTableData, tableData } from './helpers/getTableData';


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
  flag: ReactElement
  name: string;
  rate: number;
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
            countryCode = 'USA'
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

useEffect(() => {
    const symbol: string | undefined = defValue.value;
    getTableData(symbol as string).then((res: tableData[]) =>
        setData(
            res.map((data: tableData, index: number) => ({
                key: index.toString(),
                flag: (
                    <img
                        src={`https://flagsapi.com/:${data.name}/:shiny/:16.png`}
                    />
                ),
                name: data.name,
                rate: data.rates,
                '7 day change': data.weekDiff,
                '1 month change': data.monthDiff,
                '1 year change': data.yearDiff,
            }))
        )
    );
}, [defValue]);


  return (
    <appContext.Provider value={{countriesToShow, defValue, setDefValue, data}}>
      <Fragment>
          <Header/>
          <Home/>
      </Fragment>
    </appContext.Provider>
      )
}


 export const appContext: any = createContext(null);