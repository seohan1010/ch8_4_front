import BoardDetail from "../components/board/BoardDetail";
import { useParams,Link } from "react-router-dom";
import { useState, useEffect } from "react";

const BoardDetailPage = () => {
  const [boardDetail, setBoardDetail] = useState("");

  const params = useParams();
        
  const bno = params.bno;
  const url = "http://localhost/board/detail/" + bno;
  
  useEffect(() => {
    console.log('this is board detail');
    const getBoardDetail = async () => {
      try {
        const res = await fetch(url).then((res) => res.json());

        const board = res;
        setBoardDetail(board);
      } catch (err) {
        console.log("<<<<<<< fetch err :" + err);
      }
    };
    getBoardDetail();
  }, [url]);

  return (
    <>
      <div>this is BoardDetail.</div>
      <div>{`bno is :` + bno}</div>
      {boardDetail === "" || boardDetail === undefined ? (
        "no data found"
      ) : (
        <div>{`${boardDetail.bno} || ${boardDetail.writer} || ${boardDetail.title} || ${boardDetail.content}`}</div>
      )}
      <p><Link to='..' relative='path' >Back</Link></p>
    </>
  );
};

export default BoardDetailPage;
