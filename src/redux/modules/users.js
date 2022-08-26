import { createSlice } from "@reduxjs/toolkit";

type User = {
    id: string,
    email: string,
    password: string
};

export interface StateType {
    users: User[];
}

const initialState: StateType = {
    users: []
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        createUser: (state, action) => {
            state.users.push(action.payload);
        }
    }
});

export const { createUser } = userSlice.actions;
export default userSlice.reducer;
