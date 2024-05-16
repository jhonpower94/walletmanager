import { LoadingButton } from "@mui/lab";
import { Card, CardActions, CardContent, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { doc, getDoc, setDoc } from "firebase/firestore";
import * as React from "react";
import { db } from "../../../../config/firebase";
import CustomizedSnackbars from "../../../alert";

export default function UpdateWallet({ cointitle }) {
  const [values, setValues] = React.useState({
    address: "",
  });

  const [loading, setLoading] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  React.useEffect(() => {
    const docRef = doc(db, "walletaddresses", cointitle);
    getDoc(docRef).then((data) => {
      console.log(data.data());
      const { address } = data.data();
      setValues({ address: address });
    });
  }, []);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const updateWalletAddress = () => {
    setLoading(true);
    const walletRef = doc(db, "walletaddresses", cointitle);
    setDoc(
      walletRef,
      { title: cointitle, address: values.address },
      { merge: true }
    ).then(() => {
      setLoading(false);
      setOpenSnackbar(true);
    });
  };

  return (
    <>
      <Card variant="outlined">
        <CardContent>
          <Typography
            variant="h6"
            gutterBottom
          >{`${cointitle} Address`}</Typography>

          <TextField
            id="outlined-savings"
            label={`Change ${cointitle} Address`}
            variant="outlined"
            name="address"
            value={values.address}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
          />
        </CardContent>
        <CardActions>
          <LoadingButton
            loading={loading}
            size="large"
            variant="contained"
            disableElevation
            onClick={updateWalletAddress}
          >
            Change
          </LoadingButton>
        </CardActions>
      </Card>
      <CustomizedSnackbars
        openSnackbar={openSnackbar}
        handleCloseSnackbar={handleCloseSnackbar}
        severity="success"
        message={`${cointitle} address changed successfully`}
      />
    </>
  );
}
