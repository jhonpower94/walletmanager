import { useButton } from "@mui/base/ButtonUnstyled";
import Paper from "@mui/material/Paper";
import { styled, useTheme } from "@mui/material/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import * as React from "react";

const blue = {
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
};

export const useStyles = () => {
  return {
    stackicon: {
      height: 38,
      width: 38,
      border: "1px solid #E0E3E7",
      borderRadius: 10,
      color: "#0d47a1",
    },
    paper: {
      marginTop: useTheme().spacing(2),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: useTheme().spacing(3),
    },
    submit: {
      margin: useTheme().spacing(3, 0, 2),
    },
    flag: {
      fontSize: "2em",
      lineHeight: "2em",
    },
    space: {
      flexFlow: 1,
    },
  };
};

export const CardCustom = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const CustomButtonRoot = styled("button")`
  font-family: IBM Plex Sans, sans-serif;
  font-weight: bold;
  font-size: 0.875rem;
  background-color: ${blue[500]};
  padding: 12px 24px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: ${blue[600]};
  }

  &.active {
    background-color: ${blue[700]};
  }

  &.focusVisible {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1),
      0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const CustomButton = React.forwardRef(function CustomButton(props, ref) {
  const { children } = props;
  const { active, disabled, focusVisible, getRootProps } = useButton({
    ...props,
    ref,
    component: CustomButtonRoot,
  });

  const classes = {
    active,
    disabled,
    focusVisible,
  };

  return (
    <CustomButtonRoot {...getRootProps()} className={clsx(classes)}>
      {children}
    </CustomButtonRoot>
  );
});

CustomButton.propTypes = {
  children: PropTypes.node,
};
