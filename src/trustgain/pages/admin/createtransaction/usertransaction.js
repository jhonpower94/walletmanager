import { Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import * as React from "react";
import { CurrencyFormat, getallUserTrans } from "../../../../config/services";
import CustomizedSnackbars from "../../../alert";
import { ConfirmUserTransaction, UpdateUserConfirmation } from "../component";

export default function AlluserTransactions({ id }) {
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [transactions, setTransactions] = React.useState([]);
  React.useEffect(() => {
    getallUserTrans(id).subscribe((transactions) => {
      console.log(transactions);
      setTransactions(transactions);
    });
  }, []);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  return (
    <>
      <CustomizedSnackbars
        openSnackbar={openSnackbar}
        handleCloseSnackbar={handleCloseSnackbar}
        severity="success"
        message={"Transaction Confirmed"}
      />
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Confirmations</TableCell>
              <TableCell align="left">Confirm</TableCell>
              <TableCell align="left">Amount</TableCell>
              <TableCell align="left">Coin</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((row, index) => (
              <TableRow key={index}>
                
                <TableCell align="left">
                  <Typography color={row.pending ? "orange" : "green"}>
                    {row.pending ? "Pending" : "Comfirmed"}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <UpdateUserConfirmation id={id} row={row} />
                </TableCell>
                <TableCell align="left">
                  <ConfirmUserTransaction
                    id={id}
                    row={row}
                    setOpenSnackbar={setOpenSnackbar}
                  />
                </TableCell>

                <TableCell align="left">
                  <CurrencyFormat
                    amount={row.amount}
                    prefix={"$"}
                    seperator={true}
                  />
                </TableCell>
                <TableCell align="left">
                  <Typography>{row.cointitle}</Typography>
                  <Typography />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

/*

*/
