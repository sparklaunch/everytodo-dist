import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

/* URL */
const API_COMMENT_URL = process.env.API_COMMENTS_URL;

/* initialState */
// data, isLoading, error로 상태관리
const initialState = {
  comments: [],
  isLoding: false,
  error: null,
};

/* Thunk function */
// [GET - 특정 todoId comment 조회]
export const __getComments = createAsyncThunk(
  "GET_COMMENTS",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.get(API_COMMENT_URL + `?todoId=${payload}`);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// [POST]
export const __addComments = createAsyncThunk(
  "ADD_COMMENTS",
  async (newComments, thunkAPI) => {
    try {
      const { data } = await axios.post(API_COMMENT_URL, newComments);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// [DELETE]
export const __deleteComments = createAsyncThunk(
  "DELETE_COMMENTS",
  async (id, thunkAPI) => {
    try {
      await axios.delete(API_COMMENT_URL + `/` + id);
      return thunkAPI.fulfillWithValue(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// [UPDATE]
export const __updateComments = createAsyncThunk(
  "UPDATE_EDITCHECK",
  async (getEditData, thunkAPI) => {
    const { id, updateComment } = getEditData;
    try {
      const { data } = await axios.patch(
        API_COMMENT_URL + `/` + id,
        updateComment
      );
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/* createSlice */
// 리듀서 로직이 실행되면서 이 객체가 하나의 action creator가 되기 때문에 reducers만 만들면 됨
export const comments = createSlice({
  name: "comments", // 모듈 이름
  initialState, // 초기 상태 값
  reducers: {
    /* 화면 상에서만 데이터 변경 -> 실제 db에서 editCheck 변경 X */
    checkEdit: (state, action) => {
      state.comments = state.comments.map((item) =>
        item.id === action.payload
          ? { ...item, editCheck: !item.editCheck }
          : item
      );
    },
  }, // 모듈의 Reducer 로직
  extraReducers: {
    /* Pending */
    [__getComments.pending]: (state, action) => {
      state.isLoding = true; // 네트워크 요청 시작시, 로딩 상태를 true로 변경
    },
    [__addComments.pending]: (state, action) => {
      state.isLoding = true;
    },
    [__deleteComments.pending]: (state, action) => {
      state.isLoding = true;
    },
    [__updateComments.pending]: (state, action) => {
      state.isLoding = true;
    },
    /* Fulfilled */
    [__getComments.fulfilled]: (state, action) => {
      state.isLoding = false; // 네트워크 요청이 끝나서 false로 변경
      state.comments = action.payload; // store에 있는 comments에 서버에서 가져온 comments를 넣어줌
    },
    [__addComments.fulfilled]: (state, action) => {
      state.comments = state.comments.concat(action.payload);
    },
    [__deleteComments.fulfilled]: (state, action) => {
      state.comments = state.comments.filter(
        (item) => item.id !== action.payload
      );
    },
    [__updateComments.fulfilled]: (state, action) => {
      state.comments = state.comments.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    /* Rejected */
    [__getComments.rejected]: (state, action) => {
      state.isLoding = false; // 에러가 발생, 네트워크 요청이 끝나서 false
      state.error = action.payload; //catch된 error 객체를 state.error에 넣어줌
    },
  },
});

/* export */
export const { checkEdit } = comments.actions;
export default comments.reducer;
