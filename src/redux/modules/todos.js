import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

/* InitialState */
// data, isLoading, error로 상태관리
const initialState = {
  todos: [],
  isLoading: false,
  error: null,
};

/* Thunk function */
// [GET - 특정ID를 가진 TODO 데이터만 조회]
export const __getTodos = createAsyncThunk(
  "GET_TODOS",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5001/todos/${payload}`
      );
      console.log("data", data);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// [DELETE]
export const __deleteTodo = createAsyncThunk(
  "DELETE_TODOS",
  async (payload, thunkAPI) => {
    try {
      await axios.delete(`http://localhost:5001/todos/${payload}`);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// [UPDATE]
export const __updateTodo = createAsyncThunk(
  "UPDATAE_TODOS",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://localhost:5001/todos/${payload.id}`,
        payload
      );
      console.log("response", response);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/* createSlice */
export const todosSlice = createSlice({
  // 모듈 이름
  name: "todos",
  // 초기 상태값
  initialState,
  // reducers
  reducers: {},
  //extraReducers
  extraReducers: {
    /* Pending */
    [__getTodos.pending]: (state, action) => {
      state.isLoading = true;
    },
    /* Fulfilled */
    [__getTodos.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos = [action.payload];
      console.log("[todos모듈]__getTodos", state.todos);
    },
    [__deleteTodo.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos = state.todos.filter((item) => item.id !== action.payload);
    },
    [__updateTodo.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos = state.todos.map((item) =>
        item.id === action.id
          ? { ...item, title: action.title, content: action.content }
          : item
      );
    },
    /* Rejected */
    [__getTodos.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__deleteTodo.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

/* export */
export const {} = todosSlice.actions;
export default todosSlice.reducer;
