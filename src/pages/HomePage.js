import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalContent from "../components/part/modalcontent/ModalContent";
import WriteBoardComment from "../components/comment/WriteBoardComment";

const Test = () => {


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

  const user_info = {
    email: "test email",
    name: "test name",
    password: "test possword",
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
 
      <br />
      <a style={{ border: "1px solid black" }} href="/Test">
        test page
      </a>
      {modalIsShown && <ModalContent onClose={hideModalHandler} />}



      <WriteBoardComment />
    </Fragment>
  );
};

export default Test;
