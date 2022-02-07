import { combineReducers, configureStore } from "@reduxjs/toolkit";
import professionsReducer from "./professions";
import qualitiesReducer from "./qualities";
import usersReducer from "./users";

const rootReducer = combineReducers({
    qualities: qualitiesReducer,
    professions: professionsReducer,
    users: usersReducer
    // comments:
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
