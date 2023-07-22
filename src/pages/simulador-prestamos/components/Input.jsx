import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React, { useState, useEffect } from "react";
import {
  FormatCurrency,
  FormatPercentage,
  FormatPeriods,
} from "./CustomFormats";

function Inputs({ onChange }) {
  const [loan, setLoan] = useState("");
  const [nper, setNper] = useState("");
  const [rate, setRate] = useState("");

  useEffect(() => {
    onChange(loan, nper, rate);
  }, [onChange, loan, nper, rate]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", '& .MuiTextField-root': { width: '23ch' }, }}>
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
        id="rate"
        focused
        placeholder="1.5%"
        variant="outlined"
        label="Tasa de interés"
     
        margin="normal"
        onChange={(e) => setRate(e.target.value)}
        InputProps={{
          inputComponent: FormatPercentage,
        }}
      />
    </Box>
  );
}

export default Inputs;
