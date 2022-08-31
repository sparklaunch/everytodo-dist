import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

/* URL */
const REACT_APP_API_TODOS_URL = process.env.REACT_APP_API_TODOS_URL;

/* InitialState */
// data, isLoading, error로 상태관리
const initialState = {
  todos: [],
  isLoading: false,
  error: null,
};

/* Thunk function */
// [GET - 데이터 전체 조회]
export const __getAllTodos = createAsyncThunk(
  "GET_ALL_TODOS",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.get(REACT_APP_API_TODOS_URL);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// [GET - 특정ID를 가진 TODO 데이터만 조회]
export const __getTodos = createAsyncThunk(
  "GET_TODOS",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.get(REACT_APP_API_TODOS_URL + `/` + payload);
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
      await axios.delete(REACT_APP_API_TODOS_URL + `/` + payload);
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
      const response = await axios.patch(
        REACT_APP_API_TODOS_URL + `/` + payload.id,
        payload
      );
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
    [__getAllTodos.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getTodos.pending]: (state, action) => {
      state.isLoading = true;
    },
    /* Fulfilled */
    [__getAllTodos.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos = action.payload;
    },
    [__getTodos.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos = [action.payload];
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
    [__getAllTodos.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
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
