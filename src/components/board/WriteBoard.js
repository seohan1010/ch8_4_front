import classes from "./WriteBoard.module.css";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const WriteBoard = () => {
  const navigate = useNavigate();
  const email=localStorage.getItem("email");

  const titleRef = useRef("");
  const writerRef = useRef("");
  const contentRef = useRef("");

  const onClickhandler = () => {
    const titleref = titleRef.current.value.trim();
    const writerref = writerRef.current.value.trim();
    const contentref = contentRef.current.value.trim();

    if (titleref.length === 0 || titleref === "") {
      alert("please enter valid title");
      return;
    } else if (writerref.length === 0 || writerref === "") {
      alert("please enter valid writer");
      return;
    } else if (contentref.length === 0 || contentref === "") {
      alert("please enter valid content");
      return;
    }

    console.log(titleref, writerref, contentref);

    const data = {
      title: titleref,
      writer: writerref,
      content: contentref,
    };

    const saveBoard = async () => {
      const url = "http://172.31.37.225:8888/board/board";
      const obj = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
      try{

        const response = await fetch(url,obj).then((res) => res);
        console.log(response.status);
        alert('board saved completed.');
        navigate('/board/');
      }catch(err){
        alert('save board failed, please try again.');
        return;
      }
        
    };

    saveBoard();
   
  };

  return (
    <>
      <div className={classes.write_board_wrap}>
        <label htmlFor="title">title</label>
        <input
          placeholder="please enter title."
          type="text"
          name="title"
          className={classes.write_board_title}
          ref={titleRef}
        />
        <br />
        <label htmlFor="writer">writer</label>
        <input
        placeholder="please enter witer."
          type="text"
          name="writer"
          className={classes.write_board_writer}
          ref={writerRef}
          value={email}
          readOnly={true}
        />
        <br />
        <div style={{ transform: "translateX(13px)" }}>content</div>
        <textarea
        placeholder="please enter content."
          type="text"
          name="content"
          className={classes.write_board_content}
          ref={contentRef}
        />
        <br />
        <button onClick={onClickhandler} className={classes.button}>
          save
        </button>
        <br />
      </div>
    </>
  );
};

export default WriteBoard;
