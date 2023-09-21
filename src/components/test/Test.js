import classes from "./Test.module.css";
import { Fragment, useEffect, useState,useCallback } from "react";

const Test = () => {
  const [board, setBoard] = useState([]);


  const onClickHandler  = async () => {


    const url ='http://localhost/board/board';
    const obj = {
        method:"GET",
        headers:{'Content-Type':'application/json'}
    };
    const response = await  fetch(url,obj).then(res=>res.json()).catch(err=>err);
              
               const boardList =response
               console.log(boardList);
               setBoard(boardList);


  }


  return (
    <Fragment>
      <div>
        <div className={classes.test_wrap}>
          fetsh test
          <div className={classes.result_wrap}>
            <div className={classes.span}>result</div>
            <div className={classes.result}>{board.map(board=><div key={board.bno}>{`${board.writer}  ${board.title}  `}</div>)}</div>
          </div>
          <button className={classes.button} onClick={onClickHandler}>
            test button
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Test;
