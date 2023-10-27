import { Fragment, useState, useEffect } from "react";
import { useNavigate, redirect } from "react-router-dom";
import ModalContent from "../components/part/modalcontent/ModalContent";
import WriteBoardComment from "../components/comment/WriteBoardComment";
import { useSelector, useDispatch } from "react-redux";
import {
  BOARD_FETCH_REQUESTED,
  BOARD_INSERT_REQUESTED,
  BOARD_UPDATE_REQUESTED,
} from "../store/index";

export const boardListSelector = (state) => {
  return state.boardReducer.boardList === undefined
    ? []
    : state.boardReducer.boardList;
}; // selector 에서 undefined를 반환하면은 빈배열을 반환해서 컴포넌트에서 undefined에러가 발생하는 것을 방지
const HomePage = () => {
  const [modalIsShown, setModalIsShown] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const boardList = useSelector(boardListSelector); // combineReducer를 했기 때문에 타고 올라가서 값을 가져와야 한다.
  const value = useSelector((state) => state.boardReducer.value);
  const fetchStatus = useSelector((state) => state.boardReducer.fetchStatus);
  useEffect(() => {
    dispatch({ type: BOARD_FETCH_REQUESTED });
  }, [fetchStatus, dispatch]);

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

  const logoutHandler = () => {
    localStorage.removeItem("email");
    console.log("button clicked");
    // redirect("/");
    redirect("/");
  };

  const sendBoardDataHandler = () => {
    const data = {
      title: "saga test data2",
      writer: "saga test writer2",
      content: "saga test content2",
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
      <div
        style={{
          border: "1px solid black",
          width: "500px",
          margin: "auto",
          marginBottom: "10px",
        }}
      >
        {"value is:" + value ? value : "no data"}
        <ul>
          {boardList.length !== 0 ? (
            boardList.map((data) => <li key={data.bno}>{data.title}</li>)
          ) : (
            <p
              style={{
                border: "1px solid black",
                width: "200px",
                margin: "auto",
              }}
            >
              "no data found"
            </p>
          )}
        </ul>
      </div>
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
      <button onClick={() => logoutHandler()}>logout button</button>
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
