
/*
Routes to make:

CONVERT
FLUCTUATIONS
LATEST
SYMBOLS
TIMESERIES
DATE?
*/
const endpoint: string = "https://api.apilayer.com/exchangerates_data";

let key = import.meta.env.VITE_API_KEY;


const myHeaders = new Headers({'apikey': key});

// export const fluctController = new AbortController();
// export const tsController = new AbortController();
// export const convertController = new AbortController();
// export const latestController = new AbortController();

// const fluctSignal = fluctController.signal;
// const timeSeriesSignal = tsController.signal;
// const convertSignal = convertController.signal;
// const latestSignal = latestController.signal;



let requestOptions: RequestInit = {
    method: "GET",
    redirect: 'follow',
    headers: myHeaders,
}



export async function convert(amount: number, from: string, to: string, signal: AbortSignal, date?:string){
    /**
     * Enter date in the format YYY-MM-DD
     */
    let url = `${endpoint}/convert?to=${to}&from=${from}&amount=${amount}`;
    
    if (date){
        url += `&date=${date}`;
    }

    try {
        const response = await fetch(url, {...requestOptions, signal: signal});
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error){
        console.log(error);
        throw error;
    }
    
}


export async function fluct(start_date: string, end_date: string, signal: AbortSignal, base?: string, symbolArray?: Array<Array<string>>) {
    
    const dateDiff = ((new Date(end_date).getTime() - new Date(start_date).getTime()) / (1000*3600*24));

    console.log(` The difference is: ${dateDiff}`);
    let symbols: string[] | undefined;

    if (symbolArray){
        symbols = symbolArray.map(item => item[1])
    }

    if (dateDiff <= 365){
        let url = `https://api.apilayer.com/exchangerates_data/fluctuation?start_date=${start_date}&end_date=${end_date}`;
        if (base) {
          url += `&base=${base}`;
        }
        if (symbols) {
          url += `&symbols=${symbols}`;
        }
      
        try {
          const response = await fetch(url, {...requestOptions, signal: signal});
          const result = await response.json();
          console.log(result);
          return result;
        } catch (error) {
            console.log(error);
          throw error;
        }
    }

  }


export async function latest(signal:AbortSignal, symbolArray?: Array<Array<string>>, base?: string) : Promise<string>{
    
    let url = `${endpoint}/latest?`;

    let symbols: string[] | undefined;

    if (symbolArray){
        symbols = symbolArray.map(item => item[1])
    }

    if (base){
        url += `&base=${base}`
    }

    
    if (symbols){
        url += `&symbols=${symbols}`
    }

    try{
        const response = await fetch(url, {...requestOptions, signal: signal});
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error){
        console.log(error);
        throw error;
    } finally {

    }
    
}


export async function timeSeries(signal:AbortSignal, start_date: string, end_date: string, base?: string, symbols?: string) {
    
    /**
     * @param date in the format YYY-MM-DD
    */

    console.log('today: '+start_date);
    console.log('lastYear: '+end_date);
    let url: string = `${endpoint}/timeseries?start_date=${start_date}&end_date=${end_date}`;

    console.log(start_date, end_date, base, symbols);
    if (base){
        url += `&base=${base}`;
    }
    if (symbols){
        url += `&symbols=${Array.of(symbols)}`;
    }
    console.log(url);
    try {
        const response = await fetch(url, {...requestOptions, signal: signal}, );
        const result = await response.json();
        // console.log(result);
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
   
}            