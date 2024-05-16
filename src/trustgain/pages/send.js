import { Container } from "@mui/material";
import React from "react";
//import { Price } from "../../config/services";
import { LoadingButton } from "@mui/lab";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import {
  CurrencyFormat,
  convert,
  updateUserBalance,
} from "../../config/services";
import CustomizedSnackbars from "../alert";
import "../style.scoped.css";
import { db } from "../../config/firebase";

function Send({ location }) {
  const { coinname, code, cointype, balance } = location.state.coin;
  const userInfos = useSelector((state) => state.useInfos);
  const {
    btc_balance,
    bnb_balance,
    tron_balance,
    eth_balance,
    usdt_balance,
    usdterc20_balance,
    id,
  } = userInfos;
  const [loading, setLoading] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const switchWalletBalance = (key) => {
    switch (key) {
      case "Tron":
        return tron_balance;
      default:
        return eth_balance;
    }
  };

  const switchNetwork = (key) => {
    switch (key) {
      case "Tron":
        return { name: "Tron", type: "tron_balance" };
      default:
        return { name: "Etheruem", type: "eth_balance" };
    }
  };

  const switchCointype = (key) => {
    switch (key) {
      case "Tron":
        return "tron_balance";
      default:
        return "eth_balance";
    }
  };

  const [state, setState] = React.useState({
    amount: 0,
    coin: 0,
    address: "",
    network: "Bitcoin",
    alerMessage: "",
    severity: "warning",
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const setCurrency = (event, amount) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
      amount: amount,
    });
  };

  const handleChangeCoin = async (event, key) => {
    await convert.ready();
    switch (key) {
      case "BTC":
        return convert.BTC.USD(event.target.value);
      case "ETH":
        return convert.ETH.USD(event.target.value);
      case "BNB":
        return convert.BNB.USD(event.target.value);
      case "TRX":
        return convert.TRX.USD(event.target.value);
      case "USDT":
        return convert.USDT.USD(event.target.value);
      default:
        return convert.USDT.USD(event.target.value);
    }
  };

  const submitform = (event) => {
    event.preventDefault();
    setLoading(true);

    const selectedNetworkBalance = switchWalletBalance(state.network);
    const selectedNetwork = switchNetwork(state.network).name;
    const selectedNetworkType = switchNetwork(state.network).type;
    const newamount = balance - state.amount;

    if (balance < state.amount || balance == 0) {
      setState({
        ...state,
        severity: "warning",
        alerMessage: `
        Insufficient ${coinname} balance`,
      });
      setOpenSnackbar(true);
      setLoading(false);
    } else if (selectedNetworkBalance < 300) {
      setTimeout(() => {
        setState({
          ...state,
          severity: "warning",
          alerMessage: `
          You do not have enough ${selectedNetwork} to cover your network fees`,
        });
        setOpenSnackbar(true);
        setLoading(false);
      }, 8000);
    } else {
      const newbalance = balance - state.amount;
      // add newbalance
      updateUserBalance(id, cointype, newbalance).then(() => {
        const newNetworkBalance = selectedNetworkBalance - 300;
        // add new network balance
        updateUserBalance(id, selectedNetworkType, newNetworkBalance).then(
          () => {
            // add transactions
            const data = {
              fullname: `${userInfos.firstName} ${userInfos.lastName}`,
              email: userInfos.email,
              userid: userInfos.id,
              cointitle: code,
              cointype: cointype,
              selectednetwordtype: selectedNetworkType,
              amount: state.amount,
              coin: state.coin,
              recipient: state.address,
              transaction_type: "Debit",
              confirmation: 0,
              pending: true,
              timestamp: serverTimestamp(),
            };
            const trxRef = doc(collection(db, "users", id, "transactions"));
            setDoc(trxRef, { ...data }).then(() => {
              // add general transaction
              const trxwalletRef = collection(db, "transactionswallet");
              addDoc(trxwalletRef, {
                ...data,
                transactionid: trxRef.id,
              }).then(() => {
                console.log("Sent");
                setState({
                  ...state,
                  severity: "success",
                  alerMessage: `You have successfully sent $${state.amount} - ${
                    state.coin
                  } ${code}`,
                });
                setOpenSnackbar(true);
                setLoading(false);
              });
            });
          }
        );
      });
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="lg">
      <CustomizedSnackbars
        openSnackbar={openSnackbar}
        handleCloseSnackbar={handleCloseSnackbar}
        severity={state.severity}
        message={state.alerMessage}
      />
      {/* row */}
      {/*<form id="transfer_form" method='POST'>*/}
      <div className="row" bis_skin_checked={1}>
        <div className="col-lg-12 col-md-12" bis_skin_checked={1}>
          <div className="card" bis_skin_checked={1}>
            <form onSubmit={submitform}>
              <div className="card-body" bis_skin_checked={1}>
                <div bis_skin_checked={1}>
                  <h6 className="card-title mb-1">
                    Send {coinname} to all wallet
                  </h6>
                  <p className="text-muted card-sub-title response" />
                </div>

                <div className="mb-4" bis_skin_checked={1}>
                  <p className="mg-b-10" />
                  <select className="SlectBox form-control" disabled>
                    <option selected="" value={coinname}>
                      {coinname}
                    </option>
                  </select>
                </div>
                <div className="mb-4" bis_skin_checked={1}>
                  <p className="mg-b-10">Enter amount in {coinname} value</p>
                  <input
                    type="number"
                    className="form-control input value1"
                    name="coin"
                    id="coin"
                    defaultValue={state.coin}
                    onChange={(event) =>
                      handleChangeCoin(event, code).then((amount) =>
                        setCurrency(event, amount)
                      )
                    }
                    title="Coin"
                    required
                  />
                </div>

                <span className="input-group-btn">
                  <p id="show" style={{ color: "green", fontSize: 15 }}>
                    You will receive{" "}
                    <CurrencyFormat
                      amount={state.amount}
                      prefix={"$"}
                      seperator={true}
                    />
                  </p>
                </span>
                <div className="mb-4" bis_skin_checked={1}>
                  <p className="mg-b-10">Wallet Address</p>
                  <input
                    type="text"
                    className="form-control input value1"
                    name="address"
                    defaultValue={state.address}
                    onChange={handleChange}
                    id="send_address"
                    required
                  />
                </div>

                <div className="mb-4" bis_skin_checked={1}>
                  <p className="mg-b-10">Network</p>
                  <select
                    className="SlectBox form-control"
                    id="network"
                    name="network"
                    onChange={handleChange}
                    required
                  >
                    <option value="BITCOIN_network">Bitcoin</option>
                    <option value="Tron">TRON</option>
                    <option value="Etheruem">Ethereum (ERC20)</option>
                    <option value="Binance">BNB Smart Chain (BEP20)</option>
                  </select>
                </div>
              </div>
              <LoadingButton
                type="submit"
                fullWidth
                loading={loading}
                variant="contained"
                color="primary"
                disableElevation
                size="large"
              >
                {"CONTINUE"}
              </LoadingButton>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Send;
