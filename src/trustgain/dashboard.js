import { Backdrop, CssBaseline } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import { navigate } from "@reach/router";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import CustomLoader from "../component/loader";
import { auth } from "../config/firebase";
import { convert, getNotification, getUserInfo } from "../config/services";
import AppbarMain from "./appbar/appbar";
import DrawerMenu from "./appbar/drawer";
import { userinfo$, walletData$ } from "./redux/action";

const drawerWidth = 300;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [loading, setLoading] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const dispatch = useDispatch();
  let totalbalance = [];

  React.useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //get notifications
        getNotification(user.uid);
        //get user infos
        getUserInfo(user.uid).subscribe((userData) => {
          const {
            btc_balance,
            bnb_balance,
            tron_balance,
            eth_balance,
            usdt_balance,
            usdterc20_balance,
          } = userData;

          //totalbalance
          totalbalance = [
            btc_balance,
            bnb_balance,
            tron_balance,
            eth_balance,
            usdt_balance,
            usdterc20_balance,
          ].reduce((prv, cur) => {
            return prv + cur;
          }, 0);

          dispatch(
            userinfo$({ ...userData, id: user.uid, totalBalance: totalbalance })
          );

          //get crypto info
          axios
            .get(
              "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cbinancecoin%2Ctron%2Ctether%2C&vs_currencies=usd&include_24hr_change=true"
            )
            .then((res) => {
              //console.log(res.data);

              (async function() {
                await convert.ready(); //Wait for the initial cache to load

                dispatch(
                  walletData$([
                    {
                      coinname: "BITCOIN",
                      cointype: "btc_balance",
                      price: res.data.bitcoin.usd,
                      difference: res.data.bitcoin.usd_24h_change,
                      balance: btc_balance,
                      balancecoin: convert.USD.BTC(`${btc_balance}`),
                      code: "BTC",
                      image: "./images/coins/btc.svg",
                      address: "bc1qvcny9273tekt7cg85k9kt2g5k0dhpwdrjp356x",
                    },
                    {
                      coinname: "ETHERUEM",
                      cointype: "eth_balance",
                      price: res.data.ethereum.usd,
                      difference: res.data.ethereum.usd_24h_change,
                      balance: eth_balance,
                      balancecoin: convert.USD.ETH(`${eth_balance}`),
                      code: "ETH",
                      image: "./images/coins/eth.svg",
                      address: "0x2F39B4eC094DF801837b338211933E2d425fb332",
                    },
                    {
                      coinname: "BNB SMART",
                      cointype: "bnb_balance",
                      price: res.data.binancecoin.usd,
                      difference: res.data.binancecoin.usd_24h_change,
                      balance: bnb_balance,
                      balancecoin: convert.USD.BNB(`${bnb_balance}`),
                      code: "BNB",
                      image: "./images/coins/bnb.svg",
                      address: "bnb13m39rjwfj7kjpeh627d8hmfx2k9xgwckvm2lmn",
                    },
                    {
                      coinname: "TRON",
                      cointype: "tron_balance",
                      price: res.data.tron.usd,
                      difference: res.data.tron.usd_24h_change,
                      balance: tron_balance,
                      balancecoin: convert.USD.TRX(`${tron_balance}`),
                      code: "TRX",
                      image: "./images/coins/trx.svg",
                      address: "TZ9YZp1CjnL5o4YFifhWGwE6DdVAvmebJg",
                    },
                    {
                      coinname: "USDT(TRC20)",
                      cointype: "usdt_balance",
                      price: res.data.tether.usd,
                      difference: res.data.tether.usd_24h_change,
                      balance: usdt_balance,
                      balancecoin: convert.USD.USDT(`${usdt_balance}`),
                      code: "USDT(TRC20)",
                      image: "./images/coins/usdt.svg",
                      address: "TZ9YZp1CjnL5o4YFifhWGwE6DdVAvmebJg",
                    },
                    {
                      coinname: "USDT(ERC20)",
                      cointype: "usdterc20_balance",
                      price: res.data.tether.usd,
                      difference: res.data.tether.usd_24h_change,
                      balance: usdterc20_balance,
                      balancecoin: convert.USD.USDT(`${usdterc20_balance}`),
                      code: "USDT(ERC20)",
                      image: "./images/coins/usdt(erc20).svg",
                      address: "0x2F39B4eC094DF801837b338211933E2d425fb332",
                    },
                  ])
                );
              })().then(() => {
                setLoading(false);
              });
            })
            .catch((error) => console.log(error));
        });
      } else {
        navigate("./account/login");
      }
    });
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = <DrawerMenu action={handleDrawerToggle} />;

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <React.Fragment>
      <CssBaseline />
      <Box
        sx={{
          display: {
            sm: "block",
            md: "flex",
          },
        }}
      >
        <AppbarMain handleDrawer={handleDrawerToggle} />
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,

                // backgroundColor: "#0d47a1",
              },
            }}
          >
            {drawer}
          </Drawer>

          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                // backgroundColor: "#0d47a1",
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            pt: 2,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />

          {props.children}
        </Box>
      </Box>
      <Backdrop
        sx={{
          backgroundColor: "#ffffffcf",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={loading}
      >
        <CustomLoader />
      </Backdrop>
    </React.Fragment>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
