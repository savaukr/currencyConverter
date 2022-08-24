import React, { useState } from "react";

// import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

// import "./currency.modules.css";
import styles from "./currency.module.css";

function Currency() {
  const [currency, setCurrency] = useState<string>("");
  const handleChange = (event: SelectChangeEvent) => {
    setCurrency(event.target.value as string);
  };

  return (
    <div className={styles.currencyWrapper}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Currency</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currency}
          label="Currency"
          onChange={handleChange}
          // variant={"filled"}
        >
          <MenuItem value={10}>USD</MenuItem>
          <MenuItem value={20}>EUR</MenuItem>
          <MenuItem value={30}> UAH</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default Currency;
