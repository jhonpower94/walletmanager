import { MoreHoriz } from "@mui/icons-material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { TableHead, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import * as React from "react";
import { convertTimestamp } from "../../component/component";
import { CurrencyFormat } from "../../config/services";
import "../style.scoped.css";
import { TransDetailDailog } from "./recievemodal";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function TransactionTable({ rows, coinname, address, image }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selected, setSelected] = React.useState(null);
  const [data, setData] = React.useState({});
  const [open, setOpen] = React.useState(false);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <div className="p-3 pb-0" bis_skin_checked={1}>
          <div className="d-flex justify-content-between" bis_skin_checked={1}>
            <h4 className="card-title mg-b-10">Transactions History</h4>
            <MoreHoriz />
          </div>
          <p className="tx-12 tx-gray-500 mb-0">
            Transaction History shows information about all {coinname}{" "}
            Transactions.
          </p>
        </div>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Type</TableCell>
              <TableCell align="left">Amount</TableCell>
              <TableCell align="left">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row, index) => {
              const {
                transaction_type,
                pending,
                amount,
                timestamp,
                confirmation,
              } = row.data();
              const isCredit = transaction_type === "Credit";
              const isConfirmation = confirmation < 3;
              return (
                <TableRow
                  key={index}
                  hover
                  onClick={(event) => {
                    setSelected(index);
                    setData(row.data());
                    handleClickOpen();
                  }}
                  role="checkbox"
                  selected={selected == index}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ display: "flex" }}
                    align="left"
                  >
                    <img src={require(`${image}`)} width={25} />

                    <Typography
                      variant="h5"
                      sx={{ textTransform: "uppercase", ml: 1 }}
                    >
                      {isCredit ? "Received" : "Sent"}
                    </Typography>
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="left">
                    <Typography
                      variant="body1"
                      color={isConfirmation ? "red" : "green"}
                    >
                      {isCredit ? "+" : "-"}
                      <CurrencyFormat
                        amount={amount}
                        prefix={"$"}
                        seperator={true}
                      />
                    </Typography>
                    <Typography
                      sx={{ mt: 1 }}
                      variant="subtitle2"
                      color={isConfirmation ? "orange" : "green"}
                    >
                      {isConfirmation ? "Pending" : "Confirmed"}
                    </Typography>
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="left">
                    {convertTimestamp(timestamp)}
                  </TableCell>
                </TableRow>
              );
            })}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <TransDetailDailog
        open={open}
        handleClose={handleClose}
        data={data}
        address={address}
      />
    </>
  );
}
