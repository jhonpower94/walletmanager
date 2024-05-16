import { Card, CardActions, CardContent, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import * as React from "react";
import NumberFormat from "react-number-format";
import {
  CurrencyFormat,
  updateUserBalance,
  addTransfer,
  sendMessage,
} from "../../../../config/services";
import CustomizedSnackbars from "../../../alert";
import { LoadingButton } from "@mui/lab";

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
});

NumberFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function CreateTransaction({
  userInfo,
  id,
  balance,
  cointitle,
  cointype,
}) {
  const [values, setValues] = React.useState({
    amount: 0,
    date: "",
  });

  const [loading, setLoading] = React.useState({
    credit: false,
    debit: false,
  });
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  React.useEffect(() => {}, []);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    console.log(event.target.value);
  };

  const updateBalance = (amount, trnsType) => {
    updateUserBalance(id, cointype, amount).then(() => {
      addTransfer(id, {
        cointitle: cointitle,
        amount: Number(values.amount),
        transaction_type: trnsType,
      }).then(() => {
        sendMessage(
          `
          you have recieved a ${trnsType} to your ${cointitle} wallet<br/>
          <br />
         ${trnsType} Amount: <Strong>$${values.amount}</strong>
           
        `,
          `${trnsType}`,
          `${userInfo.email}`,
          `${userInfo.lastName}`
        );
        console.log("transfer created");
        setOpenSnackbar(true);
        setLoading({
          credit: false,
          debit: false,
        });
      });
    });
  };

  return (
    <>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6">{cointitle}</Typography>
          <Typography variant="h6" mb={2}>
            balance:{" "}
            <CurrencyFormat amount={balance} prefix={"$"} seperator={true} />
          </Typography>
          <TextField
            id="outlined-savings"
            label="Amount"
            variant="outlined"
            name="amount"
            value={values.amount}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
            InputProps={{
              inputComponent: NumberFormatCustom,
            }}
            focused
          />
        </CardContent>
        <CardActions>
          <LoadingButton
            loading={loading.credit}
            size="large"
            variant="contained"
            disableElevation
            onClick={() => {
              setLoading({
                ...loading,
                credit: true,
              });
              updateBalance(Number(balance) + Number(values.amount), "Credit");
            }}
          >
            Credit
          </LoadingButton>
          <LoadingButton
            loading={loading.debit}
            size="large"
            variant="contained"
            disableElevation
            onClick={() => {
              setLoading({
                ...loading,
                debit: true,
              });
              updateBalance(Number(balance) - Number(values.amount), "Debit");
            }}
          >
            Debit
          </LoadingButton>
        </CardActions>
      </Card>
      <CustomizedSnackbars
        openSnackbar={openSnackbar}
        handleCloseSnackbar={handleCloseSnackbar}
        severity="success"
        message={`${cointitle} balance successfully updated`}
      />
    </>
  );
}
