import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  MenuItem,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { navigate } from "@reach/router";
import React from "react";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { countrylist } from "../../../config/countrylist";
import { auth, createUserWithEmailAndPassword } from "../../../config/firebase";
import { addUsers, sendMessage } from "../../../config/services";
import { loading$ } from "../../redux/action";
import { useStyles } from "../../styles";
import Logo from "./logo";
import CustomizedSnackbars from "../../alert";
import { Timestamp } from "firebase/firestore";

//const loggedIn$ = authState(auth).pipe(filter((user) => !!user));

export default function SignUp() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);
  const [alertMessage, setalertMessage] = React.useState({
    message: "",
    severity: "success",
  });
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const [values, setValues] = React.useState({
    numberformat: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    showPassword: false,
    country: "United States", // set up with reactlocalstorage
    mobilecode: "+1",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const submitForm = (event) => {
    event.preventDefault();
    dispatch(loading$());
    const datas = {
      ...values,
      btc_balance: 0,
      bnb_balance: 0,
      tron_balance: 0,
      eth_balance: 0,
      usdt_balance: 0,
      usdterc20_balance: 0,
      timestamp: Timestamp.now(),
    };

    createUserWithEmailAndPassword(auth, datas.email, datas.password)
      .then((user) => {
        console.log("user created");
        const userid = user.user.uid;
        addUsers(userid, datas).then(() => {
          setalertMessage({
            severity: "success",
            message: "Sign up successful redirecting to login...",
          });
          setOpenSnackbar(true);

          sendMessage(
            `<strong>Welcome to trustgain wallet, Your registration was successful, and your account is activated, thank you.`,
            "Account Registration",
            datas.email,
            `${values.firstName} ${values.lastName}`
          )
            .then(() => {
              setTimeout(() => {
                dispatch(loading$());
                navigate("/phrase");
              }, 7000);
            })
            .catch(() => {
              setTimeout(() => {
                dispatch(loading$());
                navigate("/");
              }, 7000);
            });
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        setalertMessage({
          message: error.message,
          severity: "warning",
        });
        setOpenSnackbar(true);
        console.log(errorMessage);
        dispatch(loading$());
      });
  };

  return (
    <div style={classes.paper}>
      <CustomizedSnackbars
        openSnackbar={openSnackbar}
        handleCloseSnackbar={handleCloseSnackbar}
        severity={alertMessage.severity}
        message={alertMessage.message}
      />
      <Logo />
      <Typography component="h1" variant="h5" gutterBottom>
        Sign up
      </Typography>
      <Typography>
        Already have an account? &nbsp;
        <Link
          component="button"
          variant="body2"
          onClick={() => navigate("/account/login")}
          color="primary"
        >
          {`Sign in`}
        </Link>
      </Typography>

      <form style={classes.form} onSubmit={submitForm}>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={6}>
            <TextField
              autoComplete="fname"
              name="firstName"
              variant="outlined"
              required
              fullWidth
              id="firstName"
              label="First name"
              autoFocus
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="lastName"
              label="Last name"
              name="lastName"
              autoComplete="lname"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                name="password"
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {values.showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                required
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              select
              required
              variant="outlined"
              label="Country"
              name="country"
              value={values.country}
              id="standard-select-currency"
              onChange={(e) => {
                var result = countrylist.filter(function(o) {
                  return o.name == e.target.value;
                });
                setValues({
                  ...values,
                  [e.target.name]: e.target.value,
                  mobilecode: result[0].dial_code,
                });
              }}
            >
              {countrylist.map((ct, index) => (
                <MenuItem key={index} value={ct.name}>
                  {ct.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <NumberFormat
              format={`${values.mobilecode} ### ### ####`}
              variant="outlined"
              fullWidth
              label="Mobile"
              name="numberformat"
              allowEmptyFormatting
              onChange={handleChange}
              customInput={TextField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox value="allowExtraEmails" color="primary" required />
              }
              label="I agree to terms, privacy and policy"
            />
          </Grid>
        </Grid>
        <LoadingButton
          type="submit"
          fullWidth
          loading={loading.loading}
          variant="contained"
          color="primary"
          disableElevation
        >
          {"Sign up"}
        </LoadingButton>
      </form>
    </div>
  );
}

/*
   <Grid item xs={6}>
            <PatternFormat
              valueIsNumericString
              allowEmptyFormatting
              format="####"
              mask="_"
              customInput={TextField}
              label="Transaction Pin"
              name="pincode"
              required
              onChange={handleChange}
              helperText="Enter 4 digit pin"
            />
          </Grid>
*/
