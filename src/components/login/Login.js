import classes from "./Login.module.css";
import { useRef, useState } from "react";
import { redirect, useNavigate} from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();
  const [message, setMessage] = useState("");
  const [validated, setIsValidated] = useState("");

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
    const url = "http://localhost/login/login";
    const obj = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
    };

    const response = await fetch(url, obj);

    if (response.ok) {
      localStorage.setItem("email", userInfo.email);
      console.log("email at localStoarage : ", localStorage.getItem("email"));
      navigate("/");
    } else {
      setMessage("please check password and Id.");
      setIsValidated(true);
      return;
    }
  };

  const onClickHandler = () => {
    const emailref = emailRef.current.value;
    const passwordref = passwordRef.current.value;

    const data = { email: emailref, password: passwordref };
    const bool = isValid(data);
    if (bool) {
      login(data);
    }

    console.log(emailref, passwordref);
  };

  return (
    <>
      <div className={classes.login_wrap}>
        <h3 className={classes.login_text}>Login</h3>
        {<p style={{ marginTop: "30px" }}>{message}</p>}
        <p style={{ marginTop: "150px", alignItems: "center" }}>
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
