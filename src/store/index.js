import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import { createSlice, configureStore, combineReducers } from "@reduxjs/toolkit";
import { getBoard, insertBoard, updateBoard } from "../api/api";
import { put, takeEvery } from "redux-saga/effects";

export const GET_BOARD_SUCCEED = "get_board_succeed";
export const BOARD_FETCH_REQUESTED = "board_fetch_requested";
export const BOARD_INSERT_REQUESTED = "board_insert_requested";
export const BOARD_UPDATE_REQUESTED = "board_update_requested";

function* getBoardAction() {
  const boardData = yield getBoard(); // 여기서 데이터를 받아와야함.
  console.log("boardData : ", boardData);
  yield put({ type: GET_BOARD_SUCCEED, payload: boardData });
}

function* boardInsertAction(payload) {
  console.log("boardInsert Saga called and payload is : ", payload);
  yield insertBoard(payload); // 데이터를 insert하고
  const boardData = yield getBoard(); // 갱신된 데이터를 가지고 온다.
  yield put({ type: BOARD_FETCH_REQUESTED, payload: boardData }); // 여기서 dispatch를 시켜주는거 같다.
  // dispatch 할 타입을 put 안에 객체 형태로 넣어주는거 같다.
}

function* boardUpdateAction(payload) {
  console.log("boardUpdateAction Saga called and payload is : " + payload);
  yield updateBoard(payload); // request로 보낼 데이터를 선언해 주는 것을 잊지 말자
}

function* boardSaga() {
  console.log("requested to rootsaga");
  yield takeEvery(BOARD_FETCH_REQUESTED, getBoardAction);
  yield takeEvery(BOARD_INSERT_REQUESTED, boardInsertAction);
  yield takeEvery(BOARD_UPDATE_REQUESTED, boardUpdateAction);
}

const boardReducer = (state = { boardList: [] }, action) => {
  switch (action.type) {
    case GET_BOARD_SUCCEED:
      console.log("log from board reducer get_board_succeed", state, action);
      return { boardList: action.payload };
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
sagaMiddleware.run(boardSaga);
