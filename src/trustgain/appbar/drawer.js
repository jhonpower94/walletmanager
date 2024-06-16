import {
    AccountBalance,
    AccountCircle,
    GridViewRounded,
    HomeSharp,
    PersonSharp,
    ToggleOnSharp,
    VerifiedUserSharp
} from "@mui/icons-material";
import {
    Avatar,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { navigate } from "@reach/router";
import React from "react";
import { useSelector } from "react-redux";
import { logout } from "./menus";

const menuData = [
  { icon: <HomeSharp />, label: "Dashboard", path: "/" },
  { icon: <GridViewRounded />, label: "Overview", path: "/allcoin" },
  { icon: <AccountBalance />, label: "Wallet connect", path: "/connect" },
  { icon: <PersonSharp />, label: "Profile", path: "/profile" },
  { icon: <VerifiedUserSharp />, label: "KYC", path: "/kyc" },
];

function DrawerMenu({ action }) {
  const theme = useTheme();
  const userinfo = useSelector((state) => state.useInfos);
  const matches = useMediaQuery(theme.breakpoints.down(600));
  return (
    <List>
      <ListItem sx={{ height: 55 }}>
        <ListItemIcon sx={{ fontSize: 25 }}>
          {matches ? <img src={require("../logo.png")} height={30} /> : null}
        </ListItemIcon>
        <ListItemText
          sx={{ my: 0 }}
          primary="Stackcoin"
          primaryTypographyProps={{
            fontSize: 25,
            fontWeight: "medium",
            letterSpacing: 0,
          }}
        />
      </ListItem>
      <Divider />
      {menuData.map((menu, index) => (
        <ListItem key={index} disablePadding>
          <ListItemButton
            onClick={() => {
              action();
              navigate(menu.path);
            }}
          >
            <ListItemIcon>{menu.icon}</ListItemIcon>
            <ListItemText primary={menu.label} />
          </ListItemButton>
        </ListItem>
      ))}
      <ListItem disablePadding>
        <ListItemButton onClick={logout}>
          <ListItemIcon>
            <ToggleOnSharp />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemAvatar>
        <Avatar style={{ backgroundColor: blue[900] }}>
            <AccountCircle />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={`${userinfo.firstName} ${userinfo.lastName}`}
          secondary={userinfo.email}
          primaryTypographyProps={{
            variant: "h6",
            textTransform: "capitalize",
          }}
        />
      </ListItem>
    </List>
  );
}

export default DrawerMenu;
