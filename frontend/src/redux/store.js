import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "@redux-devtools/extension";

import rootReducer from "./reducers/root.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth","preference"],
};
const logger = createLogger({ collapsed: true });
const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = () => {
  const store = createStore(
    persistedReducer,
    undefined,
    composeWithDevTools(applyMiddleware(thunk, logger))
  );
  const persistor = persistStore(store);
  return { store, persistor };
};

export const { store, persistor } = configureStore();
