// The code imports necessary functions and modules from Redux and other libraries.
// It defines a reducer for the "users" state and combines it with other reducers
// using the combineReducers function. It sets up configuration for persisting the
// Redux store using redux-persist. It creates a Redux store with the persisted
// reducer. Finally, it creates a persistor object to persist the store.
const { combineReducers, createStore } = require("redux");
const { userReducer } = require("./reducers");
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
const allReducer = combineReducers({
  users: userReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, allReducer);
export const store = createStore(persistedReducer);

export let persistor = persistStore(store);
