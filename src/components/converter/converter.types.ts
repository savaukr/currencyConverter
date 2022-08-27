export type ExchRate = {
  USD: number;
  EUR: number;
};

export type FetchExchRate = {
  base_ccy: string;
  buy: string;
  ccy: string;
  sale: string;
};

export type NormExchRate = {
  [ccs: string]: FetchExchRate;
};
