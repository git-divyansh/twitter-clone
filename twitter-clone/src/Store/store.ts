import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./Auth/Reducer";
import { useDispatch } from "react-redux";
import { tweetReducer } from "./Tweet/Reducer";
import { initialStateAuth, initialStateTweet } from "../Config/types";

export interface RootState {
    auth: initialStateAuth;
    tweet: initialStateTweet;
  }

const rootReducers = combineReducers({
    auth: authReducer,
    tweet : tweetReducer
});

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

