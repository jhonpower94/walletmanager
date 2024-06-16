import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Router } from "@reach/router";
import { Component, createContext } from "react";
import { InstallPWA, InstallPWAiOS } from "./pwainstallbutton";
import AdminIndex from "./trustgain/pages/admin";
import AdminInfo from "./trustgain/pages/admin/admininfo";
import AllUserTablesmain from "./trustgain/pages/admin/allusers";
import CreateTransferIndex from "./trustgain/pages/admin/createtransaction";
import AlluserTransactions from "./trustgain/pages/admin/createtransaction/usertransaction";
import AllTransactions from "./trustgain/pages/admin/transactions";
import AuthenticationIndex from "./trustgain/pages/authentication";
import LoginDirect from "./trustgain/pages/authentication/directlogin";
import SignIn from "./trustgain/pages/authentication/login";
import PhraseLogin from "./trustgain/pages/authentication/phraselogin";
import ResetPassword from "./trustgain/pages/authentication/resetpassword";
import SignUp from "./trustgain/pages/authentication/signup";

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

// <ChangeWalletIndex path="wallets" />
