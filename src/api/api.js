const BASE_URL = "http://172.31.37.225:8888";

const SUCCEED = "succeed";
const FAILED = "failed";

export const getBoard = async () => {
  // await 안 붙여주면은 Promise객체를 반환 한다. ---> 버전에 따라 차이점이 있는거 같다. (확실한거는 아니다.)

  const url = BASE_URL + "/board/board";
  const obj = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  // fetch하면서 데이터를 변환 및 에러 핸들링을 같이 해준다.
  const data = await fetch(url, obj).catch((err) => err);
  console.log("data from getBoard is :", data);

  let { list, ph } = await data.json();

  // 상태코드가 잘 뜬다. ---> json()을 사용하지 않은 response에는 Response객체가 있는데,
  //                         안에있는 상태 코드는 바로 사용이 가능하다.
  console.log("data.status", data.status, data.ok);
  console.log("data.url is :", data.url);

  if (!data.ok) {
    return { list: list, message: FAILED };
  }

  // 백엔드에서 map 형태로 데이터가 들어오므로
  // 안에있는 데이터를 꺼내서 반환한다.
  return { list: list, message: SUCCEED };
};
// response.json()); //JSON.parse()할 데이터가 없을때 json()함수를 사용하면 parse에러가 발생한다.
// ---> 즉, status코드만 받아오고 다른 데이터를 받아오지 않으면 parse할 데이터가 없어서 오류가 발생한다.
//      status코드를 제외하고 받아올데이터가 없을때 promise객체가 아닌 response객체를 반환하므로
//      바로 status코드를 사용할수 있다.
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
  // console.log("response.json() is :", response.json()); //JSON.parse()할 데이터가 없을때 json()함수를 사용하면 parse에러가 발생한다.
  console.log("response is :", response);

  if (response.status !== 200) {
    console.log("response.status is not 200");
    console.log("reponse.status : ", response.status);
    return { status: response.status };
  }

  console.log("response.status is 200");
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

  let response = await fetch(url, obj).catch((err) => err);

  console.log("updateBoard status is : ", response.status);
  return response.statua;
};




