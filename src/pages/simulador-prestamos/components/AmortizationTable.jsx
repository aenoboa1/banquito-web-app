import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import Grid from '@mui/material/Grid';

function AmortizationTable({ loan, nper, rate }) {

let use="";
let equi="";
let camb="";
let balan="";
let inte="";
  
if(rate==="Francesa"){
  use='Francesa';
  rate=1.5;
}else
{
  rate=1.25;
}


let rows = [{ period: 0, payment: 0, interest: 0, principal: 0, balance: loan }];

  let payment = "";
  if (loan && nper && rate !== "") {
    if(use==="Francesa"){

    payment = (loan * rate) / 100 / (1 - (1 + rate / 100) ** -nper);
    
    if (loan && nper && rate !== "") {
      for (let period = 1; period <= nper; period++) {
        rows.push({
          period: period,
          payment: payment,
          interest:
            ((loan * (1 + rate / 100) ** (period - 1) -
              (payment * ((1 + rate / 100) ** (period - 1) - 1)) / (rate / 100)) *
              rate) /
            100,
          principal:
            payment -
            ((loan * (1 + rate / 100) ** (period - 1) -
              (payment * ((1 + rate / 100) ** (period - 1) - 1)) / (rate / 100)) *
              rate) /
            100,
          balance:
            loan * (1 + rate / 100) ** period -
            (payment * ((1 + rate / 100) ** period - 1)) / (rate / 100),
        });
      }
    }
  
    }else{
      equi =loan/nper;
      camb=rate;
      inte=(loan*camb)/100;
      payment = equi+inte;
     
     
      if (loan && nper && rate !== "") {
        for (let period = 1; period <= nper; period++) {
          rows.push({
            period: period,
            payment: payment,
            interest: (loan*camb)/100,
              
            principal:equi,
            balance: loan-equi,
          

          });
          balan=loan-equi;
        loan=balan;
        inte=(loan*camb)/100;

        payment = equi+inte;
     

        }
      }
    }



  }




  let formatter = new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'USD'
  });

  return (


    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
       
          <TableRow>
            <TableCell align="center">Periodo</TableCell>
            <TableCell align="center">Cuota</TableCell>
            <TableCell align="center">Intereses</TableCell>
            <TableCell align="center">Amortización</TableCell>
            <TableCell align="center">Saldo</TableCell>
          </TableRow>
      
        <TableBody align="center">
          {rows.map((row) => (
            <TableRow 
              key={row.period}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{row.period}</TableCell>
              <TableCell align="center">{formatter.format(row.payment)}</TableCell>
              <TableCell align="center">{formatter.format(row.interest)}</TableCell>
              <TableCell align="center">{formatter.format(row.principal)}</TableCell>
              <TableCell align="center">{formatter.format(row.balance)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  );
}

export default AmortizationTable;
