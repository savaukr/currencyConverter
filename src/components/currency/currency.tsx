import React, { useCallback } from "react";

import { NormExchRate } from "../converter/converter.types";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";

import { USD, EUR, UAH } from "./currency.const.ts";
import { debounce } from "../../helpers/debounce.ts";

import styles from "./currency.module.css";

type Props = {
  ownCurrency: string;
  setOwnCurrency: (cur: string) => void;
  ownAmount: number;
  setOwnAmount: (amount: number) => void;
  extCurrency: string;
  // setExtCurrency: (cur: string) => void;
  // extAmount: number;
  setExtAmount: (amount: number) => void;
  normExchRate: NormExchRate;
  isBuy: boolean;
};

function Currency({
  ownCurrency,
  setOwnCurrency,
  ownAmount,
  setOwnAmount,
  extCurrency,
  // setExtCurrency,
  // extAmount,
  setExtAmount,
  normExchRate,
  isBuy,
}: Props) {
  const getConvertAmount = useCallback(
    (
      ownCurrency: string,
      ownAmount: number,
      normExchRate: NormExchRate,
      isBuy: boolean
    ) => {
      if (!normExchRate) return;

      console.log("ownCurrency", ownCurrency);
      console.log("extCurrency", extCurrency);

      if (ownCurrency === extCurrency) {
        return setExtAmount(Number(ownAmount));
      }
      let koef = 1;
      const rate =
        ownCurrency === UAH
          ? normExchRate[extCurrency]
          : normExchRate[ownCurrency];
      if (ownCurrency !== UAH && extCurrency !== UAH) {
        koef = Number(rate?.buy) / Number(rate?.sale);
      }

      console.log("rate:", rate);

      if (isBuy) {
        if (ownCurrency === UAH)
          setExtAmount((ownAmount / Number(rate?.buy)) * koef);
        else setExtAmount(ownAmount * Number(rate?.buy) * koef);
      } else {
        if (ownCurrency === UAH)
          setExtAmount((ownAmount / Number(rate?.sale)) * koef);
        else setExtAmount(ownAmount * Number(rate?.sale) * koef);
      }

      // setExtAmount(10 + Number(ownAmount));
    },
    [ownCurrency, ownAmount, normExchRate, extCurrency, isBuy, setExtAmount]
  );

  const debounceGetConverAmount = useCallback(debounce(getConvertAmount, 500), [
    ownCurrency,
    ownAmount,
    normExchRate,
    extCurrency,
    isBuy,
    setExtAmount,
  ]);
  const handleChangeCurrency = (event: SelectChangeEvent) => {
    setOwnCurrency(event.target.value as string);
    debounceGetConverAmount(
      event.target.value as string,
      ownAmount,
      normExchRate,
      isBuy
    );
  };
  const handleChangeAmount = (event) => {
    setOwnAmount(event.target.value as number);
    debounceGetConverAmount(
      ownCurrency,
      event.target.value as number,
      normExchRate,
      isBuy
    );
  };

  return (
    <div className={styles.currencyWrapper}>
      <div className={styles.ownCurrency}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Currency</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={ownCurrency}
            label="Currency"
            onChange={handleChangeCurrency}
          >
            <MenuItem value={USD}>{USD}</MenuItem>
            <MenuItem value={EUR}>{EUR}</MenuItem>
            <MenuItem value={UAH}> {UAH}</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={styles.amount}>
        <TextField
          id="outlined-number"
          label="Amount"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          value={ownAmount}
          onChange={handleChangeAmount}
        />
      </div>
    </div>
  );
}

export default Currency;
