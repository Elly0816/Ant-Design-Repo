
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

let requestOptions: RequestInit = {
    method: "GET",
    redirect: 'follow',
    headers: myHeaders
}


export async function convert(amount: number, from: string, to: string, date?:string){
    /**
     * Enter date in the format YYY-MM-DD
     */
    let url = `${endpoint}/convert?to=${to}&from=${from}&amount=${amount}`;
    
    if (date){
        url += `&date=${date}`;
    }

    try {
        const response = await fetch(url, requestOptions);
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error){
        console.log(error);
        throw error;
    }
    
}


export async function fluct(start_date: string, end_date: string, base?: string, symbols?: string[]) {
    
    const dateDiff = ((new Date(end_date).getTime() - new Date(start_date).getTime()) / (1000*3600*24));

    console.log(` The difference is: ${dateDiff}`);

    if (dateDiff <= 365){
        let url = `https://api.apilayer.com/exchangerates_data/fluctuation?start_date=${start_date}&end_date=${end_date}`;
        if (base) {
          url += `&base=${base}`;
        }
        if (symbols) {
          url += `&symbols=${symbols}`;
        }
      
        try {
          const response = await fetch(url, requestOptions);
          const result = await response.json();
          console.log(result);
          return result;
        } catch (error) {
            console.log(error);
          throw error;
        }
    }

  }


export async function latest(symbols?: string[], base?: string) : Promise<string>{
    
    let url = `${endpoint}/latest?`;
    if (base){
        url += `&base=${base}`
    }
    
    if (symbols){
        url += `&symbols=${symbols}`
    }

    try{
        const response = await fetch(url, requestOptions);
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error){
        console.log(error);
        throw error;
    }
    
}

export async function timeSeries(start_date: string, end_date: string, base?: string, symbols?: string) {
    
    /**
     * @param date in the format YYY-MM-DD
    */

    const dateDiff = ((new Date(end_date).getTime() - new Date(start_date).getTime()) / (1000*3600*24));
    console.log(` The difference is: ${dateDiff}`);

    // if (dateDiff <= 365){
    //     let url = `${endpoint}/timeseries?start_date=${start_date}&end_date=${end_date}`;
    //     if (base) {
    //         url += `&base=${base}`;
    //     }
    //     if (symbols) {
    //         url += `&symbols=${symbols}`;
    //     }
        
    //     try {
    //         const response = await fetch(url, requestOptions);
    //         const result = await response.json();
    //         console.log(result);
    //         return result;
    //         } catch (error) {
    //             throw error;
    //         }
    // }

}            