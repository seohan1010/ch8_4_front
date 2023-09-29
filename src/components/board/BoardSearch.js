import classes from "./BoardSearch.module.css";
import { useState, useEffect, useRef } from "react";

const BoardSearch = (props) => {

  const [keyword, setkeyword] = useState("");

  // ref도 초기값이 없으면은 undefined 오류를뿜는다. 
  const selectedRef = useRef('');
  const [data, setData]  = useState('');

  const onChangeHandler = (e) => {
    console.log(selectedRef.current.value)
    console.log(e.target.value);
    setkeyword(e.target.value);
  };




  const onClickHandler = async() => {

    const data ={
      "option":selectedRef.current.value,
      "keyword":keyword
    }

    setData(data);
//     try{
//    const searchedBoard = await fetch().then(res => res.json())
//    console.log(searchedBoard);
//         props.searchedBoardHandler(searchedBoard);
//     }catch(err){
//         console.log(err);
//     }
props.searchedBoardHandler(data);
  }




 const keyPressHandler = (e) => {
    if(e.key === 'Enter'){
      props.searchedBoardHandler(data);
    }
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
        value={keyword}
        onChange={(e) => onChangeHandler(e)}
        onKeyPress={keyPressHandler}
      />
      <button className={classes.button} onClick={onClickHandler} >검색</button>
    </div>
  );
};

export default BoardSearch;
