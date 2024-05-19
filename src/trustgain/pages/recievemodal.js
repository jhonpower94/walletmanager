import {
    Box,
    CircularProgress,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    ListSubheader,
    Typography,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import QRCode from "react-qr-code";
import CustomizedSnackbars from "../alert";
import { BootstrapButton } from "../custom";
import "../style.scoped.css";
import { CurrencyFormat } from "../../config/services";
import {
    convertTimestamp,
    convertTimestampTime,
} from "../../component/component";

export default function ResponsiveDialog({ open, handleClose, coin, address }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleClick = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const switchCoinNetwork = (key) => {
    switch (key) {
      case "BITCOIN":
        return "BITCOIN";
      case "ETHEREUM":
        return "ERC20";
      case "BNB SMART":
        return "BEP20";
      case "TRON":
        return "TRC20";
      case "USDT(TRC20)":
        return "TRC20";
      case "USDT(ERC20)":
        return "ERC20";
      default:
        return "TRC20";
    }
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        fullWidth={true}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <div className="modal-content modal-content-demo" bis_skin_checked={1}>
          <CustomizedSnackbars
            openSnackbar={openSnackbar}
            handleCloseSnackbar={handleCloseSnackbar}
            severity="success"
            message="Address Copied"
          />
          <div className="modal-header" bis_skin_checked={1}>
            <h6 className="modal-title">RECEIVE {coin.coinname}</h6>
            <button
              aria-label="Close"
              className="close"
              onClick={handleClose}
              type="button"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body" bis_skin_checked={1}>
            <p />
            <center>
              <div
                style={{
                  height: "auto",
                  margin: "0 auto",
                  maxWidth: 200,
                  width: "100%",
                }}
              >
                <QRCode
                  size={256}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={address}
                  viewBox={`0 0 256 256`}
                />
              </div>
              <br />
              Wallet Address
              <br />
              &nbsp;&nbsp;
              <input
                type="text"
                id="myInput"
                name="company_wallet"
                defaultValue={address}
                maxLength={3}
                readOnly=""
              />
              <Box mt={1} />
              <CopyToClipboard text={address} onCopy={handleClick}>
                <BootstrapButton
                  // onClick={handleClick}
                  variant="contained"
                  disableRipple
                >
                  Copy
                </BootstrapButton>
              </CopyToClipboard>
            </center>
            <br /> <p />
            <p className="response" />
            <p />
            <ul className="list-group wd-md-100p">
              <li className="list-group-item d-flex align-items-center">
                <div bis_skin_checked={1}>
                  <h6 className="tx-13 tx-inverse tx-semibold mg-b-0">
                    Network
                  </h6>
                  <span className="d-block tx-11 text-muted">
                    {switchCoinNetwork(coin.coinname)}
                  </span>
                </div>
              </li>
              <li className="list-group-item d-flex align-items-center">
                <div bis_skin_checked={1}>
                  <h6 className="tx-13 tx-inverse tx-semibold mg-b-0">
                    Expected arrival
                  </h6>
                  <span className="d-block tx-11 text-muted">
                    1 network confirmation
                  </span>
                </div>
              </li>
              <li className="list-group-item d-flex align-items-center">
                <div bis_skin_checked={1}>
                  <h6 className="tx-13 tx-inverse tx-semibold mg-b-0">
                    Expected unlock
                  </h6>
                  <span className="d-block tx-11 text-muted">
                    2 network confirmations
                  </span>
                </div>
              </li>
            </ul>
            <p />
          </div>
          <div className="modal-footer" bis_skin_checked={1}>
            {/* <button className="btn ripple btn-primary" type="button">Save changes</button> */}
            <button
              className="btn ripple btn-secondary"
              type="button"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export function TransDetailDailog({ open, handleClose, data, address }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [date, setDate] = React.useState(null);

  const {
    amount,
    cointitle,
    recipient,
    confirmation,
    transaction_type,
    timestamp,
    pending,
  } = data;

  React.useEffect(() => {
    console.log(data);
  }, [data]);

  const isTimeStamp =
    timestamp == undefined
      ? ""
      : `${convertTimestamp(timestamp)} ${convertTimestampTime(timestamp)}`;

  const isCredit = transaction_type === "Credit";
  const isrecipient = isCredit ? address : recipient;
  const isConfirmation = confirmation < 3;

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        fullWidth={true}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <div className="modal-content modal-content-demo" bis_skin_checked={1}>
          <div className="modal-header" bis_skin_checked={1}>
            <h6 className="modal-title">Transaction details</h6>
            <button
              aria-label="Close"
              className="close"
              onClick={handleClose}
              type="button"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body" bis_skin_checked={1}>
            <Typography variant="h5" sx={{ textTransform: "uppercase" }}>
              {transaction_type == "Credit" ? "Recieved" : "Sent"}{" "}
              {<CurrencyFormat amount={amount} prefix={"$"} seperator={true} />}{" "}
              {cointitle}
            </Typography>

            <Box mt={1} />

            <List
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader sx={{ fontSize: 18 }} id="nested-list-subheader">
                  Details
                </ListSubheader>
              }
            >
              {[
                {
                  primary: "Date",
                  secondary: "",
                  secondaryaction: isTimeStamp,
                },
                {
                  primary: "Recipient",
                  secondary: "",
                  secondaryaction: (
                    <div
                      style={{
                        width: 120,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {isrecipient}
                    </div>
                  ),
                },
                {
                  primary: "Status",
                  secondary: isConfirmation ? (
                    <CircularProgress size={20} />
                  ) : (
                    ""
                  ),
                  secondaryaction:
                    confirmation === undefined
                      ? "Completed"
                      : `${confirmation} Confirmation`,
                },
                {
                  primary: "Amount",
                  secondary: "",
                  secondaryaction: (
                    <Typography
                      variant="h5"
                      color={isConfirmation ? "red" : "green"}
                    >
                      {isCredit ? "+" : "-"}
                      <CurrencyFormat
                        amount={amount}
                        prefix={"$"}
                        seperator={true}
                      />
                    </Typography>
                  ),
                },
              ].map((item, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={item.primary}
                    secondary={item.secondary}
                    primaryTypographyProps={{ variant: "h6" }}
                  />
                  <ListItemSecondaryAction>
                    <Typography variant="h5">{item.secondaryaction}</Typography>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </div>
          <div className="modal-footer" bis_skin_checked={1}>
            {/* <button className="btn ripple btn-primary" type="button">Save changes</button> */}
            <button
              className="btn ripple btn-secondary"
              type="button"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
