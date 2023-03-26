export interface DataType {
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



  