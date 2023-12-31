import classes from "./BoardSearch.module.css";
import { useState, useEffect, useRef } from "react";

const BoardSearch = (props) => {
  const [keyword, setkeyword] = useState("");

  // ref도 초기값이 없으면은 undefined 오류를뿜는다. ---> 확실한가?
  const selectedRef = useRef("");
  const [inputData, setInputData] = useState();

  const onChangeHandler = (e) => {
    console.log(selectedRef.current.value);
    console.log(e.target.value);
    setkeyword(e.target.value);
    setInputData(e.target.value.trim().length !== 0 ? true : false); //검색 input에 값이 입력되어있으면은 state를 true로 할당한다.
  };

  const onClickHandler = async () => {
    const data = {
      option: selectedRef.current.value,
      keyword: keyword.trim(),
    };

    props.searchedBoard(data);
    props.searchInputValue(data);
  };

  const keyPressHandler = (e) => {
    const data = {
      option: selectedRef.current.value,
      keyword: keyword,
    };

    if (e.key === "Enter") {
      props.searchedBoard(data);
      props.searchInputValue(data);
    }
  };

  return (
    <div className={classes.board_search_form}>
      <select
        // onChange={(e)=>{onChangeHandler(e,'select')}}
        ref={selectedRef}
        name="option"
        className={classes.select}
      >
        <option value="A">제목+내용</option>
        <option value="T">제목만</option>
        <option value="W">작성자</option>
      </select>
      <input
        className={classes.input}
        type="text"
        // value={keyword}
        onChange={(e) => onChangeHandler(e)}
        onKeyPress={keyPressHandler}
      />
      <button className={classes.button} onClick={onClickHandler}>
        검색
      </button>
    </div>
  );
};

export default BoardSearch;
