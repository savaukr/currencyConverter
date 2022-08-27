import React from "react";
import { FetchExchRate } from "../converter/converter.types";

import styles from "./exchangeRate.module.css";

type Props = {
  rates: FetchExchRate[];
};

export default function ExchangeRate({ rates }: Props) {
  return (
    <div>
      {rates.map((rate) => (
        <div key={rate.ccy}>
          {rate.ccy} <span className={styles.operation}>buy:</span>{" "}
          {rate.buy.slice(0, 5)} <span className={styles.operation}>sale:</span>{" "}
          {rate.sale.slice(0, 5)}
        </div>
      ))}
    </div>
  );
}
