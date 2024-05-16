import { AccountBalanceWalletRounded } from "@mui/icons-material";
import { Grid } from "@mui/material";
import { navigate } from "@reach/router";
import React from "react";
import { useSelector } from "react-redux";
import { CurrencyFormat } from "../../config/services";
import { CustomButtonWhite } from "../custom";
import "../style.scoped.css";
import AllCoins from "./allcoins";

function HomeIndex() {
  const userinfo = useSelector((state) => state.useInfos);
  return (
    <>
      <div className="page">
        <div className="main-content app-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12 col-lg-8 col-xl-12">
                <div className="card bg-info card-img-holder text-white">
                  <div className="card-body">
                    <div className="clearfix" style={{ borderRadius: 30 }}>
                      <div className="float-right">
                        <AccountBalanceWalletRounded
                          fontSize="large"
                          sx={{ color: "#ffffff" }}
                        />
                      </div>
                      <div className="float-left">
                        <p className="mb-1 text-left">Total Balance</p>
                        <div className="">
                          <h3
                            className="font-weight-semibold text-right mb-3"
                            id="sum_user_balance"
                            style={{ size: 50 }}
                          >
                            <CurrencyFormat
                              amount={userinfo.totalBalance}
                              prefix={"$"}
                              seperator={true}
                            />
                          </h3>
                        </div>
                      </div>
                    </div>
                    <br />
                    <div className="card-body text-center">
                      <Grid container spacing={1} justifyContent={"center"}>
                        <Grid item xs={6} md={6}>
                          <CustomButtonWhite
                            fullWidth
                            onClick={() => navigate("allcoin")}
                            variant="contained"
                            disableRipple
                          >
                            Receive
                          </CustomButtonWhite>
                        </Grid>
                        <Grid item xs={6} md={6}>
                          <CustomButtonWhite
                            fullWidth
                            onClick={() => navigate("allcoin")}
                            variant="contained"
                            disableRipple
                          >
                            Send
                          </CustomButtonWhite>
                        </Grid>
                        <Grid item xs={6} md={6}>
                          <CustomButtonWhite
                            sx={{ mt: 2 }}
                            fullWidth
                            variant="contained"
                            disableRipple
                            onClick={() =>
                              window.open(
                                "https://www.kraken.com",
                                "_blank"
                              )
                            }
                          >
                            Buy
                          </CustomButtonWhite>
                        </Grid>
                      </Grid>
                    </div>
                    <div className="media" />
                  </div>
                </div>
              </div>
            </div>
            <AllCoins />
          </div>
          {/* /row  */}
        </div>
        {/* Container closed */}
      </div>
    </>
  );
}

export default HomeIndex;
