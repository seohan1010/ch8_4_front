import classes from "./BoardList.module.css";
import { useState, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BoardSearch from "./BoardSearch";
import BoardNavigation from "../part/boardnavigation/BoardNavigation";
// import { useLoaderData } from 'react-router-dom';

const BoardList = (props) => {
  const navigate = useNavigate();

  const [board, setBoard] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [navigationData, setNavigationData] = useState("");
  const [page, setPage] = useState("");

     const {list, ph} = props.board;

  useEffect(() => {
    setBoard(list);
  }, [props]);

  const searchBoard = useCallback(async (board) => {
    const url = "http://localhost/board/search";
    const obj = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(board),
    };

    try {
      setIsValid(false);
      const response = await fetch(url, obj).then((res) => res);

      console.log("fetch data has been transfered");
      console.log(response);
      const data = response.status;
      console.log(data);
      const list = await response.json();
      console.log(
        "<<<<<<<<<< list.length : ",
        list.length !== undefined ? list.length : "[]"
      );
      if (list.length !== 0 || list !== undefined) {
        setBoard(list);
      } else if (list.length === 0 || list === undefined || list === null) {
        setBoard([]);
      }

      setIsValid(true);
    } catch (err) {
      console.log("<<<<<<< err :" + err);
      console.log(
        "<<<<<<<< board.length : ",
        board.length !== undefined ? board.length : "[]"
      );
      setBoard([]);
    }
  }, []);

  const onClickHandler = () => {
    navigate("/board/new");
  };

  const searchedBoardHandler = (board) => {
    console.log(board);
    console.log("hello");
    searchBoard(board);
    // setBoard(board);
  };

  return (
    <>
      <BoardSearch searchedBoardHandler={searchedBoardHandler} />

      <div className={classes.span}>
        <span className={classes.span_writer}>writer</span>
        <span className={classes.span_title}>title</span>
        <span className={classes.span_write_date}>write date</span>
      </div>
      <div className={classes.menu_wrap}>
        <ul className={classes.board_list_ul}>
          menu
          <li>hello</li>
          <li>i'm here</li>
        </ul>
      </div>

      <div className={classes.test_wrap}>
        <div> </div>
        <table className={classes.table_wrap}>
          <tbody>
            {/* map에 객체가 들어간 배열이 들어간 값의 변수가 앞에 오지 않으면은
          에러가 발생한다. 
          ---> map에서 사용하는 변수의 state를 잘 관리해주자. */}
            {board.length !== 0 ? (
              board.map((board) => (
                <tr key={board.bno} className={classes.table_tr}>
                  <td className={classes.table_td}>{board.writer}</td>
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
        { <BoardNavigation pageData={page} ph={ph} />}
        <button
          className={classes.button}
          onClick={() => {
            onClickHandler();
          }}
        >
          addBoard
        </button>
      </div>
    </>
  );
};

export default BoardList;
