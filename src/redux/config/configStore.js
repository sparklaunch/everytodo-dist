import users from "../modules/users";
import comments from "../modules/commentsSlice";
import todos from "../modules/todos";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    users,
    comments,
    todos,
  },
});

export default store;
