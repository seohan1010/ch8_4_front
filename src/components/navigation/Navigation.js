import classes from "./Navigation.module.css";
import List from "../part/list/List";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <>
      <div className={classes.navigation_wrap}>
        <div className={classes.title}>
          <Link to={"/"} className={classes.title_anchior_tag}>
            ch8_4
          </Link>
        </div>

        <ul className={classes.button_wrap}>
          <List className={classes.li_first} href={"/"} content={"home"} />
          <List
            className={classes.li_second}
            href={"/board"}
            content={"board"}
          />
          {isLoggedIn ? (
            <List
              className={classes.li_third}
              href={"/login"}
              content={"login"}
            />
          ) : (
            <List
              className={classes.li_third}
              href={"/register"}
              content={"register"}
            />
          )}
        </ul>
      </div>
    </>
  );
};

export default Navigation;
