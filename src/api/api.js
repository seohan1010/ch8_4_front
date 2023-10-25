const BASE_URL = "http://localhost";

const SUCCEED = "succeed";
const FAILED = "failed";

export const getBoard = async () => {
  // await 안 붙여주면은 Promise객체를 반환 한다. ---> 버전에 따라 차이점이 있는거 같다. (확실한거는 아니다.)

  const url = BASE_URL + "/board/board";
  const obj = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const data = await fetch(url, obj).catch((err) => err);

  try {
    // throw new Error();
    let { list, ph } = await data.json(); // 백엔드에서 map 형태로 데이터가 들어오므로
    return { list: list, message: SUCCEED }; // 안에있는 데이터를 꺼내서 반환한다.
  } catch (err) {
    return { list: [], message: FAILED };
  }
};

export const insertBoard = async (data) => {
  let sendData = data.payload;
  console.log(
    "insert board request has been arrived at api data is :",
    sendData
  );
  // 아래의 코드를 상수로 선언해도 되는지를 모르겠다.
  const response = await fetch(BASE_URL + "/board/board", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sendData),
  }).catch((err) => err);

  console.log("insert status is : ", response.status);
  let res = await response.json();
  console.log(res);
  if (!response.status !== 200) {
    console.log("reponse.status : ", response.status);
    return response.status;
  }
  return { status: response.status };
};

export const updateBoard = async (data) => {
  console.log("data from updateBoard api : ", data.payload);
  const url = BASE_URL + "/board/board";
  const obj = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data.payload),
  };

  let response = await fetch(url, obj);
  try {
    let reqData = response.status;
    console.log("update succeed : ", reqData);
    return reqData;
  } catch (err) {
    console.log("update failed : ", response.status);
    return response.status;
  }
};
