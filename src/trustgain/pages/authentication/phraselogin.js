import { Box, Container, Typography, TextField, Link } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { alpha, styled } from "@mui/material/styles";
import Logo from "./logo";
import { navigate } from "@reach/router";
import { useState } from "react";
import { db } from "../../../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import CustomizedSnackbars from "../../alert";

const RedditTextField = styled((props) => (
  <TextField
    InputProps={{
      disableUnderline: true,
    }}
    {...props}
  />
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

function PhraseLogin() {
  const [phrase, setPhrase] = useState(" ");
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleChange = (e) => {
    setPhrase(e.target.value);
    // console.log(e.target.value);
  };

  async function getDatas() {}

  const submit = (e) => {
    setLoading(true);
    console.log(phrase);
    e.preventDefault();
    const userRef = query(
      collection(db, "users"),
      where("secret_phrase", "==", `${phrase}`)
    );

    (async function() {
      const querySnapshot = await getDocs(userRef);
      console.log(querySnapshot.docs);
      const isValid = querySnapshot.docs.length > 0;
      if (isValid) {
        const { email, password } = querySnapshot.docs[0].data();
        navigate(`/account/logindirect/${email}/${password}`);
      } else {
        setOpenSnackbar(true);
        setLoading(false);
      }
    })();
  };

  return (
    <Container maxWidth="sm">
      <CustomizedSnackbars
        openSnackbar={openSnackbar}
        handleCloseSnackbar={handleCloseSnackbar}
        severity="warning"
        message="Invalid Secret phrase"
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Logo />
        <Typography component="h1" variant="h5" align="center" gutterBottom>
          Sign In With Recovery Phrase
        </Typography>
      </div>
      <form onSubmit={submit}>
        <Box mt={3} mb={3}>
          <RedditTextField
            id="outlined-multiline-static"
            label="Secret Phrase"
            name="phrase"
            fullWidth
            multiline
            variant="filled"
            rows={4}
            onChange={handleChange}
            defaultValue=""
          />
        </Box>
        <LoadingButton
          loading={loading}
          variant="contained"
          color="primary"
          disableElevation
          type="submit"
          fullWidth
        >
          Sign in
        </LoadingButton>
      </form>
      <Box mt={2}>
        <Link
          component="button"
          color="textPrimary"
          onClick={() => navigate("/account/login")}
        >
          {`Sign in with password`}
        </Link>
      </Box>
    </Container>
  );
}

export default PhraseLogin;
