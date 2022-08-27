import { FetchExchRate } from "./../components/converter/converter.types";

export const getExchRate: () => Promise<FetchExchRate[]> = async () => {
  try {
    let response = await fetch(
      "https://bank.gov.ua/NBU_Exchange/exchange?json"
    );
    const json = await response.json();
    const result = JSON.parse(json);
    return [result[0], result[2]];
  } catch (err) {
    err.message = "Can not get exchange rate, try latter";
    throw err;
  }
};
