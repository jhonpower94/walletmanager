import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { purple } from "@mui/material/colors";

export const BootstrapButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: "#0063cc",
  borderColor: "#0063cc",
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
  "&:hover": {
    backgroundColor: "#0069d9",
    borderColor: "#0062cc",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#0062cc",
    borderColor: "#005cbf",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
});

export const CustomButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontSize: 20,
}));

export const CustomButtonWhite = styled(Button)(({ theme }) => ({
  textTransform: "none",
  borderRadius: 25,
  color: "#0d47a1",
  background: "#fff",
  fontSize: 20,
  "&:hover": {
    backgroundColor: "#fafafa",
    borderColor: "#0062cc",
    boxShadow: "none",
  },
}));

export const MenuIconCustom = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 16 16"
      fill="none"
      className="css-1170n61"
    >
      <rect x="1" y="5" width="14" height="1.5" rx="1" fill="#0d47a1" />
      <rect x="1" y="9" width="14" height="1.5" rx="1" fill="#0d47a1" />
    </svg>
  );
};
