import BoardDetail from "../components/board/BoardDetail";
import { useParams, Link, json,useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";

const BoardDetailPage = () => {
  const [boardDetail, setBoardDetail] = useState("");
  const [isValid, setIsValid] = useState(false);

const data = useLoaderData();
  const params = useParams();


  return (
    <>
     
    
      <BoardDetail detail={data} />
    
    </>
  );
};

export default BoardDetailPage;

export async function loader({ request, params }) {
  const bno = params.bno;

  const url = "http://13.208.64.8:8888/board/detail/" + bno;
  const data = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch(url, data);

  if (!response.ok) {
    return json(
      { message: "Could not fetch details for selected event." },
      { status: 500 }
    );
  } else {
    return await response.json();
  }
}
