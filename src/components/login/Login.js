import classes from "./Login.module.css";
import { useRef, useState,useEffect  } from "react";
import { redirect, useNavigate,useSearchParams } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();
  const [message, setMessage] = useState("");
  const [validated, setIsValidated] = useState("");
  const [searhParams, setSearchParams] = useSearchParams();
  const prev = searhParams.get("prev");




  const isValid = (userInfo) => {
    if (userInfo.email.trim().length === 0 || userInfo.email === undefined) {
      alert("please enter valid email");
      return false;
    } else if (
      userInfo.password.trim().length === 0 ||
      userInfo.password === undefined
    ) {
      alert("pleasae enter valid password");
      return false;
    }
    return true;
  };

  const login = async (userInfo) => {
    setIsValidated(false);
    const url = "http://172.31.37.225:8888/login/login";
    const obj = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
    };
try{
    const response = await fetch(url, obj);

    if (response.ok) {
      localStorage.setItem("email", userInfo.email);
      console.log("email at localStoarage : ", localStorage.getItem("email"));

      console.log(searhParams.get("prev"));
      if(prev === 'board'){
        navigate('/board');
        return;
      }
      navigate("/");
    } else {
      setMessage("please check password and Id.");
      setIsValidated(true);
      return;
    }
  }catch(err){
    alert("error occured : "+err);
  }
  };


  // this is for commit rollback test
  const onClickHandler = () => {
    const emailref = emailRef.current.value;
    const passwordref = passwordRef.current.value;

    const data = { email: emailref, password: passwordref };
    const bool = isValid(data); // input으로 들어온 정보가 유효한 정보인지 확인하는 로직
    if (bool) {
      login(data); // 유효성 검증이 완료된 데이터를 백단으로 보내는 함수 호출
    }

    console.log(emailref, passwordref);
  };

  return (
    <>
      <div className={classes.login_wrap}>
        <h3 className={classes.login_text}>Login</h3>
        {<p className={classes.error_message} style={{ marginTop: "30px" }}>{message}</p>}
        <p style={{ marginTop: "100px", alignItems: "center" }}>
          <label htmlFor="email">email </label>
          <input
            onClick={() => setMessage("")}
            ref={emailRef}
            className={classes.email_input}
            style={{ marginLeft: "28px" }}
            name="email"
            type="text"
          ></input>
        </p>
        <p>
          <label htmlFor="password">password </label>
          <input
            ref={passwordRef}
            className={classes.password_input}
            name="password"
            type="password"
          ></input>
        </p>
        <button className={classes.login_button} onClick={onClickHandler}>
          login
        </button>
      </div>
    </>
  );
};

export default Login;
