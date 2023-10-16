import classes from "./BoardComment.module.css";
import { useState, useEffect } from "react";

const BoardComment = ({ data }) => {
  const [comment, setComment] = useState("");
  const [isValid, setIsValid] = useState(false);
  console.log("received data is", data);

  useEffect(() => {
    console.log("from boardComment", data);

    const getComment = async () => {
      const url = "http://localhost/boardcomment/commentList?pcno=" + data;
      const obj = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };

      console.log("getComment has been called.");
      try {
        setIsValid(false);
        const response = await fetch(url, obj);
        const commentList = await response.json();
        console.log("commentData is : ", commentList);

        if (commentList.length > 0) {
          setComment(commentList);
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      } catch (err) {
        console.log("error occured.");
      }
    };
    getComment();
  }, []);

  return (
    <div className={classes.comment_card}>
      {isValid
        ? comment.map((data) => (
            <div
              key={Number(data.cno) + Number(1)}
              className={classes.comment_wrap}
            >
              <div className={classes.comment_header}>
                <span className={classes.bno_span}> {"게시일 : "}</span>
                <span className={classes.bno_number_span}>
                  {data.registerDate}
                </span>
                <span className={classes.comment_writer_span_1}>
                  {"게시자 : "}
                </span>
                <span className={classes.comment_writer_span_2}>
                  {data.commenter}
                </span>
              </div>
              <textarea
                className={classes.comment_content_wrap}
                value={data.comment}
                readOnly={true}
              />
              <button className={classes.edit_button}>{"edit"}</button>
              <button className={classes.delete_button}>{"delete"}</button>
            </div>
          ))
        : "no data found"}
    </div>
  );
};

export default BoardComment;
