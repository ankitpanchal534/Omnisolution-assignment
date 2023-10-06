"use client";
//import the React and useState from the React library
import React, { useEffect, useState } from "react";

//import the AllUsers and BookmarkedUser components from the same directory
import AllUsers from "./AllUsers";
import BookmarkedUser from "./BookmarkedUser";
//import the Button and Grid components from the Material library
import { Button, Grid } from "@mui/material";
import PullToRefresh from "react-simple-pull-to-refresh";

//export the Tabs function
export default function Tabs() {
  //set the initial state of the selectedTab to 1
  const [selectedTab, setSelectedTab] = useState(1);

  //return the JSX code
  return (
    //create a Grid container
    <Grid container>
      <Grid
        item
        container
        style={{
          padding: "10px",
        }}
        spacing={2}
      >
        <Grid item xs={6} md={6} lg={6} sm={6}>
          {" "}
          <Button
            variant={selectedTab == 1 ? "outlined" : "text"}
            fullWidth
            //set the onClick to set the selectedTab to 1
            onClick={() => setSelectedTab(1)}
          >
            All Users
          </Button>
        </Grid>
        <Grid item xs={6} md={6} lg={6} sm={6}>
          {" "}
          <Button
            variant={selectedTab == 2 ? "outlined" : "text"}
            fullWidth
            //set the onClick to set the selectedTab to 2
            onClick={() => setSelectedTab(2)}
          >
            Bookmark
          </Button>
        </Grid>
      </Grid>
      <Grid item container justifyContent={"center"}>
        {/* if the selectedTab is 1, render the AllUsers component, otherwise render the BookmarkedUser component */}
        {selectedTab == 1 ? <AllUsers /> : <BookmarkedUser />}
      </Grid>
    </Grid>
  );
}
