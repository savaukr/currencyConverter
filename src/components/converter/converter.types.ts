export type ExchRate = {
  USD: number;
  EUR: number;
};

export type FetchExchRate = {
  Amount: number;
  CurrencyCode: string;
  CurrencyCodeL: string;
  StartDate: string;
  TimeSign: string;
  Units: number;
};
