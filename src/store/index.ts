import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { siteSelectorReducer } from "./siteselector.reducer";
import thunkMiddleware from "redux-thunk";
const rootReducer = combineReducers({ siteSelectorReducer });

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));
  return store;
}
