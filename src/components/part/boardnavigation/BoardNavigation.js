import { useState, useEffect } from "react";
import classes from "./BoardNavigation.module.css";

export const BEFORE = "before";
export const AFTER = "after";

// 처음에 네비게이션에 출력되는 숫자를 백단 으로부터 받은 데이터를 출력할수 있도록 로직을 수정해 보자
const BoardNavigation = ({ resData, ph, searchInputValue }) => {
  const [nav, setNav] = useState([]);
  const [showBefore, setShowBefore] = useState();
  const [showAfter, setShowAfter] = useState();
  const [startPage, setStartPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [curNavi, setCurNavi] = useState(1);

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

    const naviData = [];
    // 처음에 받은 데이터로 네비게이션 데이터를 생성한다.
    // 데이터를 받아오는 시점이 정확히 언제인지는 모르겠으나
    // 데이터가 컴포넌트에 정상적으로 출력이 된다.
    for (let i = beginPage; i <= endPage; i++) {
      naviData.push({ id: i });
    }
    console.log("<<<<<<< naviData : ", naviData);
    setNav(naviData);
  }, []);

  // searchinput에 데이터가 있으면은 searchBoardlist와 searchBoard의 ph 정보를 들고 온다.
  // 데이터를 받아서 navi data를 화면에 바로 업데이트 하지 못한다.
  // nav의 state를 엎어치게 할수 있는 방법을 찾아야 겠다.
  const getSearchBoardList = async (data, curnav) => {
    console.log("data from getSearchBoardList", data, curnav);

    const searchCondition = {
      option: data.option,
      keyword: data.keyword,
      page: curnav,
    };

    const url = "/board/search";
    const obj = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(searchCondition),
    };
    const response = await fetch(url, obj);

    const { list, ph } = await response.json();

    resData(list); // 검색된 게시판 목록은 BoardList에 있는 함수에 전달한다.
    const {
      beginPage,
      endPage,
      naviSize,
      showNext,
      showPrev,
      totalCnt,
      totalPage,
    } = ph; // ph는 네비게이션을 위해서 객체 해체화를 시킨다.

    const naviData = [];

    for (let i = beginPage; i <= endPage; i++) {
      naviData.push({ id: i });
    }
    setNav(naviData);
    setShowBefore(showPrev);
    setShowAfter(showNext);
    setStartPage(beginPage);
    setLastPage(endPage);
    console.log("searchBoardList navi data is : ", naviData);
    console.log(nav);
    console.log(beginPage, endPage, showNext, showPrev);
  };
  // 페이지 버튼 혹은 화살표를 클릭했을때 요청을 보내는 메서드
  const getBoardByNav = async (curnav) => {
    console.log("searchInputValue is ", searchInputValue); // 여기에서 받는 데이터는
    // 최신의 데이터를 받는다.
    // 부모 컴포넌트로부터
    // props로 받는 데이터 이다.

    // keyword가 한번도 입력되지 않은것이 아니면 true
    // ---> 즉, 값이 입력된 적이 있으면은(focus를 받은 적만 있어도)
    //      초기화가 된적이 있으므로 아래의 코드가 실행이 된다.
    if (searchInputValue.keyword !== undefined) {
      console.log("searchCondition is  not undefined");
      if (searchInputValue.keyword.trim().length !== 0) {
        console.log(
          "search board has input it is okay to use search board data "
        );
        getSearchBoardList(searchInputValue, curnav);
        return;
      }
    }

    const url = "/board/board?page=" + curnav;
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
    setCurNavi(page);
  };

  const onClickHandler = (curnav) => {
    console.log(curnav);
    getBoardByNav(curnav);
  };

  const getBoardByArrow = async (pageValue) => {
    const url = "/board/board?page=" + pageValue;
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
      if(startPage !==1){
        console.log('startPage is : ',startPage);
        getBoardByArrow(startPage - 10);
      }else{
        getBoardByArrow(1);
      }
      setCurNavi(startPage - 1);
    } else if (identifier === AFTER) {
      getBoardByArrow(lastPage + 1);
      setCurNavi(lastPage + 1);
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
              className={classes.button}
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
