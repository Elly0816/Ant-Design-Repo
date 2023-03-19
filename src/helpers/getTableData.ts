import { latest, convert, timeSeries, fluct } from '../api/exchange';
import { COUNTRIES } from './countries';
import moment, { Moment } from 'moment';
import { ReactElement } from 'react';


function getSymbols(countries: any): string[]{
    const symbols = countries.map((country: any) => {
        return country.currency.code
    })
    return symbols;
}

export async function getTableData(base: string) : Promise<tableData[]>{
    const symbols: string[] = getSymbols(COUNTRIES);
    let today: Moment | string = moment();
    const lastWeek = today.subtract(7, 'days').format().split('T')[0];
    const lastMonth = today.subtract(1, 'months').format().split('T')[0];
    const lastYear = today.subtract(1, 'years').format().split('T')[0];
    today = moment().format().split('T')[0];
    let result: tableData[]
    // const rates = await latest(symbols, base).then((res: any) => {
    //     return res.rates;
    // });

    try {
        let [rates, lastWeekF, lastMonthF, lastYearF] = await Promise.all([
            latest(symbols, base),
            fluct(today, lastWeek, base, symbols),
            fluct(today, lastMonth, base, symbols),
            fluct(today, lastYear, base, symbols),
        ]);

        console.log(mapToResult(rates, lastWeekF, lastMonthF, lastYearF));
        result = mapToResult(rates, lastWeekF, lastMonthF, lastYearF);
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


function mapToResult(rates: any, lastWeekF: any, lastMonthF: any, lastYearF:any): tableData[]{

    let currRates = rates.rates;
    let weekRates = lastWeekF.rates;
    let monthRates = lastMonthF.rates;
    let yearRates = lastYearF.rates;

    let toReturn: tableData[] = Object.keys(currRates).map((key):tableData => {
        return {
            name: key,
            rates: currRates[key],
            weekDiff: weekRates[key].change_pct,
            monthDiff: monthRates[key].change_pct,
            yearDiff: yearRates[key].change_pct
        }
    })

    return toReturn as tableData[];
}

export interface tableData {
    name: string,
    rates: number,
    weekDiff: number,
    monthDiff: number,
    yearDiff: number
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