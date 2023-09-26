import classes from "./BoardList.module.css";
import { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import BoardSearch from "./BoardSearch";
import { useLoaderData } from 'react-router-dom';

const BoardList = () => {
  const [board, setBoard] = useState("");

const boardList  = useLoaderData();
  

console.log(boardList);

useEffect(()=>{

  setBoard(boardList);
},[boardList])



  const searchBoard = useCallback(async (board) => {
    const url = "http://localhost/board/search";
    const obj = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(board),
    };

    try {
      const response = await fetch(url, obj).then((res) => res);

      console.log("fetch data has been transfered");
      console.log(response);
      const data = response.status;
      console.log(data);
      const boardList = await response.json();
      console.log(boardList);
      setBoard(boardList);
    } catch (err) {
      console.log("<<<<<<< err :" + err);
      setBoard("");
    }
  }, []);

  const onClickHandler = () => {
    console.log("hi");
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
          {board !== ""
            ? board.map((board) => (
                <tr key={board.bno}  className={classes.table_tr}>
                  <td className={classes.table_td}>{board.writer}</td>
                  <td className={classes.table_td}>{board.bno}</td>
                  <Link to={"/board/" + board.bno}>
                    {" "}
                    <td className={classes.table_td_title}>{board.title}</td>
                  </Link>{" "}
                  <td className={classes.table_td}>{board.writeDate}</td>
                </tr>
              ))
            : "no data found"}{" "}
        </table>
        <button
          className={classes.button}
          onClick={(e) => {
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
