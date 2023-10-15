import classes from "./BoardComment.module.css";

const BoardComment = (props) => {
  return (
    <>
      <div className={classes.comment_wrap}>
        <div className={classes.comment_header}>
          <span className={classes.bno_span}> {"댓글 번호 : "}</span>
          <span className={classes.bno_number_span}>{"1234"}</span>
          <span className={classes.comment_writer_span_1}>{"게시자 : "}</span>
          <span className={classes.comment_writer_span_2}>{"writer1"}</span>
        </div>
        <input type="text" className={classes.comment_content_wrap} />
      </div>
    </>
  );
};

export default BoardComment;
