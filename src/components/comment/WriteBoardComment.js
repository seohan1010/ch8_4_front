import classes from "./WriteBoardComment.module.css";
import { useRef, useState } from "react";

const WriteBoardComment = ({ data, onChange, writer }) => {
  console.log("bno from write comment component : ", data);
  const [comment, setComment] = useState();

  const sendCommentData = async (obj) => {
    const url = "http://localhost:8888/boardcomment/comment";
    const data = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    };

    const response = await fetch(url, data);

    if (response.ok) {
      console.log("response status is : ", response.status);
      onChange();
    } else {
      console.warn("response status is :", response.status);
    }

    setComment("");
    console.log(obj);
  };

  const onClickHandler = () => {
    if (comment.trim().length === 0) {
      alert("please enter comment.");
      return;
    }
    const obj = {
      pcno: data,
      comment: comment,
      commenter: writer,
    };
    sendCommentData(obj);
  };

  const onChangeHandler = (e) => {
    setComment(e.target.value);
  };

  return (
    <>
      <div className={classes.comment_wrap}>
        <div className={classes.comment_header}>
          <span className={classes.bno_span}> {"게시글 작성"}</span>
          <span className={classes.bno_number_span}></span>
          <span className={classes.comment_writer_span_2}></span>
        </div>
        <textarea
          value={comment}
          onChange={(e) => onChangeHandler(e)}
          className={classes.comment_content_wrap}
        />

        <button
          onClick={() => {
            onClickHandler();
          }}
          className={classes.delete_button}
        >
          {"save"}
        </button>
      </div>
    </>
  );
};

export default WriteBoardComment;
