import { Typography } from "@mui/material";
import { navigate } from "@reach/router";
import React from "react";
import { useSelector } from "react-redux";
import { CryptoCurrencyFormat, CurrencyFormat } from "../../config/services";
import "../style.scoped.css"

function AllCoins() {
  const walletData = useSelector((state) => state.walletsData);

  return (
    <>
      {walletData.map((coin, index) => (
        <div key={index} className="row">
          <div
            className="col-sm-12 col-lg-12 col-xl-12"
            onClick={() =>
              navigate("coin", {
                state: {
                  coin: walletData[index],
                },
              })
            }
          >
            <div className="card">
              <div className="card-body">
                <div className="clearfix">
                  <div className="float-right">
                    <div
                      className="font-weight-bold tx-15 text-black mb-1"
                      id="user_usd_balance_29462"
                      style={{ textAlign: "right" }}
                    >
                      <Typography sx={{fontWeight: "bold"}}>
                        <CurrencyFormat
                          amount={coin.balance}
                          prefix="$"
                          seperator={true}
                        />
                      </Typography>
                    </div>
                    <h3
                      className="tx-16 text-muted mb-0"
                      id="user_balance_29462"
                    >
                      {coin.balancecoin == 0 ? (
                        `0.00 ${coin.code}`
                      ) : (
                        <CryptoCurrencyFormat
                          amount={coin.balancecoin}
                          suffix={` ${coin.code}`}
                        />
                      )}
                    </h3>
                  </div>
                  <div className="float-left">
                    <Typography sx={{ fontWeight: "bold" }}>
                      {coin.coinname}
                    </Typography>
                    <div className="">
                      <img
                        className="w-6 h-6"
                        src={require(`${coin.image}`)}
                        alt="coins"
                      />
                    </div>
                  </div>
                </div>
                <div className="text-muted mb-0">
                  <span className="badge badge-black" id="coin_value_29462">
                    <Typography sx={{ fontWeight: "bold" }}>
                      <CurrencyFormat
                        amount={coin.price}
                        prefix="$"
                        seperator={true}
                      />
                    </Typography>
                  </span>
                  <span className="badge">
                    <font color={coin.difference < 0 ? "red" : "green"}>
                      <Typography variant="subtitle2" color="inherit">
                        {coin.difference.toFixed(2)}%
                      </Typography>
                    </font>
                  </span>
                  <span className="badge badge-black" id="update_29462" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default AllCoins;
