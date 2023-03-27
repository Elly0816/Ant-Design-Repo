import { latest, convert, timeSeries, fluct, tsController } from '../api/exchange';
import { COUNTRIES } from './countries';
import moment, { Moment } from 'moment';
import { ReactElement } from 'react';


function getSymbols(countries: any): Array<Array<string>>{
    const symbols = countries.map((country: any) => {
        return [country.code, country.currency.code, country.currency.name]
    })
    return symbols;
}

export async function getTableData(base: string) : Promise<tableData[]>{
    /*
        This gets the latest rates and the changes over the past day, week, month and year.

    */
    const symbols: Array<Array<string>> = getSymbols(COUNTRIES);
    let today: Moment | string = moment();
    const yesterday = today.subtract(24, 'hours').format().split('T')[0];
    const lastWeek = today.subtract(7, 'days').format().split('T')[0];
    const lastMonth = today.subtract(1, 'months').format().split('T')[0];
    const lastYear = today.subtract(1, 'years').format().split('T')[0];
    today = moment().format().split('T')[0];
    let result: tableData[]
    // const rates = await latest(symbols, base).then((res: any) => {
    //     return res.rates;
    // });

    try {
        let [rates, yesterdayF, lastWeekF, lastMonthF, lastYearF] = await Promise.all([
            latest(symbols, base),
            fluct(today, yesterday, base, symbols),
            fluct(today, lastWeek, base, symbols),
            fluct(today, lastMonth, base, symbols),
            fluct(today, lastYear, base, symbols),
        ]);

        console.log(mapToResult(rates, yesterdayF, lastWeekF, lastMonthF, lastYearF));
        result = mapToResult(rates, yesterdayF, lastWeekF, lastMonthF, lastYearF);
        return result;
        
    } catch (err){
        console.log(err);
        return err as unknown as tableData[];
    }



    /*
        this should return: 
            [
                {
                    name: image and symbol,
                    rate: latest rate,
                    7 day fluct: 
                    1 month fluct:
                    1 year fluct:
                }
            ]
    */

}


export async function getDetails(base:string, symbol:string): Promise<object>{

    /*
        This gets the details of the symbol passed into it
    */

    let today: Moment | string = moment();
    const lastYear = today.subtract(1, 'years').format().split('T')[0];
    today = moment().format().split('T')[0];

    const {rates} = await timeSeries(lastYear, today, base, symbol);
    // console.log(rates);
    return rates as object;

}


function mapToResult(rates: any, yesterday: any, lastWeekF: any, lastMonthF: any, lastYearF:any): tableData[]{
    /*
        This maps the response of the api to the interface tableData
    */

    let currRates = rates.rates;
    let hours24 = yesterday.rates;
    let weekRates = lastWeekF.rates;
    let monthRates = lastMonthF.rates;
    let yearRates = lastYearF.rates;

    let toReturn: tableData[] = Object.keys(currRates).map((key):tableData => {
        let country = COUNTRIES.find((country) => country.currency.code === key);
        let countryCode = !country? 'unknown' : country.currency.code === 'EUR' ? 'EU' : country.currency.code === 'USD' ? 'US' : country.code;
        let currencySymbol = !country? 'unknown' : country.currency.symbol;
        let currencyCode = !country? 'unknown' : country.currency.code;
        let currencyName = !country? 'unknown' : country.currency.name;
        
        return {
            name: {key: key, 
                countryCode: countryCode,
                currencyCode: currencyCode,
                currencyName: currencyName,
                currencySymbol: currencySymbol
            },
            rates: currRates[key],
            hours24Diff: hours24[key].change_pct,
            weekDiff: weekRates[key].change_pct,
            monthDiff: monthRates[key].change_pct,
            yearDiff: yearRates[key].change_pct
        }
    })

    return toReturn as tableData[];
}

export interface tableData {
    name: {
        key: string,
        countryCode: string,
        currencySymbol: string,
        currencyCode: string,
        currencyName: string
    },
    rates: number,
    hours24Diff: number,
    weekDiff: number,
    monthDiff: number,
    yearDiff: number
}

// interface DataType {
//     key: string;
//     flag: ReactElement
//     name: string;
//     rate: number;
//     '7 day change': number;
//     '1 month change': number;
//     '1 year change': number
//   }