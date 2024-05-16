import * as React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Alert,
  AlertTitle,
  Container,
  Grid,
  Snackbar,
  Typography,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useState } from "react";
import { useSelector } from "react-redux";
import { CustomAlert } from "../alert";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../config/firebase";

const AlertCustom = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Settings({ action }) {
  const [open, setOpen] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const handleClick = () => {
    setOpen({ ...open, open: true });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen({ ...open, open: false });
  };

  const [loading, setLoading] = useState(false);
  const userinfo = useSelector((state) => state.useInfos);

  const reset = () => {
    setLoading(true);

    sendPasswordResetEmail(auth, userinfo.email)
      .then(() => {
        setOpen({ ...open, open: true });
        setLoading(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoading(false);
        console.log(errorMessage);
      });
  };

  return (
    <Container maxWidth="sm">
      <CustomAlert>
        <AlertTitle> {`Reset your account ${action} `}</AlertTitle>
        <p>
          {`a ${action} reset link will be sent to your email address `}
          <strong>{userinfo.email}</strong>
        </p>
        <p>
          {`please click on the reset ${action} button below, check your email and follow the link in order to reset your ${action}.`}
        </p>
        <LoadingButton
          loading={loading}
          variant="contained"
          disableElevation
          onClick={reset}
          color="success"
        >
          {`Reset ${action}`}
        </LoadingButton>
      </CustomAlert>

      <Snackbar
        anchorOrigin={{ vertical: open.vertical, horizontal: open.horizontal }}
        open={open.open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <AlertCustom
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {"Request was successful, please check your email"}
        </AlertCustom>
      </Snackbar>
    </Container>
  );
}

export default Settings;
