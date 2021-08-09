import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

import User from "./modules/user";
import Home from "./modules/home";
import Timeline from "./modules/timeline";
import TimelineFeed from "./modules/timelinefeed";
import Search from "./modules/search";
import Search2 from "./modules/search2";
export const history = createBrowserHistory();

const rootReducer = combineReducers({
  router: connectRouter(history),
  user: User,
  home: Home,
  timeline: Timeline,
  timelinefeed:TimelineFeed,
  Search:Search,
  Search2:Search2,
});

const middlewares = [thunk.withExtraArgument({ history: history })];

const env = process.env.NODE_ENV;

if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}


const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      })
    : compose;


const enhancer = composeEnhancers(applyMiddleware(...middlewares));
let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();