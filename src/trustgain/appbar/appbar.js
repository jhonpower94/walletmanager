import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import { MenuIconCustom } from "../custom";
import Menus from "./menus";

export default function AppbarMain({ handleDrawer }) {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${300}px)` },
        ml: { sm: `${300}px` },
        backgroundColor: "#fff",
      }}
      elevation={0}
      color="transparent"
      style={{
        borderBottom: "1px solid #E7EBF0",
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawer}
          sx={{ mr: 2, display: { sm: "none" } }}
          //className={classes.stackicon}
          style={{
            height: 38,
            width: 38,
            border: "1px solid #E0E3E7",
            borderRadius: 10,
            color: "#0d47a1",
          }}
        >
          <MenuIconCustom />
        </IconButton>
        <img src={require("../logo.png")} height={40} alt="Enrichement FCU" />
        <Box sx={{ flexGrow: 1 }} />
        <Menus />
      </Toolbar>
    </AppBar>
  );
}

/*
export const Drawertop = () => {
  
  const savingsBalance = useSelector((state) => state.savingsInfos.balance);
  const checkngsBalance = useSelector((state) => state.checkingsInfos.balance);

  const totalBalance = savingsBalance + checkngsBalance;
  

  return (
    <>
      <img src={logo} height={40} alt="Enrichement FCU" />
    </>
  );
};
*/
