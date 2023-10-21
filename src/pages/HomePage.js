import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalContent from "../components/part/modalcontent/ModalContent";
import WriteBoardComment from "../components/comment/WriteBoardComment";
import { useSelector, useDispatch } from "react-redux";
import { INCREMENT, DECREMENT, INCREASE } from "../store/counter";

const HomePage = () => {
  const [modalIsShown, setModalIsShown] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const counter = useSelector((state) => state.counter);

  const incrementHandler = () => {
    dispatch({ type: INCREMENT });
  };
  const increaseHandler = () => {
    dispatch({ type: INCREASE, value: 5 });
  };
  const decrementHandler = () => {
    dispatch({ type: DECREMENT });
  };

  const showModalHandler = () => {
    setModalIsShown(true);
  };

  const hideModalHandler = () => {
    setModalIsShown(false);
  };

  const navigateHandler = () => {
    navigate("/board");
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
          width: "300px",
          height: "30px",
          border: "1px solid black",
          margin: "auto",
        }}
      >
        <span>{"this is for test "}</span>
      </div>
      <br />
      <button onClick={incrementHandler} style={{ marginRight: "20px" }}>
        increment
      </button>
      <button onClick={increaseHandler}>increase</button>
      <button onClick={decrementHandler}>decrement</button>
      {`counter is : ${counter}`}
      <br />
      <a style={{ border: "1px solid black" }} href="/Test">
        test page
      </a>
      {modalIsShown && <ModalContent onClose={hideModalHandler} />}

      <WriteBoardComment />
    </Fragment>
  );
};

export default HomePage;
