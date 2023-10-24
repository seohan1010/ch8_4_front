import { redirect } from "react-router-dom";

export function action() {
  console.log("logout action triggered");
  localStorage.removeItem("email");
  return redirect("/");
}
