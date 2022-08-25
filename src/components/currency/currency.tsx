import React, { useState } from "react";

// import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";

import { USD, EUR, UAH } from "./currency.const.ts";

import styles from "./currency.module.css";

type Props = {
  currency: string;
  setCurrency: (cur: string) => void;
};

function Currency({ currency, setCurrency }: Props) {
  // const [currency, setCurrency] = useState<string>(UAH);
  const [amount, setAmount] = useState<number>();
  const handleChangeCurrency = (event: SelectChangeEvent) => {
    setCurrency(event.target.value as string);
  };
  const handleChangeAmount = (event) => {
    setAmount(event.target.value as number);
  };

  return (
    <div className={styles.currencyWrapper}>
      <div className={styles.currency}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Currency</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={currency}
            label="Currency"
            onChange={handleChangeCurrency}
            // variant={"filled"}
          >
            <MenuItem value={10}>{USD}</MenuItem>
            <MenuItem value={20}>{EUR}</MenuItem>
            <MenuItem value={30}> {UAH}</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={styles.amount}>
        <TextField
          id="outlined-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          value={amount}
          onChange={handleChangeAmount}
        />
      </div>
    </div>
  );
}

export default Currency;
