import { LoadingButton } from "@mui/lab";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { navigate } from "@reach/router";
import * as React from "react";
import { ajax } from "rxjs/ajax";
import SearchIcon from "@mui/icons-material/Search";
import {
  activateAccount,
  deletedocument,
  getallusers,
} from "../../../config/services";
import {
  Box,
  Card,
  Grid,
  IconButton,
  TextField,
  CardHeader,
  Avatar,
} from "@mui/material";
import { VisibilitySharp } from "@mui/icons-material";

export default function AllUserTablesmain() {
  const [loading, setLoading] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [users, setUsers] = React.useState([]);
  const [usersConst, setUsersConst] = React.useState([]);
  React.useEffect(() => {
    getallusers().subscribe((users) => {
      console.log(users);
      setUsers(users);
      setUsersConst(users);
    });
  }, []);

  const deleteuser = (uid) => {
    ajax({
      url: "https://expresspages-chi.vercel.app/delete",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        uid: uid,
      },
    }).subscribe(() => {
      deletedocument(uid).then(() => console.log("deleted"));
    });
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
    setUsers(usersConst);
    // console.log(e.target.value);
  };

  const search = (e) => {
    let filteredUsers = users.filter((user) => {
      return user.uid === searchQuery || user.email === searchQuery;
    });
    setUsers(filteredUsers);
  };

  return (
    <TableContainer>
      <Box display={"flex"} justifyContent={"center"} p={2}>
        <TextField
          id="search-bar"
          label="Search email or id"
          variant="outlined"
          onChange={handleChange}
          size="small"
          fullWidth
        />
        <IconButton
          onClick={search}
          sx={{ ml: 1 }}
          type="submit"
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Box>

      <Table aria-label="simple table" sx={{ minWidth: 800 }}>
        <TableHead>
          <TableRow>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Edit</TableCell>
            <TableCell align="left">Transactions</TableCell>
            <TableCell align="left">KYC</TableCell>
            <TableCell align="left">Delete</TableCell>
            <TableCell align="left">Password</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row, index) => (
            <TableRow key={index}>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">
                <Button
                  fullWidth
                  variant="contained"
                  disableElevation
                  onClick={() => navigate(`addtransaction/${row.uid}`)}
                >
                  Edit
                </Button>
              </TableCell>
              <TableCell align="left">
                <Button
                  fullWidth
                  variant="contained"
                  disableElevation
                  onClick={() => navigate(`usertransactions/${row.uid}`)}
                >
                  Transactions
                </Button>
              </TableCell>
              <TableCell align="left">
                {row.kyc_verified ? (
                  <IconButton
                    size="large"
                    aria-label="delete"
                    onClick={() => window.open(row.image_url, "_blank")}
                  >
                    <VisibilitySharp fontSize="small" />
                  </IconButton>
                ) : (
                  "Not verified"
                )}
              </TableCell>

              <TableCell align="left">
                <Button
                  fullWidth
                  size="large"
                  variant="contained"
                  disableElevation
                  onClick={() => {
                    deleteuser(row.uid);
                  }}
                >
                  Delete
                </Button>
              </TableCell>
              <TableCell align="left">{row.password}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
