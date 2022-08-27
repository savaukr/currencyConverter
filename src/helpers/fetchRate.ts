import { FetchExchRate } from "./../components/converter/converter.types";

export const getExchRate = async (
  setExchRate: (rate: FetchExchRate[]) => void
) => {
  try {
    let response = await fetch(
      "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5"
    );
    const json = await response.json();
    setExchRate([json[0], json[1]]);
  } catch (err) {
    err.message = "Can not get exchange rate, try latter";
    throw err;
  }
};
