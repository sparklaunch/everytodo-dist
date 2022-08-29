import users from "../modules/users";
import comments from "../modules/commentsSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    users,
    comments,
  },
});

export default store;
