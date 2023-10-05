import { useState, useEffect } from "react";
import classes from "./BoardNavigation.module.css";

const BoardNavigation = ({ resData }) => {
  const [nav, setNav] = useState([]);
  const [showBefore, setShowBefore] = useState(true);
  const [showAfter, setShowAfter] = useState(true);
  const [startPage, setStartPage] = useState(1);
  const [lastPage, setLastPage] = useState(10);
  const [curNav, setCurNav] = useState(1);
  const [list, setList] = useState([]);

  // 아래의 코드를 함수로 빼내서 사용하자.
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
        showNext,
      } = ph;

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
  }, []);

  // 페이지 버튼 혹은 화살표를 클릭했을때 요청을 보내는 메서드
  const getBoardByNav = async (curnav) => {
    const url = "http://localhost/board/board?page=" + curnav;
    const obj = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(url, obj).then((res) => res);

    const data = await response.json();
    const { list, ph } = data;

    const {
      totalCnt,
      pageSize,
      naviSize,
      totalPage,
      page,
      beginPage,
      endPage,
      showPrev,
      showNext,
    } = ph;

    setStartPage(beginPage);
    setLastPage(endPage);
    setShowBefore(showPrev);
    setShowAfter(showNext);

    const naviData = [];

    for (let i = beginPage; i <= endPage; i++) {
      naviData.push({ id: i });
    }
    console.log("<<<<<<< naviData : ", naviData);
    setNav(naviData);

    console.log("<<<<<<<<<< list : ", list);
    console.log(">>>>>>>>>> ph : ", ph);
    // BoardList 컴포넌트에 있는 함수에 게시판 목록은 보내준다.
    resData(list);
  };

  const onClickHandler = (curnav) => {
    console.log(curnav);
    getBoardByNav(curnav);
  };

  const getBoardByArrow = async (pageValue) => {
    const url = "http://localhost/board/board?page=" + pageValue;
    const obj = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    const response = await fetch(url, obj).then((res) => res);
    const data = await response.json();

    const { list, ph } = data;

    const {
      totalCnt,
      pageSize,
      naviSize,
      totalPage,
      page,
      beginPage,
      endPage,
      showPrev,
      showNext,
    } = ph;

    setStartPage(beginPage);
    setLastPage(endPage);
    setShowBefore(showPrev);
    setShowAfter(showNext);

    const naviData = [];

    for (let i = beginPage; i <= endPage; i++) {
      naviData.push({ id: i });
    }
    console.log("<<<<<<< naviData : ", naviData);
    setNav(naviData);

    console.log("<<<<<<<<<< list : ", list);
    console.log(">>>>>>>>>> ph : ", ph);

    // BoardList 컴포넌트에 있는 함수에 게시판 목록을 보내준다.
    resData(list);
  };

  const showArrowHandler = (identifier) => {
    console.log(identifier);

    if (identifier === "before") {
      getBoardByArrow(startPage - 1);
    } else if (identifier === "after") {
      getBoardByArrow(lastPage + 1);
    }

    return;
  };

  return (
    <>
      <ul className={classes.nav_wrap}>
        {showBefore && (
          <button
            onClick={() => {
              showArrowHandler("before");
            }}
            className={classes.showPrev}
          >
            {"<"}
          </button>
        )}

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

        {showAfter && (
          <button
            onClick={() => {
              showArrowHandler("after");
            }}
            className={classes.showNext}
          >
            {">"}
          </button>
        )}
      </ul>
    </>
  );
};

export default BoardNavigation;
