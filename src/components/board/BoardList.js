import classes from "./BoardList.module.css";
import { useState, useCallback, useEffect, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import BoardSearch from "./BoardSearch";
import BoardNavigation from "../part/boardnavigation/BoardNavigation";
// import { useLoaderData } from 'react-router-dom';

const BoardList = (props) => {
  const navigate = useNavigate();

  const [board, setBoard] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const [page, setPage] = useState("");
  const [searchInputValue, setSearchInputValue] = useState('');

  const { list, ph } = props.board; // loader 함수에서 넘어온 값들이다.

  useEffect(() => {
    if (list.size === 0 || list === undefined) {
      setIsValid(false);
      setBoard([]);
      return;
    } else if (list.size !== 0 || list !== undefined) {
      setBoard(list);
      const timeoutId = setTimeout(() => setIsValid(true), 1500); // 1.5초 뒤에 화면에 데이터를 출력
    }
  }, [props]);

  const searchBoard = useCallback(async (board) => {
    const url = "http://172.31.37.66:8888/board/search";
    const obj = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(board),
    };

    try {
      setIsValid(false); //게시판 목록을 보여주지 않게 설정
      const response = await fetch(url, obj).then((res) => res);

      console.log("fetch data has been transfered");
      console.log(response);
      const data = response.status;
      console.log("data", data);
      const { list, ph } = await response.json(); // 데이터를 map으로 받기 때문에 map안에 있는 데이터를 꺼내서 사용한다.
      console.log("searched boardlist", list, ph);
      if (list.length !== 0) {
        // 받은 데이터를 state에 업데이트하고
        setBoard(list);
        //1.5초후에 결과를 보여준다. ---> 애니메이션을 주면은 좋을거 같다. (3번쩨 프로젝트부터)
        const timeoutId = setTimeout(() => setIsValid(true), 1500);

        return;
      } else if (list.length === 0) {
        setIsValid(false);
        setBoard([]);
        return;
      }

      setIsValid(true);
    } catch (err) {
      console.log("<<<<<<< err :" + err);
      setIsValid(false);
      setBoard([]);
    }
  }, []);

  const onClickHandler = () => {
    navigate("/board/new");
  };

  const searchedBoardHandler = (board) => {
    console.log("data from search board is : ", board);
    searchBoard(board);
  };

  const boardData = useCallback((boardData) => {
    console.log("data from board list ", boardData);
    setBoard(boardData);
  }, []);

  const searchInputHandler = (value) => {
    setSearchInputValue(value); // 객체로 데이터를 전달한다. 
  };

  return (
    <div className={classes.page_wrap}>
      <BoardSearch
        searchedBoard={searchedBoardHandler}
        searchInputValue={searchInputHandler}
      />

      <div className={classes.span}>
        <span className={classes.span_writer}>writer</span>
        <span className={classes.span_title}>title</span>
        <span className={classes.span_write_date}>write date</span>
      </div>

      <div className={classes.test_wrap}>
        <div> </div>
        <table className={classes.table_wrap}>
          <tbody>
            {/* map에 객체가 들어간 배열이 들어간 값의 변수가 앞에 오지 않으면은
          에러가 발생한다. 
          ---> map에서 사용하는 변수의 state를 잘 관리해주자. */}
            {isValid ? (
              board.map((board) => (
                <tr key={board.bno} className={classes.table_tr}>
                  <td className={classes.table_td_writer}>{board.writer}</td>
                  <td className={classes.table_td}>{board.bno}</td>
                  <td className={classes.table_td_title}>
                    <Link
                      className={classes.td_link}
                      to={"/board/" + board.bno}
                    >
                      {board.title}
                    </Link>
                  </td>
                  <td className={classes.table_td}>{board.writeDate}</td>
                </tr>
              ))
            ) : (
              <> "no data found"</>
            )}
          </tbody>
        </table>
        {
          <BoardNavigation
            searchInputValue={searchInputValue}
            resData={boardData}
            pageData={page}
            ph={ph}
          />
        }
        <button
          className={classes.button}
          onClick={() => {
            onClickHandler();
          }}
        >
          addBoard
        </button>
      </div>
    </div>
  );
};

export default BoardList;
