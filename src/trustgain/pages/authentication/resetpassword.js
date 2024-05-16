import LoadingButton from "@mui/lab/LoadingButton";
import {
  Grid,
  Link,
  Snackbar,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { navigate } from "@reach/router";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { auth } from "../../../config/firebase";
import Logo from "./logo";
import { sendPasswordResetEmail } from "firebase/auth";

const AlertCustom = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useStyles = () => {
  return {
    paper: {
      marginTop: useTheme().spacing(2),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    margintop: {
      marginTop: useTheme().spacing(4),
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: useTheme().spacing(1),
    },
    submit: {
      margin: useTheme().spacing(3, 0, 2),
    },
  };
};

export default function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const [values, setValues] = React.useState({
    email: "",
  });

  const [open, setOpen] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen({ ...open, open: false });
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const reset = (event) => {
    event.preventDefault();
    setLoading(true);

    sendPasswordResetEmail(auth, values.email)
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
    <>
      <div style={classes.paper}>
        <Logo />
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <form style={classes.form} onSubmit={reset}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            name="email"
            fullWidth
            id="email"
            label="Email"
            onChange={handleChange}
            autoComplete="email"
            autoFocus
          />

          <LoadingButton
            sx={{ mt: 2 }}
            type="submit"
            fullWidth
            loading={loading}
            variant="contained"
            color="primary"
            disableElevation
          >
            {"Reset password"}
          </LoadingButton>
        </form>
        <Grid container spacing={3}>
          <Grid mt={4} item>
            <Link
              component="button"
              onClick={() => navigate("./login")}
              color="textPrimary"
            >
              {`Sign up`}
            </Link>
          </Grid>
          <Grid mt={4} item>
            <Link
              component="button"
              onClick={() => navigate("./signup")}
              color="textPrimary"
            >
              {`Create new account`}
            </Link>
          </Grid>
        </Grid>
      </div>
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
    </>
  );
}
