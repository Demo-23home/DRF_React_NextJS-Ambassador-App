import { setUserReducer } from "./reducers/setUserReducer";
import { createStore } from 'redux';


export const configureStore = () => createStore(setUserReducer)