import { useState } from "react";

const RegisterPage = () => {
  const [selectedFile, setSelectedFile] = useState([]);

  const onChangeHandler = (e) => {
    e.preventDefault();
    e.persist();
    console.log(e.target.files);
    const selectedFiles = e.target.files;
    const fileList = [...selectedFiles];
    console.log("fileList is :", fileList);
    setSelectedFile(fileList);
  };

  const uploadFile = async () => {
    const formData = new FormData();

    // 생성된 formData객체에 데이터를 넣고나서
    // for (let i = 0; i < selectedFile.length; i++) {
    formData.append("file", selectedFile);
    // }

    // 데이터가 입력된 객체의 정보를 request에 사용할 body에 작성
    const url = "http://localhost/board/uploadFile";
    const obj = {
      method: "POST",
      headers: { "Content-Type": "false" },
      body: formData,
    };
    const response = await fetch(url, obj);
    console.log(response.status);
  };

  const onClickHandler = () => {
    uploadFile();
    console.log("file is :", selectedFile);
  };

  return (
    <>
      <div
        style={{
          position: "relative",
          border: "1px solid black",
          borderRadius: "5px",
          width: "500px",
          height: "300px",
          margin: "auto",
        }}
      >
        <div>this is FileUploadTest</div>
        <div
          style={{
            border: "1px solid black",
            height: "200px",
            marginTop: "25px",
            marginLeft: "10px",
            marginRight: "10px",
          }}
        ></div>
        <br />
        <input
          style={{
            border: "1px solid black",
            borderRadius: "3px",
            display: "inline-block",
            position: "absolute",
            left: "10px",
          }}
          type="file"
          id="file"
          name="file"
          onChange={(e) => onChangeHandler(e)}
          multiple
        ></input>
        <button
          style={{
            display: "inline-block",
            transform: "translateX(210px)",
            width: "60px",
          }}
          onClick={onClickHandler}
        >
          save
        </button>
      </div>
    </>
  );
};

export default RegisterPage;
