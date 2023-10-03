import classes from "./BoardDetail.module.css";
import { useCallback, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BoardDetail = ({ detail }) => {
  const [isValid, setIsValid] = useState(true);

  const [title, setTitle] = useState("");
  const [writer, setWriter] = useState("");
  const [content, setContent] = useState("");

  

  useEffect(
    ()=>{
      setTitle(detail.title);
      setWriter(detail.writer);
      setContent(detail.content);
    },[detail]
  )

  console.log('<<< detail is : ',detail)
  const titleRef = useRef();
  const writerRef = useRef();
  const contentRef = useRef();


  const navigate = useNavigate();
 
  const deleteBoard = useCallback(async () => {
    const bool = window.confirm("삭제 하시겠습니까?");
    if (!bool) return;
    console.log("bno for trasfer : ", detail.bno);
    const url = "http://localhost/board/board/" + detail.bno;
    const obj = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    try {
      const response = await fetch(url, obj).then((res) => res);
      console.log(response.status);
      navigate("/board");
    } catch (err) {
      alert("board delete failed please try again");
    }
  }, []);

  const saveBoard = useCallback(async () => {
    const writerref = writerRef.current.value.trim();
    const titleref = titleRef.current.value.trim();
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

    const data = {
      title: titleref,
      writer: writerref,
      content: contentref,
      bno: detail.bno,
    };

    const url = "http://localhost/board/board";
    const obj = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(url, obj).then((res) => res);
      console.log(response.status);
      alert("save board succeed");
      navigate("/board");
    } catch (err) {
      alert("save board failed. please try again");
      return;
    }
  }, []);

  const onClickHandler = (identifier) => {
    if (identifier === "delete") {
      deleteBoard();
    } else if (identifier === "edit") {
      setIsValid(false);
    } else if (identifier === "save") {
      saveBoard();
      setIsValid(true);
    }
  };

  return (
    <>
      <div className={classes.board_detail_wrap}>
        <label htmlFor="title">title</label>
        <input
          type="text"
          name="title"
          className={classes.board_detail_title}
          ref={titleRef}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          readOnly={isValid ? true : false}
        />
        <br />
        <label htmlFor="writer">writer</label>
        <input
          type="text"
          name="writer"
          className={classes.board_detail_writer}
          ref={writerRef}
          value={writer}
          onChange={(e) => {
            setWriter(e.target.value);
          }}
          readOnly={isValid ? true : false}
        />
        <br />
        <div style={{ transform: "translateX(13px)" }}>content</div>
        <textarea
          type="text"
          name="content"
          className={classes.board_detail_content}
          ref={contentRef}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          readOnly={isValid ? true : false}
        />
        <br />
        <button
          className={classes.delete_button}
          onClick={() => {
            onClickHandler("delete");
          }}
        >
          delete
        </button>
        <button
          className={classes.edit_button}
          onClick={(e) => {
            onClickHandler(e.target.innerHTML);
          }}
        >
          {isValid ? "edit" : "save"}
        </button>

        <br />
      </div>
    </>
  );
};

export default BoardDetail;
