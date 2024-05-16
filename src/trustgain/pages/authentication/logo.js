import { useMediaQuery, useTheme } from "@mui/material";
import React from "react";


const useStyles = () => {
  return {
    avatar: {
      margin: useTheme().spacing(1),
      padding: useTheme().spacing(2.5),
    },
  };
};

function Logo() {
  const classes = useStyles();

  return (
    <div style={classes.avatar}>
      <img
        src={require("../../logo.png")}
        height={
          useMediaQuery(useTheme().breakpoints.up("sm")) ? "80px" : "80px"
        }
        alt="Enrichement FCU"
      />
    </div>
  );
}

export default Logo;
