import { Fragment } from "react";
import { useNavigate } from 'react-router-dom';
import TestTable from '../components/testcomponent/TestTable';


const Test = () => {
 
  const navigate = useNavigate();


  const navigateHandler = ()=>{
      navigate('/board');
  }


  return (
    <Fragment>
      

      <div>This is Homepage</div>s
      <p>
        <button onClick={navigateHandler}>check-out new board</button>
      </p>
      <a style={{border:'1px solid black'}} href='/Test'>test page</a>
      <TestTable></TestTable>
    </Fragment>
  );
};

export default Test;
