import { useState, useEffect } from "react";
import classes from "./BoardNavigation.module.css";

export const BEFORE = "before";
export const AFTER = "after";

// 처음에 네비게이션에 출력되는 숫자를 백으로부터 받은 데이터를 출력할수 있도록 로직을 수정해 보자
const BoardNavigation = ({ resData, ph, searchInputValue }) => {
  const [nav, setNav] = useState([]);
  const [showBefore, setShowBefore] = useState(true);
  const [showAfter, setShowAfter] = useState(true);
  const [startPage, setStartPage] = useState(1);
  const [lastPage, setLastPage] = useState(10);
  const [curNavi, setCurNavi] = useState(1);
  const [list, setList] = useState([]);

  // 아래의 코드를 함수로 빼내서 사용하자.
  useEffect(() => {
    console.log("ph from loader : ", ph);

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
    setCurNavi(page);

    setList(list);
    // };

    // getBoard(curNavi);

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

    if (identifier === BEFORE) {
      getBoardByArrow(startPage - 1);
    } else if (identifier === AFTER) {
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
              showArrowHandler(BEFORE);
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
              className={
                classes.button + curNavi === data.id
                  ? classes.button_curNavi_color
                  : ""
              }
            >
              {data.id}
            </button>
          </li>
        ))}

        {showAfter && (
          <button
            onClick={() => {
              showArrowHandler(AFTER);
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
