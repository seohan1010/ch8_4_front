import classes from "./TestTable.module.css";
import { useEffect, useState } from "react";
import CheckBox from "../part/checkbox/CheckBox";
const TestTable = () => {
  const [isValid, setIsValid] = useState(false);
  const [empEvalList, setEmpEvalList] = useState([]);
  const [selectedEmp, setSelectedEmp] = useState("");

  const getEmpEvalList = async () => {
    const url = "http://localhost:9101/empinfomgmt/evaluation";
    const obj = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    try {
      setIsValid(false);
      const response = await fetch(url, obj).then((res) => res);

      if (!response.ok) {
        console.log("fetch data has been failed.");
      } else {
        const data = await response.json();

        const { empevalList } = data;
        console.log("<<<<<<<<<< empevalList : ", empevalList);

        console.log(data);
        setEmpEvalList(empevalList);
        setIsValid(true);
      }
    } catch (err) {}
  };

  useEffect(() => {
    getEmpEvalList();
  }, []);

  // 체크된 사원의 사원코드를 state에 저장하는 코드
  const changeHandler = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setSelectedEmp((prv) => [...prv, { empCode: value }]);
      console.log(checked, value);
      console.log(selectedEmp);
    } else {
      console.log("not checked.");
    }
  };

  const onClickHandler = () => {
    console.log("selectedEmpList is : ", selectedEmp);
  };

  return (
    <>
      <div>here</div>
      <div>hi</div>
      <div className={classes.over_table_div}>
        <button
          onClick={onClickHandler}
          style={{ display: "inline-block", marginRight: "10px" }}
        >
          getSelectedEmpList
        </button>
        <button style={{ display: "inline-block", marginLeft: "10px" }}>
          hello2
        </button>
      </div>

      <table className={classes.table_wrap}>
        <tr className={classes.table_tr}>
          <td className={classes.table_td}></td>
          <td className={classes.table_td}>사원코드</td>
          <td className={classes.table_td}>사원명</td>
          <td className={classes.table_td}>입사일</td>
          <td className={classes.table_td}>부서명</td>
          <td className={classes.table_td}>직급</td>
          <td className={classes.table_td}>승인상태</td>
          <td className={classes.table_td}>등급</td>
        </tr>
        {isValid &&
          empEvalList.map((emp) => (
            <tr className={classes.table_tr}>
              {}
              <td className={classes.table_td}>
                <input
                  type="checkbox"
                  value={emp.empCode}
                  onChange={changeHandler}
                />
              </td>

              <td className={classes.table_td}>{emp.empCode}</td>
              <td className={classes.table_td}>{emp.empName}</td>
              <td className={classes.table_td}>{emp.applyDay}</td>
              <td className={classes.table_td}>{emp.deptName}</td>
              <td className={classes.table_td}>{emp.position}</td>
              <td className={classes.table_td}>{emp.approvalStatus}</td>
              <td className={classes.table_td}>{emp.grade}</td>
            </tr>
          ))}
      </table>
    </>
  );
};

export default TestTable;
