import Inputs from "./Input";
import { useState } from "react";
import AmortizationTable from "./AmortizationTable";
import Box from "@mui/material/Box";
import "./dise.css"


function BasicCard() {
  const [loan, setLoan] = useState("");
  const [nper, setNper] = useState("");
  const [rate, setRate] = useState("");
  return (
    <Box m={{ xs: 2, sm: 3, md: 4, lg: 5 }} mt={{ xs: 0, sm: 1, md: 2, lg: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Inputs
          onChange={(loan, nper, rate) => {
            setLoan(loan);
            setNper(nper);
            setRate(rate);
          }}
        />
        <Box mt={2}>
    
        </Box>
      </Box>
      <Box  mt={{ xs: 2, sm: 3, md: 4, lg: 5 }}>
        <AmortizationTable loan={loan} nper={nper} rate={rate} />
      </Box>
    </Box>
  );
}

export default BasicCard;
