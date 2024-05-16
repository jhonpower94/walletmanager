import { Box, Typography } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { navigate } from "@reach/router";
import {
  browserLocalPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React from "react";
import { auth } from "../../../config/firebase";

function LoginDirect({ email, password }) {
  React.useEffect(() => {
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        return signInWithEmailAndPassword(auth, email, password);
      })
      .then((userCredential) => {
        // Signed in

        navigate("/");
        // ...
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
    console.log(`${email} ${password}`);
  });

  return (
    <>
      <Backdrop
        sx={{
          flexDirection: "column",
          backgroundColor: (theme) => theme.palette.background.paper,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={true}
      >
        <CircularProgress color="primary" />
        <Box mt={1}>
          <Typography variant="h6">Signing in...</Typography>
        </Box>
      </Backdrop>
    </>
  );
}

export default LoginDirect;
