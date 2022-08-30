import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type User = {
    id: string,
    email: string,
    password: string
};

export interface StateType {
    users: User[];
    isLoading: boolean;
    error: any;
}

const initialState: StateType = {
    users: [],
    isLoading: false,
    error: null
};

export const createUserThunk = createAsyncThunk(
    "users/createUser",
    async (newUser: User, thunk) => {
        try {
            await axios.post("http://localhost:3001/users", newUser);
        } catch (error) {
            return thunk.rejectWithValue(error);
        }
    }
);

export const getUsersThunk = createAsyncThunk(
    "users/getUsers",
    async (_, thunk) => {
        try {
            const { data } = await axios.get("http://localhost:3001/users");
            if (data) {
                return thunk.fulfillWithValue(data);
            } else {
                throw new Error("No Redundancy");
            }
        } catch (error) {
            return thunk.rejectWithValue(error);
        }
    }
);

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUsersThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUsersThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload;
            })
            .addCase(getUsersThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
        builder
            .addCase(createUserThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createUserThunk.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(createUserThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export default userSlice.reducer;
