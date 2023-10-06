// This code is a React component that fetches a list of users from the GitHub API
// and displays them in a table. It also implements infinite scrolling
// functionality to load more users as the user scrolls down the page. The
// component uses Redux to manage the state of the users' data and bookmarked
// users. It also uses Material-UI components for styling and UI elements.
"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Star, StarOutline } from "@mui/icons-material";
import { useWindowScroll } from "@uidotdev/usehooks";
import { useDispatch, useSelector } from "react-redux";
import { addUserInBookmark, saveUserDetails } from "./redux/actions";
import UsersList from "./UsersList";
import PullToRefresh from "react-simple-pull-to-refresh";

export default function AllUsers() {
  const dispatch = useDispatch();
  const [{ x, y }, scrollTo] = useWindowScroll();
  const [usersData, setUsersData] = useState([]);
  const [dom, setWindowDom] = useState(null);
  const [loading, setLoading] = useState(false);

  function getUsersList(since) {
    setLoading(true);
    axios
      .get(`https://api.github.com/users?since=${since}`)
      .then((res) => {
        let allUser = [...usersData, ...res?.data];
        setUsersData(allUser);
        dispatch(saveUserDetails(allUser));
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    getUsersList(usersData?.length || 0);
    setWindowDom(window.document.body);
  }, []);

  useEffect(() => {
    if (dom != null) {
      let win_height = window.innerHeight;
      var scrollviewContentHeight = dom.scrollHeight;
      let sum = win_height + y;
      if (sum >= scrollviewContentHeight) {
        getUsersList(usersData?.length);
      }
    }
  }, [dom, x, y]);
  const handleRefresh = async () => {
    let res = await getUsersList(0);
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <UsersList usersData={usersData} loading={loading} />
    </PullToRefresh>
  );
}
