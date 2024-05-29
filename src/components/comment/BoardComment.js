import classes from "./BoardComment.module.css";
import { useState, useEffect } from "react";

const modifyCommentRequest = async (cno, modifiedComment) => {
  console.log(cno, modifiedComment);

  const data = {
    cno: cno,
    comment: modifiedComment,
  };

  const url = "http://localhost:8888/boardcomment/comment";
  const obj = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  const response = await fetch(url, obj).catch((err) => err);
  console.log(response.status);
  console.log("response is : ", response);
  if (!response.status === 200) {
    return response.status;
  }

  return response.status;
};

const deleteComment = async (cno) => {
  console.log("selected delete comment cno is :", cno);

  const data = {
    cno: cno,
  };

  const url = "http://localhost:8888/boardcomment/comment";
  const obj = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  const response = await fetch(url, obj).catch((err) => err);

  return response.status;
};

const BoardComment = ({ data, onChange }) => {
  const [comment, setComment] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [commentNo, setCommentNo] = useState(0); // 선택된 댓글의 번호를 알려주는 state
  const [selectedComment, setSelectedComment] = useState(""); // 선택된 댓글의 내용을 알려주는 state
  const [isCommentModified, setIsCommentModified] = useState(false);

  console.log("received data is", data);

  useEffect(() => {
    console.log("from boardComment", data);

    const getComment = async () => {
      const url = "http://localhost:8888/boardcomment/commentList?pcno=" + data;
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
  }, [onChange, data, isCommentModified]); // data는 바뀌지 않지만 useEffect()에서 사용하기 때문에 추가 해주었다.

  const modifyComment = async () => {
    if (selectedComment.trim().length === 0) {
      alert("please enter valid comment");
      return;
    }

    const modifyStatus = await modifyCommentRequest(commentNo, selectedComment);
    console.log("modify status", modifyStatus);
    if (modifyStatus === 200) {
      console.log("modifiy succeed");
      setIsCommentModified((data) => !data);
      return;
    } else {
      alert("cannot modify comment please try again");
      return;
    }
  };

  const onClickHander = (cno, identifier, data) => {
    console.log("cno is :", cno);
    if (identifier === "edit") {
      console.log("edit button clicked");
      setCommentNo(cno); // edit을 누른 답글의 cno를 업데이트
      const selectedComment = comment.filter((data) => data.cno === cno);
      console.log("selected Comment is :", selectedComment[0].comment);
      setSelectedComment(selectedComment[0].comment);

      return;
    } else if (identifier === "save") {
      console.log("modified data is :", data);
      modifyComment();
      setCommentNo(0);
    }
  };

  const onCommentChangeHandler = (e) => {
    setSelectedComment(e.target.value);
    console.log("modifying comment value is ", e.target.value);
  };

  // 비동기 함수를 호출하는 함수가 비동기 함수가 아니면은 response로 promosie를 반환받게 된다.
  const onDeleteHandler = async (cno) => {
    const bool = window.confirm("really wanna delete?");
    if (bool) {
      const deleteStatus = await deleteComment(cno);
      console.log("deleted status is :", deleteStatus);

      if (deleteStatus === 200) {
        setIsCommentModified((data) => !data);
        return;
      } else {
        alert("deleted failed");
      }
    }
  };


  const isUser = data.commenter === localStorage.getItem('email');
  console.log(data.commenter);

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
                value={commentNo === data.cno ? selectedComment : data.comment}
                readOnly={commentNo === data.cno ? false : true}
                // ref={commentRef}
                onChange={(e) => onCommentChangeHandler(e)}
              />
              <button
                className={classes.edit_button}
                onClick={(e) =>
                  onClickHander(data.cno, e.target.innerHTML, data)
                }
                disabled={!isUser}
              >
                {/* commentCno와 해당 댓글의 cno가 같으면 save  ---> 한번에 하나의 댓글만 수정이 가능함*/}
                {data.cno === commentNo ? "save" : "edit"}
              </button>
              <button
                className={classes.delete_button}
                onClick={() => onDeleteHandler(data.cno)}
                disabled={!isUser}
              >
                {"delete"}
              </button>
            </div>
          ))
        : "no data found"}
    </div>
  );
};

export default BoardComment;
