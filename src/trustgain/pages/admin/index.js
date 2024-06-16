import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { navigate } from "@reach/router";
import { doc } from "firebase/firestore";
import PropTypes from "prop-types";
import * as React from "react";
import { docData } from "rxfire/firestore";
import { auth, db, onAuthStateChanged } from "../../../config/firebase";

const drawerWidth = 240;

function AdminIndex(props) {
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/account/admin/manager");
      } else {
        const querydoc = doc(db, `users/${user.uid}`);
        docData(querydoc).subscribe((userData) => {
          console.log(userData.admin);
          if (userData.admin) {
            console.log("verified");
          } else {
            navigate("/account/admin/manager");
          }
        });
      }
    });
  }, []);

  return (
    <Box
      sx={{
        display: {
          sm: "block",
          md: "flex",
        },
      }}
    >
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Stackcoin admin
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}

AdminIndex.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default AdminIndex;
