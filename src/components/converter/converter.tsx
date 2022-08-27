import classnames from "classnames";
import React, { useState, useEffect, useCallback, useMemo } from "react";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import Currency from "../currency/currency.tsx";
import { UAH } from "../currency/currency.const.ts";
import Today from "../today/today.tsx";
import ExchangeRate from "../exchangeRate/exchangeRate.tsx";
import iconAttention from "../../images/Icon_attention.png";

import { getExchRate } from "../../helpers/fetchRate.ts";
import { FetchExchRate, NormExchRate } from "./converter.types";

import styles from "./converter.module.css";

function Converter() {
  const [firstCur, setFirstCur] = useState<string>(UAH);
  const [firstAmount, setFirsAmount] = useState<number>(0);

  const [secondCur, setSecondCur] = useState<string>(UAH);
  const [secondAmount, setSecondAmount] = useState<number>(0);

  const [exchRate, setExchRate] = useState<FetchExchRate[] | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [isBuy, setIsBuy] = useState<boolean>(true);

  useEffect(() => {
    try {
      const getData = async () => await getExchRate(setExchRate);
      getData();
    } catch (err) {
      setErr(err.message);
    }
  }, []);

  const normExchRate = useMemo(
    () =>
      exchRate?.reduce<NormExchRate>((acc, rate) => {
        acc[rate.ccy] = rate;
        return acc;
      }, {}),
    [exchRate]
  );
  // console.log("first", firstCur);
  // console.log("second", secondCur);
  return (
    <div className={styles.converterWrapper}>
      <header className={styles.header}>
        <h1>Currency converter</h1>
        <div className={styles.infoContainer}>
          <div className={styles.rateInfo}>
            <Today className={styles.date} />
            {exchRate ? <ExchangeRate rates={exchRate} /> : null}
          </div>
        </div>
      </header>
      <div className={styles.btns}>
        <Stack direction="row" spacing={2}>
          <Button
            color="secondary"
            variant="outlined"
            className={classnames(styles.btn, { [styles.activeBtn]: isBuy })}
            onClick={() => {
              setIsBuy(true);
            }}
          >
            Buy
          </Button>
          <Button
            color={"secondary"}
            variant="outlined"
            className={classnames(styles.btn, { [styles.activeBtn]: !isBuy })}
            onClick={() => setIsBuy(false)}
          >
            Sale
          </Button>
        </Stack>
      </div>
      <div className={styles.currencies}>
        <Currency
          ownCurrency={firstCur}
          setOwnCurrency={setFirstCur}
          ownAmount={firstAmount}
          setOwnAmount={setFirsAmount}
          extCurrency={secondCur}
          // setExtCurrency={setSecondCur}
          // extAmount={secondAmount}
          setExtAmount={setSecondAmount}
          normExchRate={normExchRate}
          isBuy={isBuy}
        />
        <Currency
          ownCurrency={secondCur}
          setOwnCurrency={setSecondCur}
          ownAmount={secondAmount}
          setOwnAmount={setSecondAmount}
          extCurrency={firstCur}
          // setExtCurrency={setFirstCur}
          // extAmount={firstAmount}
          setExtAmount={setFirsAmount}
          normExchRate={normExchRate}
          isBuy={isBuy}
        />
      </div>

      {err ? (
        <div className={styles.error}>
          <div>
            <img
              src={iconAttention}
              alt="attention"
              width="20px"
              height="20px"
            />
          </div>
          <div>{err}</div>
        </div>
      ) : null}
    </div>
  );
}

export default Converter;
