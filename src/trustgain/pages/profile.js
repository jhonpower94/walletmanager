import {
  Container,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { BootstrapButton } from "../custom";
import CopyToClipboard from "react-copy-to-clipboard";
import CustomizedSnackbars from "../alert";

function Profile() {
  const userInfos = useSelector((state) => state.useInfos);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const userArray = [
    {
      title: "User Name",
      value: `${userInfos.firstName} ${userInfos.lastName}`,
    },
    {
      title: "User Email",
      value: userInfos.email,
    },
    {
      title: "Country",
      value: userInfos.country,
    },
    {
      title: "Mobile Number",
      value: `${userInfos.numberformat}`,
    },
  ];

  const handleClick = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="sm">
      <CustomizedSnackbars
        openSnackbar={openSnackbar}
        handleCloseSnackbar={handleCloseSnackbar}
        severity="success"
        message="UserId Copied"
      />
      <Paper elevation={0} sx={{ padding: 2 }}>
        <List subheader={"Account Details"}>
          <ListItem>
            <ListItemText
              primary={"User ID"}
              secondary={userInfos.id}
              primaryTypographyProps={{ variant: "h6" }}
              secondaryTypographyProps={{
                component: "div",
                variant: "body1",
                textTransform: "capitalize",
                fontWeight: "bold",
                sx: {
                  width: 150,
                  overflow: "hidden",
                 
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                },
              }}
            />
            <ListItemSecondaryAction>
              <CopyToClipboard text={userInfos.id} onCopy={handleClick}>
                <BootstrapButton
                  variant="contained"
                  size="small"
                  color="primary"
                >
                  Copy
                </BootstrapButton>
              </CopyToClipboard>
            </ListItemSecondaryAction>
          </ListItem>
          {userArray.map((data, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={data.title}
                secondary={data.value}
                primaryTypographyProps={{ variant: "h6" }}
                secondaryTypographyProps={{
                  variant: "body1",
                  textTransform: "capitalize",
                  fontWeight: "bold",
                }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default Profile;
