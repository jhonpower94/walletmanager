import {
  Box,
  CircularProgress,
  Container,
  CssBaseline,
  useTheme,
} from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Inspired by the former Facebook spinners.
const useStylesFacebook = () => {
  return {
    root: {
      position: "relative",
      // height: "100vh",
    },
    bottom: {
      color: useTheme().palette.grey[
        useTheme().palette.type === "light" ? 200 : 700
      ],
    },
    top: {
      color: useTheme().palette.primary.main,
      animationDuration: "550ms",
      position: "absolute",
      left: 0,
    },
    circle: {
      strokeLinecap: "round",
    },
    padding: {
      padding: useTheme().spacing(3),
    },
    footer: {
      position: "absolute",
      padding: useTheme().spacing(4),

      width: "100%",
      textAlign: "center",
    },
  };
};

export function FacebookCircularProgress(props) {
  const classes = useStylesFacebook();

  return (
    <div style={classes.root}>
      <CircularProgress
        variant="determinate"
        style={classes.bottom}
        size={40}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        style={classes.top}
        classes={{
          circle: classes.circle,
        }}
        size={40}
        thickness={4}
        {...props}
      />
    </div>
  );
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#160959",
    },
    background: {
      default: "#fff",
    },
  },
});

function AuthenticationIndex(props) {
  const loading = useSelector((state) => state.loading);
  useEffect(() => {}, []);

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <CssBaseline />

        <Container maxWidth="xs">{props.children}</Container>
      </React.Fragment>
    </ThemeProvider>
  );
}

export default AuthenticationIndex;

/*
{loading.loading ? (
        <Box display="flex" flexDirection="column" alignItems="center" mt={20}>
          <FacebookCircularProgress />
        </Box>
      ) : (
        <Container maxWidth="xs">{props.children}</Container>
      )}
      */
