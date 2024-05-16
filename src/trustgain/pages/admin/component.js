import { LoadingButton } from "@mui/lab";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React from "react";
import { db } from "../../../config/firebase";
import {
  addNotification,
  sendMessage,
  updateUserBalance,
} from "../../../config/services";
import { TextField, Box, CircularProgress, Fade } from "@mui/material";

export function ConfirmTransaction({ row, setOpenSnackbar }) {
  const [loading, setLoading] = React.useState(false);

  const confirm = (data) => {
    setLoading(true);
    const userRef = doc(db, "users", row.userid);
    getDoc(userRef).then((vl) => {
      const {
        btc_balance,
        eth_balance,
        bnb_balance,
        tron_balance,
        usdt_balance,
        usdterc20_balance,
      } = vl.data();

      const switchWalletBalance = (key) => {
        switch (key) {
          case "btc_balance":
            return btc_balance;
          case "eth_balance":
            return eth_balance;
          case "bnb_balance":
            return bnb_balance;
          case "tron_balance":
            return tron_balance;
          case "usdt_balance":
            return usdt_balance;
          case "usdterc20_balance":
            return usdterc20_balance;
          default:
            return btc_balance;
        }
      };

      //get currentbalance
      const currentbalance = switchWalletBalance(row.cointype);
      // get newBalance
      const newbalance = currentbalance - row.amount;

      //update coinbalance
      const usertrxRef = doc(
        db,
        "users",
        row.userid,
        "transactions",
        row.transactionid
      );
      setDoc(
        usertrxRef,
        { pending: false, confirmation: 3 },
        { merge: true }
      ).then(() => {
        const trxRef = doc(db, "transactionswallet", row.uid);
        setDoc(trxRef, { pending: false }, { merge: true }).then(() => {
          addNotification(
            row.userid,
            "Sent",
            `your transaction of ${row.amount} has been successfully confirmed.`
          ).then(() => {
            sendMessage(
              `You have successfully made a transfer with the following details below
              <br />
              <br />Amount: <strong>${row.coin} ${row.cointitle}</strong>
              <br />Sent adrress: ${row.recipient}
              <br />
              <br />See more information about transaction and balance from your dashboard.`,
              "Transaction confirmation",
              row.email,
              `${row.fullname}`
            )
              .then((result) => {
                console.log(result);
                setLoading(false);
                setOpenSnackbar(true);
              })
              .catch((error) => {
                console.log("error", error);
                setLoading(false);
              });
          });
        });
      });
    });
  };

  return (
    <LoadingButton
      disabled={row.pending ? false : true}
      loading={loading}
      variant="contained"
      disableElevation
      onClick={() => {
        confirm(row);
      }}
    >
      confirm
    </LoadingButton>
  );
}

export function UpdateConfirmation({ row }) {
  const [loading, setLoading] = React.useState(false);

  const [count, setCount] = React.useState(row.confirmation);

  const handleChange = (e) => {
    setCount(e.target.value);
  };

  const upadteConfirmation = () => {
    setLoading(true);
    const usertrxRef = doc(
      db,
      "users",
      row.userid,
      "transactions",
      row.transactionid
    );
    setDoc(usertrxRef, { confirmation: parseInt(count) }, { merge: true }).then(
      () => {
        const trxRef = doc(db, "transactionswallet", row.uid);
        setDoc(trxRef, { confirmation: count }, { merge: true }).then(() => {
          setLoading(false);
        });
      }
    );
  };

  return (
    <Box display={"flex"} justifyContent={"space-between"}>
      <Fade
        in={!loading}
        style={{
          transitionDelay: loading ? "0ms" : "800ms",
        }}
        unmountOnExit
      >
        <TextField
          variant="outlined"
          size="small"
          id="Confirmations"
          label="Confirmations"
          type="number"
          value={count}
          name="confirmations"
          onChange={handleChange}
          onBlur={upadteConfirmation}
        />
      </Fade>

      <Fade
        in={loading}
        style={{
          transitionDelay: loading ? "800ms" : "0ms",
        }}
        unmountOnExit
      >
        <CircularProgress thickness={4} size={20} />
      </Fade>
    </Box>
  );
}

export function ConfirmUserTransaction({ id, row, setOpenSnackbar }) {
  const [loading, setLoading] = React.useState(false);

  const confirm = (data) => {
    setLoading(true);
    const userRef = doc(db, "users", id);
    getDoc(userRef).then((vl) => {
      const {
        btc_balance,
        eth_balance,
        bnb_balance,
        tron_balance,
        usdt_balance,
        usdterc20_balance,
      } = vl.data();

      const switchWalletBalance = (key) => {
        switch (key) {
          case "btc_balance":
            return btc_balance;
          case "eth_balance":
            return eth_balance;
          case "bnb_balance":
            return bnb_balance;
          case "tron_balance":
            return tron_balance;
          case "usdt_balance":
            return usdt_balance;
          case "usdterc20_balance":
            return usdterc20_balance;
          default:
            return btc_balance;
        }
      };

      //get currentbalance
      const currentbalance = switchWalletBalance(row.cointype);
      // get newBalance
      const newbalance = currentbalance - row.amount;

      //update coinbalance
      updateUserBalance(id, row.cointype, newbalance).then(() => {
        const usertrxRef = doc(db, "users", id, "transactions", row.uid);
        setDoc(
          usertrxRef,
          { pending: false, confirmation: 3 },
          { merge: true }
        ).then(() => {
          addNotification(
            row.userid,
            "Sent",
            `your transaction of ${row.amount} has been successfully confirmed.`
          ).then(() => {
            sendMessage(
              `You have successfully made a transfer with the following details below
              <br />
              <br />Amount: <strong>${row.coin} ${row.cointitle}</strong>
              <br />Sent adrress: ${row.recipient}
              <br />
              <br />See more information about transaction and balance from your dashboard.`,
              "Transaction confirmation",
              row.email,
              `${row.fullname}`
            )
              .then((result) => {
                console.log(result);
                setLoading(false);
                setOpenSnackbar(true);
              })
              .catch((error) => {
                console.log("error", error);
                setLoading(false);
              });
          });
        });
      });
    });
  };

  return (
    <LoadingButton
      disabled={row.pending ? false : true}
      loading={loading}
      variant="contained"
      disableElevation
      onClick={() => {
        confirm(row);
      }}
    >
      confirm
    </LoadingButton>
  );
}
export function UpdateUserConfirmation({ id, row }) {
  const [loading, setLoading] = React.useState(false);

  const [count, setCount] = React.useState(row.confirmation);

  const handleChange = (e) => {
    setCount(e.target.value);
  };

  const upadteConfirmation = () => {
    setLoading(true);
    const usertrxRef = doc(db, "users", id, "transactions", row.uid);
    setDoc(usertrxRef, { confirmation: parseInt(count) }, { merge: true }).then(
      () => {
        setLoading(false);
      }
    );
  };

  return (
    <Box display={"flex"} justifyContent={"space-between"}>
      <Fade
        in={!loading}
        style={{
          transitionDelay: loading ? "0ms" : "800ms",
        }}
        unmountOnExit
      >
        <TextField
          variant="outlined"
          size="small"
          id="Confirmations"
          label="Confirmations"
          type="number"
          value={count}
          name="confirmations"
          onChange={handleChange}
          onBlur={upadteConfirmation}
        />
      </Fade>

      <Fade
        in={loading}
        style={{
          transitionDelay: loading ? "800ms" : "0ms",
        }}
        unmountOnExit
      >
        <CircularProgress thickness={4} size={20} />
      </Fade>
    </Box>
  );
}
