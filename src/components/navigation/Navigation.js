import classes from "./Navigation.module.css";
import { Link, useNavigate, NavLink } from "react-router-dom";



const Navigation = () => {


  const navigate = useNavigate();
  const token = localStorage.getItem("email");



const onClickHandler = () =>{
  localStorage.removeItem("email");
  navigate('/');
}


const loginCheck = ()=>{
  if(!token){
    alert('please login first...')
    navigate('/login?prev=board');
  }else {
    navigate('/board');
    
  }
}

  return (
    <>
      <div className={classes.navigation_wrap}>
        <div className={classes.title}>
          <Link to={"/"} className={classes.title_anchior_tag}>
            ch8_4
          </Link>
        </div>
        <ul className={classes.button_wrap}>
          <li className={classes.li_first}  ><NavLink end to={"/"} className={({isActive})=>isActive? classes.active : undefined}>{"home"}</NavLink></li>
          <li
            className={classes.li_second}
            onClick={()=>loginCheck()}
     
          ><NavLink end to={''} className={({isActive})=>isActive? classes.active : undefined}> {"board"}</NavLink> </li>
          {!token && (
            <li
              className={classes.li_third}
            ><NavLink end to={"/login"} className={({isActive})=>isActive? classes.active : undefined}>{"login"}</NavLink></li>
          )}{" "}
          {!token && (
            <li
              className={classes.li_third}
              href={"/register"}
            ><NavLink end to={"/register"} className={({isActive})=>isActive? classes.active : undefined}>{"register"}</NavLink></li>
          )}
          {token && (
            <li
              className={classes.li_third}
              onClick={()=>onClickHandler()}
            >{"logout"}</li>
          )}
        </ul>
      </div>
    </>
  );
};

export default Navigation;
