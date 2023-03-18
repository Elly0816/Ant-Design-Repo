import "./Button.css";
import { COUNTRIES } from "../../helpers/countries";
import { ReactElement, useState, useEffect, CSSProperties } from 'react';
import { MenuProps, Select } from 'antd';
import { Space, SelectProps } from 'antd';

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


const newItems: SelectProps[] = COUNTRIES.reduce((arr:SelectProps[] , country: COUNTRY) => {
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
            <img src={`https://flagsapi.com/${countryCode}/shiny/16.png`} alt={country.currency.name} />
            <span>{country.currency.code} {country.currency.symbol}</span>
          </div>
        ),
        // value: `${country.currency.code} - ${countryName}`
      });
    }
    return arr;
  }, []);

const dropDownStyle: CSSProperties = {
    maxHeight: '10em',
    height: '10em',
    overflowY: "auto"
}

interface buttonType {
    id: string,
    label: JSX.Element,
    title: string
}

export default function myButton(): ReactElement {
    
    const [countries, setCountries] = useState<SelectProps[]>(newItems);
    
    return <Space wrap>
    <Select
      showSearch={true}
      defaultValue={{ label: countries[0].value, value: countries[0].id }}
      style={{ width: 120 }}
      options={countries.map((item) => ({
        label: item.value,
        value: item.id,
      }))}
      labelInValue={true}
    />
  </Space>
};