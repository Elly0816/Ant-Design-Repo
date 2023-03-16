
/*
Routes to make:

CONVERT
FLUCTUATIONS
LATEST
SYMBOLS
TIMESERIES
DATE?

var myHeaders = new Headers();
myHeaders.append("apikey", "BDll3bwcuFkfVdkOUHj1sDwSomtqlJ3p");

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

fetch("https://api.apilayer.com/exchangerates_data/convert?to={to}&from={from}&amount={amount}", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));


*/
const endpoint: string = "https://api.apilayer.com/exchangerates_data";

let key = import.meta.env.VITE_API_KEY;


const myHeaders = new Headers({'apikey': key});

let requestOptions: RequestInit = {
    method: "GET",
    redirect: 'follow',
    headers: myHeaders
}


export async function convert(){
    // console.log(key);


}


export async function fluct(){

}


export async function latest(symbols: string[], base: string) : Promise<string>{
    console.log(key);

    try{
        const response = await fetch(`${endpoint}/latest?symbols=${symbols}&base=${base}`,
        requestOptions);
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error){
        console.log(error);
        throw error;
    }

}

export async function symbol(): Promise<string>{
    try{
        const res = await fetch(`${endpoint}/symbols`, requestOptions);
        const result = await res.json();
        console.log(result);
        return result;
    } catch (error){
        console.log(error);
        throw error;
    }
}

export async function timeSeries(){


}