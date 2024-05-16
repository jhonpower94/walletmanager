import { Container, Typography } from "@mui/material";
import { navigate } from "@reach/router";
import React from "react";
import { useSelector } from "react-redux";
import { CurrencyFormat } from "../../config/services";
import "../style.scoped.css";

function AllCoinsAction() {
  const walletData = useSelector((state) => state.walletsData);

  return (
    <Container maxWidth="lg">
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
            <a>
              <div className="card">
                <div className="card-body">
                  <div className="clearfix">
                    <div className="float-right">
                      <h3
                        className="font-weight-bold tx-15 text-black"
                        id="user_usd_balance_29462"
                      >
                        <CurrencyFormat
                          amount={coin.balance}
                          prefix="$"
                          seperator={true}
                        />
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
                </div>
              </div>
            </a>
          </div>
        </div>
      ))}
    </Container>
  );
}

export default AllCoinsAction;
