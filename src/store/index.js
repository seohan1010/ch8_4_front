import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import { createSlice, configureStore, combineReducers } from "@reduxjs/toolkit";
import { getBoard, insertBoard, updateBoard } from "../api/api";
import { put, takeEvery } from "redux-saga/effects";

export const GET_BOARD_STATUS = "get_board_succeed";
export const BOARD_FETCH_REQUESTED = "board_fetch_requested";
export const BOARD_INSERT_REQUESTED = "board_insert_requested";
export const BOARD_UPDATE_REQUESTED = "board_update_requested";

const SUCCEED = "succeed";
const FAILED = "failed";

function* getBoardAction() {
  const boardData = yield getBoard(); // 여기서 데이터를 받아와야함.
  console.log("boardData : ", boardData);
  yield put({ type: GET_BOARD_STATUS, payload: boardData });
}

function* boardInsertAction(payload) {
  console.log("boardInsert Saga called and payload is : ", payload);
  yield insertBoard(payload); // 데이터를 insert하고
  const boardData = yield getBoard(); // 갱신된 데이터를 가지고 온다.
  yield put({ type: BOARD_FETCH_REQUESTED, payload: boardData }); // 여기서 dispatch를 시켜주는거 같다.
  // dispatch 할 타입과 데이터 put 안에 객체 형태로 넣어주는거 같다.
}

function* boardUpdateAction(payload) {
  console.log("boardUpdateAction Saga called and payload is : " + payload);
  yield updateBoard(payload); // request로 보낼 데이터를 선언해 주는 것을 잊지 말자
}

function* boardSaga() {
  console.log("requested to rootsaga");
  yield takeEvery(BOARD_FETCH_REQUESTED, getBoardAction); // takeevery로 dispatch되는 action의 타입과 api통신을
  yield takeEvery(BOARD_INSERT_REQUESTED, boardInsertAction); // 하는 saga를 매핑? 시켜준다.
  yield takeEvery(BOARD_UPDATE_REQUESTED, boardUpdateAction);
}

export const boardReducer = (state = { boardList: [], value: "" }, action) => {
  switch (action.type) {
    case GET_BOARD_STATUS:
      if (action.payload.message === SUCCEED) {
        //---> 이 타입과 연결되어 있는 사가에서 호출한 api 통신하는 메서드에서
        console.log("action.payload.list : ", action.payload.list); // 에러가 발생했는지의 여부를 확인하기 위한 로직
        return { boardList: action.payload.list, value: "okay condition" }; // payload에 객체형태로 데이터가
      } else if (action.payload.message === FAILED) {
        // 들어가 있으므로 여기서 객체를
        console.log("action.payload.list : ", action.payload.list); // 추출한다.
        return { boardList: action.payload.list, value: "not okay condition" };
      }
      break; // case문을 벗어나기 위해 break;를 사용 ---> 사용하지 않으면 경고줄이 생김
    case BOARD_INSERT_REQUESTED:
      console.log(
        "log from board reducer board_insert_requested",
        state,
        action
      );
      return { status: 200 };
    // case BOARD_UPDATE_REQUESTED:
    //   console.log(BOARD_UPDATE_REQUESTED + " : ", action);
    default:
      return state;
  }
};



const sagaMiddleware = createSagaMiddleware();
const store = createStore(boardReducer, applyMiddleware(sagaMiddleware));
export default store;
sagaMiddleware.run(boardSaga); // 사가를 합친 사가를 실행
