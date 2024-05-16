import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
    Box,
    Button,
    Container,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { navigate } from "@reach/router";
import { generate } from "random-words";
import { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { useSelector } from "react-redux";
import { addUsers } from "../../config/services";
import CustomizedSnackbars from "../alert";

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

function PhrasePage() {
  const userinfo = useSelector((state) => state.useInfos);
  const [phrase, setPhrase] = useState(userinfo.secret_phrase);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const generatePhrase = () => {
    const secretPhrase = generate({ exactly: 12, join: " " });
    addUsers(userinfo.id, { secret_phrase: secretPhrase }).then(() => {
      setPhrase(secretPhrase);
      console.log(secretPhrase);
    });
  };

  const redirect = () => navigate("/");

  const copied = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  useEffect(() => {
    console.log(userinfo.secret_phrase);
  });

  return (
    <Container maxWidth="sm">
      <CustomizedSnackbars
        openSnackbar={openSnackbar}
        handleCloseSnackbar={handleCloseSnackbar}
        severity="success"
        message="Secret phrase copied"
      />
      <Paper elevation={0} sx={{ padding: 2 }}>
        <Typography variant="h5" gutterBottom>
          Your recovery phrase
        </Typography>
        <Typography variant="body1">
          Save these 12 words in a safe place. Do not share them with anyone,
          Anyone with your recovery phrase can steal your funds.
        </Typography>
        <Box mt={3} mb={1} sx={{ filter: "blur(2px})" }}>
          <RedditTextField
            id="outlined-multiline-static"
            label="Secret Phrase"
            fullWidth
            multiline
            variant="filled"
            rows={4}
            value={phrase}
          />
        </Box>
        <CopyToClipboard text={phrase} onCopy={copied}>
          <Button startIcon={<ContentCopyIcon />}>Copy recovery phrase</Button>
        </CopyToClipboard>
        <Box mt={3}>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            onClick={phrase ? redirect : generatePhrase}
            fullWidth
          >
            {phrase ? "Confirm" : "Generate"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default PhrasePage;
