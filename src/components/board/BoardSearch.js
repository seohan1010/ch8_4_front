import classes from "./BoardSearch.module.css";
import { useState, useEffect, useRef } from "react";

const BoardSearch = (props) => {
  const [selected, setSeleted] = useState("");
  const [searchCondition, setSearchCondition] = useState("");

  const selectedRef = useRef();

  const onChangeHandler = (e, identifier) => {
    console.log(selectedRef.current.value);
    console.log(e.target.value);
    setSeleted(e.target.value);
    setSearchCondition(e.target.value);
  };

  const onClickHandler = async() => {

//     try{
//    const searchedBoard = await fetch().then(res => res.json())
//    console.log(searchedBoard);
//         props.searchedBoardHandler(searchedBoard);
//     }catch(err){
//         console.log(err);
//     }
props.searchedBoardHandler('hello');
  }


  return (
    <div className={classes.board_search_form}>
      <select
        // onChange={(e)=>{onChangeHandler(e,'select')}}
        ref={selectedRef}
        name="option"
        className={classes.select}
      >
        <option value="A">제목+내용 </option>
        <option value="T">제목만</option>
        <option value="W">작성자</option>
      </select>
      <input
        className={classes.input}
        type="text"
        value={searchCondition}
        onChange={(e) => onChangeHandler(e, "input")}
      />
      <button className={classes.button} onClick={onClickHandler} >검색</button>
    </div>
  );
};

export default BoardSearch;
