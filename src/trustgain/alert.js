import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import * as React from "react";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars({
  openSnackbar,
  handleCloseSnackbar,
  message,
  severity,
}) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={openSnackbar}
      autoHideDuration={10000}
      onClose={handleCloseSnackbar}
    >
      <Alert
        onClose={handleCloseSnackbar}
        severity={severity}
        sx={{ width: "100%" }}
        variant="standard"
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export const CustomAlert = (props) => {
  return (
    <div
      style={{
        color: "#0F5C2E",
        backgroundColor: "#E9FBF0",
        borderColor: "#9AEFBC",
        padding: "16px",
        margin: "16px 0",
        border: "1px solid",
        borderRadius: "10px",
      }}
    >
      {props.children}
    </div>
  );
};
