import { useState, useEffect } from "react";
import classes from "./BoardNavigation.module.css";

const BoardNavigation = ({ ph }) => {
  const {
    totalCnt,
    pageSize,
    naviSize,
    page,
    beginPage,
    endPage,
    showPrev,
    showNext,
  } = ph;

  const [startPage, setBeginPage] = useState(1);
  const [lastPage, setEndPage] = useState(10);
  const [nav, setNav] = useState([
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5 },
    { value: 6 },
    { value: 7 },
    { value: 8 },
    { value: 9 },
    { value: 10 },
  ]);
  const [showBefore, setShowBefore] = useState(true);
  const [showAfter, setShowAfter] = useState(true);

  // useEffect(() => {
  //   let navigation = [];
  //   setShowBefore(showPrev);
  //   setShowAfter(showNext);
  //   setEndPage(endPage);
  //   setBeginPage(beginPage);
  //   for (let i = beginPage; i <= lastPage; i++) {
  //     console.log(i);
  //     navigation.push({ value: i });
  //   }
  //   console.log("nav : ", nav);
  //   setNav((nav) => [ navigation]);
  //   console.log("<<<<<<<<< navigation : ", navigation);
  //   console.log(nav);

  //   console.log("data from BoardNavigation : ", ph);
  // }, []);

  const onClickHandler = async (e) => {};

  return (
    <>
      <ul className={classes.nav_wrap}>
        {showBefore && <button className={classes.showPrev}>{"<"}</button>}

        {nav.map((data) => (
          <li className={classes.nav_li} key={data.value}>
            <button
              className={classes.button}
              onClick={(e) => console.log(e.target.innerHTML)}
            >
              {data.value}
            </button>
          </li>
        ))}

        {showAfter && <button className={classes.showNext}>{">"}</button>}
      </ul>
    </>
  );
};

export default BoardNavigation;
