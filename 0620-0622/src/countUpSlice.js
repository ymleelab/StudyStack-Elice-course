import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const setAsync = createAsyncThunk("countUp/fetchInitial", async () => {
  const resp = await fetch("http://localhost:3333/countUp");
  const result = await resp.json();
  return result.value;
});

const upAsync = createAsyncThunk("countUp/fetchUp", async (step) => {
  let resp = await fetch("http://localhost:3333/countUp");
  let result = await resp.json();
  resp = await fetch("http://localhost:3333/countUp", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ value: result.value + step }),
  });
  result = await resp.json();
  return result.value;
});
const slice = createSlice({
  name: "countUp",
  initialState: {
    value: 0,
  },
  reducers: {
    up: (state, action) => {
      state.value = state.value + action.payload;
    },
    set: (state, action) => {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setAsync.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(upAsync.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});
export default slice;
export { setAsync, upAsync };
