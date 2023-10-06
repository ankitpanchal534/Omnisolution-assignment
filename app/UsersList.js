// This code is a React component that displays a list of users. It imports various
// components from the Material-UI library and Redux. The component receives two
// props: `usersData` (an array of user data) and `loading` (a boolean indicating
// whether the data is still loading).
// This code is a React component that displays a list of users. It imports various
// components from the Material-UI library and Redux. The component receives two
// props: `usersData` (an array of user data) and `loading` (a boolean indicating
// whether the data is still loading).
"use client";
import {
  Avatar,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { Star, StarOutline } from "@mui/icons-material";

import { addUserInBookmark } from "./redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

export default function UsersList(props) {
  const { usersData, loading } = props;
  const dispatch = useDispatch();
  const [searchString, setSearchString] = useState("");

  const bookmarked_users = useSelector((state) => state.users.bookmark_users);
  const handleUserInBookmark = (selectedUser) => {
    let isUsersExist = bookmarked_users?.filter(
      (it) => it.login == selectedUser.login
    );
    if (isUsersExist?.length > 0) {
      let newArr = bookmarked_users?.filter(
        (it) => it.login != selectedUser.login
      );
      dispatch(addUserInBookmark(newArr));
    } else {
      dispatch(addUserInBookmark([...bookmarked_users, selectedUser]));
    }
    // }
  };

  const handleInputChange = (e) => {
    setSearchString(e.target.value.toLocaleLowerCase());
  };
  return (
    <Grid container>
      {/* <TableContainer> */}
      <Grid item container justifyContent={"center"}>
        <TextField
          label={"@ Search username "}
          autoComplete="off"
          sx={{ width: "350px", margin: "15px 0px" }}
          size="small"
          onChange={handleInputChange}
        />
      </Grid>
      <TableContainer>
        <Table
          style={{ maxHeight: "500px" }}
          sx={{
            // width: "100%",
            border: "2px solid whitesmoke",
            // boxShadow: "0px 6px 6px lightgray",
          }}
          stickyHeader
          aria-label="sticky table"
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Sr.</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Avatar</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>login</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Bookmark</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersData &&
              [...usersData]
                ?.filter((usr) => usr.login.includes(searchString))
                ?.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}.</TableCell>
                    <TableCell>
                      <Avatar src={user.avatar_url} width={50} height={10} />
                    </TableCell>
                    <TableCell>@{user.login}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleUserInBookmark(user)}>
                        {bookmarked_users?.filter(
                          (it) => it.login == user.login
                        )?.length > 0 ? (
                          <Star />
                        ) : (
                          <StarOutline />
                        )}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid item container justifyContent={"center"} alignItems={"center"}>
        {loading ? (
          <>
            <CircularProgress />
            <h1>Loading users ..</h1>
          </>
        ) : null}
      </Grid>
    </Grid>
  );
}
