import React, { useState, useEffect } from "react";

import Currency from "../currency/currency.tsx";
import { UAH } from "../currency/currency.const.ts";
import Today from "../today/today.tsx";

import { getExchRate } from "../../helpers/fetchRate";
import { FetchExchRate } from "./converter.types";

import styles from "./converter.module.css";

function Converter() {
  const [currency, setCurrency] = useState<string>(UAH);
  const [amount, setAmout] = useState<number>(0);
  const [exchRate, setExchRate] = useState<FetchExchRate[] | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    try {
      getExchRate(setExchRate);
    } catch (err) {}
  }, []);

  return (
    <div className={styles.converterWrapper}>
      <header className={styles.header}>
        <h1>Currency converter</h1>
        <Today className={styles.date} />
      </header>

      <div className={styles.currencies}>
        <Currency currency={currency} setCurrency={setCurrency} />
        <Currency currency={currency} setCurrency={setCurrency} />
      </div>
    </div>
  );
}

export default Converter;
