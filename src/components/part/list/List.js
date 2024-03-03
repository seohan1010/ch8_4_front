import './List.module.css';
import { NavLink } from 'react-router-dom';
import classes from './List.module.css';

// NavLink 는 Link와는 다르게 className에서 isActive를 객체로 받아서 css를 적용해줄수 있다. 
// 활성화된 Link일 경우에 isActive는 true를 반환하는거 같다. 
const List = (props) => {

const onClickHandler = ()=>{
    localStorage.removeItem("email");
}

return(
<>
<li className={props.className} onClick={()=>onClickHandler()}><NavLink end  to={props.href} className={({isActive})=>isActive? classes.active : undefined }  >{props.content}</NavLink></li>
</>
);

}

export default List;