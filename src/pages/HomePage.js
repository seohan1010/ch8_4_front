import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalContent from "../components/part/modalcontent/ModalContent";

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

  return (
    <Fragment>
      <div>This is Homepage</div>
      <button onClick={showModalHandler}>모달을 보여주세요</button>
      <p>
        <button onClick={navigateHandler}>check-out new board</button>
      </p>
      <a style={{ border: "1px solid black" }} href="/Test">
        test page
      </a>
      {modalIsShown && <ModalContent onClose={hideModalHandler} />}
    </Fragment>
  );
};

export default Test;
