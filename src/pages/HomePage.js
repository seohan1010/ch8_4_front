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
      

      <div>This is Homepage</div>
      <p>
        <button onClick={navigateHandler}>check-out new board</button>
      </p>
      <TestTable></TestTable>
    </Fragment>
  );
};

export default Test;
