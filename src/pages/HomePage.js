import { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ModalContent from "../components/part/modalcontent/ModalContent";
import WriteBoardComment from "../components/comment/WriteBoardComment";
import { useSelector, useDispatch } from "react-redux";
import {
  BOARD_FETCH_REQUESTED,
  BOARD_INSERT_REQUESTED,
  BOARD_UPDATE_REQUESTED,
} from "../store/index";

const HomePage = () => {
  const [modalIsShown, setModalIsShown] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const boardList = useSelector((state) => state.boardList);
  useEffect(() => {
    dispatch({ type: BOARD_FETCH_REQUESTED });
  }, []);

  const showModalHandler = () => {
    setModalIsShown(true);
  };

  const hideModalHandler = () => {
    setModalIsShown(false);
  };

  const navigateHandler = () => {
    navigate("/board");
  };

  const updateBoardHandler = () => {
    const data = {
      title: "modified with saga title",
      content: "modified with saga content",
      bno: "315759",
    };
    dispatch({ type: BOARD_UPDATE_REQUESTED, payload: data });
  };

  const sendBoardDataHandler = () => {
    const data = {
      title: "saga test data1",
      writer: "saga test writer1",
      content: "saga test content1",
    };
    dispatch({ type: BOARD_INSERT_REQUESTED, payload: data });
  };

  return (
    <Fragment>
      <div>This is Homepage</div>
      <button onClick={showModalHandler}>모달을 보여주세요</button>
      <p>
        <button onClick={navigateHandler}>check-out new board</button>
      </p>
      <ul>
        {boardList?.map((data) => (
          <li key={data.bno}>{data.title}</li>
        ))}
      </ul>
      <div
        style={{
          width: "300px",
          height: "30px",
          border: "1px solid black",
          margin: "auto",
        }}
      >
        <span>{"this is for test "}</span>
      </div>
      <br />

      <br />
      <button
        style={{
          border: "1px solid black",
          borderRadius: "3px",
          height: "25px",
        }}
        onClick={sendBoardDataHandler}
      >
        test insertBoard button
      </button>
      <br />
      <button
        style={{
          marginTop: "25px",
          border: "1px solid black",
          borderRadius: "3px",
          height: "25px",
        }}
        onClick={updateBoardHandler}
      >
        test updateBoard button
      </button>
      {modalIsShown && <ModalContent onClose={hideModalHandler} />}

      <WriteBoardComment />
    </Fragment>
  );
};

export default HomePage;
