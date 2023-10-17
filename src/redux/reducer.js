import { user_logged_in, user_logged_out } from "./constant";

export const userData = (data = {}, action) => {
  console.warn("reducer called", action);
  //   if (action.type === user_info) {
  //     return data;
  //   } else {
  //     return "no action called";
  //   }

  switch (action.type) {
    case user_logged_in:
      console.warn("action type is user_logged_in");
      return action.data;
    case user_logged_out:
      console.warn("user logged out");
    default:
      return {};
  }
};
