import React, { useEffect, useState } from "react";
import { getUserInfo } from "../../../../config/services";
import CreateTransaction from "./createtransaction";
import { Grid } from "@mui/material";

const CreateTransferIndex = ({ id }) => {
  const [userInfo, setUser] = useState({});
  let [balanceArray, setbalanceArray] = useState([
    { balance: 0, title: "BTC", cointype: "btc_balance" },
  ]);

  useEffect(() => {
    getUserInfo(id).subscribe((data) => {
      setUser(data);
      console.log(data);
      const {
        btc_balance,
        bnb_balance,
        tron_balance,
        eth_balance,
        usdt_balance,
        usdterc20_balance,
      } = data;
      setbalanceArray([
        { balance: btc_balance, title: "BTC", cointype: "btc_balance" },
        { balance: bnb_balance, title: "BNB", cointype: "bnb_balance" },
        { balance: tron_balance, title: "TRX", cointype: "tron_balance" },
        { balance: eth_balance, title: "ETH", cointype: "eth_balance" },
        {
          balance: usdt_balance,
          title: "USDT (TRC20)",
          cointype: "usdt_balance",
        },
        {
          balance: usdterc20_balance,
          title: "USDT(ERC20)",
          cointype: "usdterc20_balance",
        },
      ]);
    });
  }, []);

  return (
    <Grid container spacing={4}>
      {balanceArray.map((balance, index) => (
        <Grid item xs={12} md={6}>
          <CreateTransaction
            userInfo={userInfo}
            id={id}
            balance={balance.balance}
            cointitle={balance.title}
            cointype={balance.cointype}
            key={index}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default CreateTransferIndex;
