import "./Button.css";
import { COUNTRIES } from "../../helpers/countries";
import { ReactElement, useState, useEffect } from 'react';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';

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

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3rd menu item
      </a>
    ),
  },
];

const newItems: MenuProps['items'] = COUNTRIES.map((country: COUNTRY) => {

    return ({
        key: country.currency.code,
        label: (<div>
            <img src={`https://flagsapi.com/${country.code}/shiny/16.png`} alt={country.name} />
            <span>{country.currency.code}</span>
        </div>),
        title: country.code
    })
});

// const dropDownStyle: 

interface buttonType {
    key: string,
    label: JSX.Element,
    title: string
}

export default function myButton(): ReactElement {

    const [countries, setCountries] = useState<MenuProps['items']>(newItems);
    const [base, setBase] = useState<buttonType>(countries?.filter(country => {return country?.key === 'EUR'})[0] as unknown as buttonType);
    const [toView, setToView] = useState(countries?.filter(country => {return country?.key !== base?.key}));

    return <Space direction="vertical">
    <Space wrap>
        <Dropdown overlayClassName="dropDown" autoAdjustOverflow={true} menu={{items: newItems}} placement="bottomLeft" arrow={false}>
        <Button>{base.label}</Button>
        {/* <Button>{base?.key}</Button> */}
        </Dropdown>
        </Space>
  </Space>
};