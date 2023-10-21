import { createStore } from "redux";
import { createSlice, configureStore, combineReducers } from "@reduxjs/toolkit";
import counterReducer from './counter';



const store = createStore(counterReducer);


export default store;
