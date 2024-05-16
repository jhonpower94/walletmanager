import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import SendIcon from "@mui/icons-material/Send";
import { Typography } from "@mui/material";
import { navigate } from "@reach/router";
import React from "react";
import { useSelector } from "react-redux";
import {
  CryptoCurrencyFormat,
  CurrencyFormat,
  getTransactionsType,
} from "../../config/services";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { CustomButton } from "../custom";
import "../style.scoped.css";
import ResponsiveDialog from "./recievemodal";
import TransactionTable from "./transactionhistory";
import { db } from "../../config/firebase";

function CoinAction({ location }) {
  const [open, setOpen] = React.useState(false);
  const userInfos = useSelector((state) => state.useInfos);
  const [transactions, setTransactions] = React.useState([]);
  const { image, balancecoin, coinname, code, balance } = location.state.coin;
  const [adminWallet, setadminWallet] = React.useState("");

  React.useEffect(() => {
    getTransactionsType(userInfos.id, code).then((data) => {
      setTransactions(data.docs);
    });
    const docRef = doc(db, "walletaddresses", code);
    getDoc(docRef).then((data) => {
      console.log(data.data());
      
      if (data.data().address) return setadminWallet(data.data().address);
    });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="container-fluid" bis_skin_checked={1}>
      <div className="card" bis_skin_checked={1}>
        <div className="card-body text-center" bis_skin_checked={1}>
          <div className="profile-pic mb-2" bis_skin_checked={1}>
            <img
              src={require(`${image}`)}
              className="brround avatar avatar-lg mx-auto"
            />
            <h5
              className="mt-3 mb-0 font-weight-semibold"
              style={{ fontSize: 25 }}
            >
              {balancecoin == 0 ? (
                `0.00 ${code}`
              ) : (
                <CryptoCurrencyFormat
                  amount={balancecoin}
                  suffix={` ${code}`}
                />
              )}
            </h5>
            <Typography variant="body1">
              <CurrencyFormat amount={balance} prefix="$" seperator={true} />
            </Typography>
          </div>
        </div>
        <div className="p-4 b-t card-footer" bis_skin_checked={1}>
          <div className="row text-center" bis_skin_checked={1}>
            <div
              className="col-6 border-right text-center"
              bis_skin_checked={1}
            >
              <div className="text-center" bis_skin_checked={1}>
                <CustomButton
                  onClick={handleClickOpen}
                  startIcon={<ArrowDownwardIcon />}
                >
                  Receive
                </CustomButton>
              </div>
            </div>
            <div className="col-6 text-center" bis_skin_checked={1}>
              <CustomButton
                onClick={() =>
                  navigate("send", {
                    state: { coin: location.state.coin },
                  })
                }
                startIcon={<SendIcon />}
              >
                Send
              </CustomButton>
            </div>
            <div className="col-4 text-center" bis_skin_checked={1} />
          </div>
        </div>
      </div>{" "}
      <br />
      <TransactionTable
        rows={transactions}
        coinname={coinname}
        address={adminWallet}
        image={image}
      />
      {/*-Transaction--*/}
      <ResponsiveDialog
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        coin={location.state.coin}
        address={adminWallet}
      />
    </div>
  );
}

export default CoinAction;
