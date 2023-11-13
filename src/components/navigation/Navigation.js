import classes from "./Navigation.module.css";
import List from "../part/list/List";
import { Link } from "react-router-dom";

import { useLoaderData } from "react-router-dom";

const Navigation = () => {
  // const token = getAuthToken(); //뭐지 .....
  // useRouteLoaderData()로는 해당 route에서 반환하는 값을 받아올수 없다. // 그게 아니라 navigation은 root랑 묶여 있어서 그런거 같다.
  const token = useLoaderData("root");

  return (
    <>
      <div className={classes.navigation_wrap}>
        <div className={classes.title}>
          <Link to={"/"} className={classes.title_anchior_tag}>
            ch8_4
          </Link>
        </div>
        {"token:" + token}
        <ul className={classes.button_wrap}>
          <List className={classes.li_first} href={"/"} content={"home"} />
          <List
            className={classes.li_second}
            href={"/board"}
            content={"board"}
          />
          {!token && (
            <List
              className={classes.li_third}
              href={"/login"}
              content={"login"}
            />
          )}{" "}
          {!token && (
            <List
              className={classes.li_third}
              href={"/register"}
              content={"register"}
            />
          )}
          {token && (
            <List
              className={classes.li_third}
              href={"/logout"}
              content={"logout"}
            />
          )}
        </ul>
      </div>
    </>
  );
};

export default Navigation;
