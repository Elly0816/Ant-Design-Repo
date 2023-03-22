import "./Button.css";
import { COUNTRIES } from "../../helpers/countries";
import { ReactElement, useState, useEffect, CSSProperties, useContext } from 'react';
import { MenuProps, Select } from 'antd';
import { Space, SelectProps } from 'antd';
import { appContext } from "../../App";

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


// const newItems: SelectProps[] = COUNTRIES.reduce((arr:SelectProps[] , country: COUNTRY) => {
//     if (!arr.some(item => item?.id === country.currency.code)) {
//       let countryCode: string;
//       let countryName: string;

//       switch (country.currency.code) {
//         case 'EUR':
//             countryCode = 'EU'
//             countryName = 'European Euro'
//             break;
//         case 'USD':
//             countryCode = 'USA'
//             countryName = 'United States Dollar'
//             break;
      
//         default:
//             countryCode = country.code;
//             countryName = country.currency.name;
//             break;
//       }
  
//       arr.push({
//         id: country.currency.code,
//         value: (
//           <div title={countryName}>
//             <img src={`https://flagsapi.com/${countryCode}/shiny/16.png`} alt={country.currency.symbol} />
//             <span>{country.currency.code} {country.currency.symbol}</span>
//           </div>
//         ),
//         // value: `${country.currency.code} - ${countryName}`
//       });
//     }
//     return arr;
//   }, []);

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
    
    // const [countries, setCountries] = useState<SelectProps[]>(newItems);
    const {countriesToShow, defValue, setDefValue}:  {countriesToShow: SelectProps[],
         defValue: {label: string, value: string|undefined},
          setDefValue: (value: {label: string, value: string|undefined}) => {label: string, value: string|undefined}} = useContext(appContext);
    // const [defValue, setDefValue] = useState<{label: string, value: string|undefined}>({ label: countriesToShow[0].value, value: countriesToShow[0].id });
    
    // console.log('This is the defValue');
    // console.log(defValue.value);

    return <Space wrap>
    <Select
      onSelect={(e) => {
        setDefValue({label: e.label, value: e.value});
      }}
      virtual={false}
      showSearch={true}
      defaultValue={defValue}
      style={{ width: 120 }}
      options={countriesToShow.map((item) => ({
        label: item.value,
        value: item.id,
      }))}
      labelInValue={true}
    />
  </Space>
};