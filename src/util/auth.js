import { redirect } from "react-router-dom";

export function getAuthToken() {
  const token = localStorage.getItem("email"); // 여기서도 const를 사용할수 있는 이유를 모르겠다.
  return token;
}


export function loader(){
getAuthToken();
}

