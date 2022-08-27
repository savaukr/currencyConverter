import React, { useState } from "react";

import Currency from "../currency/currency.tsx";
import { UAH } from "../currency/currency.const.ts";
import Today from "../today/today.tsx";

import styles from "./converter.module.css";

function Converter() {
  const [currency, setCurrency] = useState<string>(UAH);
  const [amount, setAmout] = useState<number>(0);

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
