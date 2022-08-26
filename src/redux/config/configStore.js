import users from "../modules/users";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        users
    }
});

export default store;