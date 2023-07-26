import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React, { useState, useEffect } from "react";
import MenuItem from '@mui/material/MenuItem';

import {
  FormatCurrency,
  FormatPercentage,
  FormatPeriods,
} from "./CustomFormats";

const currencies = [
  {
    value: 'Alemana',
    label: 'Alemana',
  },
  {
    value: 'Francesa',
    label: 'Francesa',
  },

];

function Inputs({ onChange }) {
  const [loan, setLoan] = useState("");
  const [nper, setNper] = useState("");
  const [rate, setRate] = useState("");

  useEffect(() => {
    onChange(loan, nper, rate);
  }, [onChange, loan, nper, rate]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", '& .MuiTextField-root': { width: '25ch' }, }}>
      <TextField
        id="loan"
        focused
        placeholder="$10,000,000"
        variant="outlined"
        label="Valor del crédito"
        fullWidth
        margin="normal"
        onChange={(e) => setLoan(e.target.value)}
        InputProps={{
          inputComponent: FormatCurrency,
        }}

      />
      <TextField
        id="nper"
        focused
        placeholder="12"
        variant="outlined"
        label="Número de Meses"

        margin="normal"
        onChange={(e) => setNper(e.target.value)}
        InputProps={{
          inputComponent: FormatPeriods,
        }}
      />
     
    
      <TextField
      margin="normal"
      focused
      variant="outlined"
        id="amortiza"
        select
        label="Sistema de amortización"
        defaultValue="Francesa"
        onChange={(e) => setRate(e.target.value)}
        InputProps={{
          inputComponent: FormatPercentage,
        }}
      >
      
        {currencies.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

    </Box>
  );
}

export default Inputs;
