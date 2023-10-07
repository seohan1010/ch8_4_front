import BoardList from "../components/board/BoardList";
import { useLoaderData } from "react-router-dom";

const BoardPage = () => {
  const data = useLoaderData();

  return (
    <>
      <BoardList board={data} />
    </>
  );
};

export default BoardPage;

export async function loader() {
  const url = "http://localhost/board/board";
  const obj = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const response = await fetch(url, obj).then((res) => res);

  try {
    // await로 데이터를 받고난 다음에 해당 받은 데이터를 사용하게 로직을 작성하여야 한다.
   return await response.json();
  
  } catch (err) {
    console.log("<<<<<<<<<<<<<<< err from loader is : " + err);
    return {ph:null,list:null};
  }

 
}
