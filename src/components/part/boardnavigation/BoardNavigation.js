import { useState, useEffect } from "react";
import classes from "./BoardNavigation.module.css";

const BoardNavigation = ({  resData }) => {


  const [nav, setNav] = useState([]);
  const [showBefore, setShowBefore] = useState(true);
  const [showAfter, setShowAfter] = useState(true);
  const [startPage, setStartPage] = useState(1);
  const [lastPage, setLastPage] = useState(10);
  const [curNav, setCurNav] = useState(1);
  const [ list, setList ] = useState([]);

  
  useEffect(() => {
    const getBoard = async (curNav) => {
      const url = "http://localhost/board/board?page=" + curNav;
      const data = {};

      const response = await fetch(url, data).then((res) => res);
      const resData = await response.json();
      const { list, ph } = resData;

      const {
        totalCnt,
        pageSize,
        naviSize,
        totalPage,
        page,
        beginPage,
        endPage,
        showPrev,
        showNext
      }=ph;



      setStartPage(beginPage);
      setLastPage(endPage);
      setShowBefore(showPrev);
      setShowAfter(showNext);

      setList(list);

    };

    getBoard(curNav);

    const naviData = [];

    for (let i = startPage; i <= lastPage; i++) {
      naviData.push({ id: i });
    }
    console.log("<<<<<<< naviData : ", naviData);
    setNav(naviData);
    resData(list);
  }, [curNav]);

  const onClickHandler = (curNav) => {
    console.log(curNav);
    setCurNav(curNav);
 
  };

  return (
    <>
      <ul className={classes.nav_wrap}>
        {showBefore && <button className={classes.showPrev}>{"<"}</button>}

        {nav.map((data) => (
          <li className={classes.nav_li} key={data.id}>
            <button
              onClick={(e) => {
                onClickHandler(e.target.innerHTML);
              }}
              className={classes.button}
            >
              {data.id}
            </button>
          </li>
        ))}

        {showAfter && <button className={classes.showNext}>{">"}</button>}
      </ul>
    </>
  );
};

export default BoardNavigation;
