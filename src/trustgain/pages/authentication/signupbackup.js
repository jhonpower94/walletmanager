import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Button,
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
import PropTypes from "prop-types";
import React from "react";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { countrylist } from "../../../config/countrylist";
import {
  auth,
  createUserWithEmailAndPassword,
  storage,
} from "../../../config/firebase";
import { addUsers, generateAccounts } from "../../../config/services";
import { loading$ } from "../../redux/action";
import Logo from "./logo";
import { useStyles } from "../../styles";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import { useDropzone } from "react-dropzone";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc } from "firebase/firestore";

const maritalStatus = ["Single", "Married", "Divorced", "Widowed", "Other"];
const gender = ["Male", "Female", "Other"];
const accountype = ["Savings", "Cheking"];

//const loggedIn$ = authState(auth).pipe(filter((user) => !!user));

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      format={`+##########`}
      allowEmptyFormatting
      mask="_"
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function SignUp() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);

  const [values, setValues] = React.useState({
    numberformat: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    showPassword: false,
    country: "United States", // set up with reactlocalstorage
    countrycode: "US",
    mobilecode: "+1",
    marital: "Single",
    accountype: "Savings",
    gender: "Male",
    birthdate: new Date("2014-08-18T21:11:54"),
    imageid: { image: "", loading: false },
    image: "https://image.com",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    console.log(event.target.value);
  };

  const handleChangeDate = (newValue) => {
    setValues({
      ...values,
      birthdate: newValue,
    });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const chageCountryCode = (countrycode, dialcode) => {
    setValues({
      ...values,
      countrycode: countrycode,
      mobilecode: dialcode,
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setValues({
        ...values,
        imageid: { image: "", loading: true },
      });
      const storageRef = ref(storage, `images/${acceptedFiles[0].name}`);
      const uploadTask = uploadBytesResumable(storageRef, acceptedFiles[0]);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          setValues({
            ...values,
            imageid: { image: "", loading: false },
          });
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setValues({
              ...values,
              imageid: { image: `${downloadURL}`, loading: false },
            });
          });
        }
      );
    },
  });

  const submitForm = (event) => {
    event.preventDefault();
    dispatch(loading$());
    const datas = {
      numberformat: values.numberformat,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      wallet_balance: 0,
      country: values.country,
      mobilecode: values.mobilecode,
      referrer: false,
      countrycode: values.countrycode,
      paymentallowed: 2,
      marital: values.marital,
      gender: values.gender,
      birthdate: values.birthdate,
      imageid: values.imageid.image,
      image: values.image,
      activated: false,
      Verificationstatus: false,
    };

    createUserWithEmailAndPassword(auth, datas.email, datas.password)
      .then((user) => {
        console.log("user created");
        const userid = user.user.uid;
        addUsers(userid, datas).then(() => {
          dispatch(loading$());
          navigate("dashboard/account");
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        dispatch(loading$());
      });
  };

  return (
    <div style={classes.paper}>
      <Logo />
      <Typography component="h1" variant="h5" gutterBottom>
        Sign up
      </Typography>
      <Typography>
        Already have an account? &nbsp;
        <Link
          component="button"
          variant="body2"
          onClick={() => navigate("/")}
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
              onChange={handleChange}
            >
              {countrylist.map((ct, index) => (
                <MenuItem
                  key={index}
                  value={ct.name}
                  onClick={() => chageCountryCode(ct.code, ct.dial_code)}
                >
                  {ct.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              fullWidth
              label="Mobile"
              value={values.numberformat}
              onChange={handleChange}
              name="numberformat"
              id="formatted-numberformat-input"
              InputProps={{
                inputComponent: NumberFormatCustom,
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              select
              required
              variant="outlined"
              label="Marital status"
              name="marital"
              value={values.marital}
              onChange={handleChange}
            >
              {maritalStatus.map((ms, index) => (
                <MenuItem
                  key={index}
                  value={ms}
                  // onClick={() => chageCountryCode(ms, ms)}
                >
                  {ms}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              select
              required
              variant="outlined"
              label="Gender"
              name="gender"
              value={values.gender}
              onChange={handleChange}
            >
              {gender.map((ms, index) => (
                <MenuItem
                  key={index}
                  value={ms}
                  //  onClick={() => chageCountryCode(ms, ms)}
                >
                  {ms}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              select
              required
              variant="outlined"
              label="Select account type"
              name="accountype"
              value={values.accountype}
              onChange={handleChange}
            >
              {accountype.map((at, index) => (
                <MenuItem key={index} value={at}>
                  {at}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDatePicker
                label="Date of birth"
                inputFormat="MM/dd/yyyy"
                value={values.birthdate}
                onChange={handleChangeDate}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              value={values.imageid.image}
              label="ID Verification"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <div {...getRootProps({ className: "dropzone" })}>
                      <input {...getInputProps()} />
                      <LoadingButton
                        loading={values.imageid.loading}
                        variant="contained"
                        disableElevation
                      >
                        Choose file
                      </LoadingButton>
                    </div>
                  </InputAdornment>
                ),
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
