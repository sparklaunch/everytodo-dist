import users from "../modules/users";
import comments from "../modules/commentsSlice";
import todos from "../modules/todos";
import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { TypedUseSelectorHook, useDispatch } from "react-redux";

const store = configureStore({
    reducer: {
        users,
        comments,
        todos
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch();
export const useAppSelector: TypedUseSelectorHook = useSelector;
