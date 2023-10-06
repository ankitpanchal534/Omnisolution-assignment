"use client";

//import the UsersList component
import UsersList from "./UsersList";
//import the useSelector hook from react-redux
import { useSelector } from "react-redux";

//export a function called AllUsers
export default function AllUsers() {
  //select the bookmarked_users from the redux
  const bookmarked_users = useSelector((state) => state.users?.bookmark_users);

  //return the UsersList component with the bookmarked_users as the usersData prop
  return <UsersList usersData={bookmarked_users} />;
}
