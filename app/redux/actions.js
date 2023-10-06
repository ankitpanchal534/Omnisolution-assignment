export function saveUserDetails(payload) {
  return {
    type: "SAVE_USER_DATA",
    payload: payload,
  };
}
export function addUserInBookmark(payload) {
  return {
    type: "ADD_USER_IN_BOOKMARK",
    payload: payload,
  };
}
