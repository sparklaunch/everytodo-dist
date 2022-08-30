import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// get url
const get_url = `http://localhost:3001/comments`;

/* initialState */
// data, isLoading, error로 상태관리
const initialState = {
  comments: [],
  isLoding: false, // 서버에서 comments를 가져오는 상태를 나타내는 값 (초기값은 false)
  error: null, //서버와 통신이 실패한 경우 서버에서 에러 메세지를 보내주고 그것을 담을 값, 초기에는 에러가 없으므로 Null
};

/* Thunk function */
// [GET - 특정 id에 해당하는 comment만 가져옴]
export const _getComments = createAsyncThunk(
  "getComments",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(
        `http://localhost:3001/comments?todoId=${payload}`
        // get_url + `?` + `todoId=${payload}`
      );
      return thunkAPI.fulfillWithValue(data.data); // 네트워크 요청이 성공하면 dispatch해주는 기능
    } catch (error) {
      return thunkAPI.rejectWithValue(error); //네트워크 요청이 실패한 경우 dispatch 해주는 기능
    }
  }
);
// [POST]
export const __addComments = createAsyncThunk(
  "ADD_COMMENTS",
  async (newComments, thunkAPI) => {
    try {
      const response = await axios.post(get_url, newComments);
      return thunkAPI.fulfillWithValue(response.data);
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
      console.log("댓글 delete", get_url + `/` + id);
      await axios.delete(get_url + `/` + id);
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
      const response = await axios.put(get_url + id, updateComment);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/* createSlice */
// 리듀서 로직이 실행되면서 이 객체가 하나의 action creator가 되기 때문에 reducers만 만들면 됨
export const commentsSlice = createSlice({
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
    [_getComments.pending]: (state, action) => {
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
    [_getComments.fulfilled]: (state, action) => {
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
    [_getComments.rejected]: (state, action) => {
      state.isLoding = false; // 에러가 발생, 네트워크 요청이 끝나서 false
      state.error = action.payload; //catch된 error 객체를 state.error에 넣어줌
    },
  },
});

/* export */
export const { checkEdit } = commentsSlice.actions;
export default commentsSlice.reducer;
