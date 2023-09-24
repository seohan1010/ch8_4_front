import classes from "./BoardList.module.css";
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import BoardSearch from "./BoardSearch";
import axios from "axios";

const BoardList = () => {
  const [board, setBoard] = useState("");

  useEffect(() => {
    const getBoardList = async () => {
      const url = "http://localhost/board/board";
      const obj = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      const response = await fetch(url, obj)
        .then((res) => res.json())
        .catch((err) => err);

      const boardList = response;
      console.log(boardList ? boardList : "");
      setBoard(boardList ? boardList : "");
    };

    getBoardList();
  }, []);

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
      const data = await response.status;
      console.log(data);
      const boardList = await response.json();
      console.log(boardList);
      setBoard(boardList);
    } catch (err) {
      console.log('<<<<<<< err :'+err);
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
        <span>title</span>
        <span>writer</span>
        <span>write date</span>
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
        {board !== ""
          ? board.map((board) => (
              <div className={classes.list_wrap} key={board.bno}>
                <Link
                  className={classes.board_list}
                  to={"/board/" + board.bno}
                >{`${board.writer}  ${board.title}  `}</Link>
              </div>
            ))
          : "no data found"}{" "}
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
