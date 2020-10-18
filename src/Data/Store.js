import { combineReducers, createStore, applyMiddleware } from "redux";
import BoardReduser from "./BoardReducer";
import ListReduser from "./ListReducer";
import TaskReducer from "./TaskReducer";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import UserReducer from "./UserReducer";



const persistConfig = {
  key: "root",
  storage,
  // blacklist: ['auth'],  
};

// const authPersistConfig = { //Это для токенов
//   key: 'auth',
//   storage,
// };
let reducers = combineReducers({
  // auth: persistReducer(authPersistConfig, UserReducer),
  user: UserReducer,  
  boards: BoardReduser,
  lists: ListReduser,
  tasks: TaskReducer,  
});

const persistedReducer = persistReducer(persistConfig, reducers);

export let store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware)),
  
);
export let persistor = persistStore(store);
export let test = persistStore(store);

 
 window.store = store.getState().tasks