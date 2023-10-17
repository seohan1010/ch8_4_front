import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalContent from "../components/part/modalcontent/ModalContent";
import { userAuth } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";
import WriteBoardComment from "../components/comment/WriteBoardComment";

const Test = () => {
  const result = useSelector((state) => state.userData);
  console.warn("value from useSelector", result);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [modalIsShown, setModalIsShown] = useState(false);

  const showModalHandler = () => {
    setModalIsShown(true);
  };

  const hideModalHandler = () => {
    setModalIsShown(false);
  };

  const navigateHandler = () => {
    navigate("/board");
  };

  const product = {
    name: "i phone",
    category: "mobile",
    price: 100000,
    color: "red",
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
      <a style={{ border: "1px solid black" }} href="/Test">
        test page
      </a>
      {modalIsShown && <ModalContent onClose={hideModalHandler} />}
      <button
        onClick={() => {
          dispatch(userAuth(product));
        }}
      >
        addComment
      </button>
      <WriteBoardComment />
    </Fragment>
  );
};

export default Test;
