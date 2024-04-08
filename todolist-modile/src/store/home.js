// sliceTbale.js

import { createSlice } from '@reduxjs/toolkit';

const moviesSlice = createSlice({
  name: 'home',
  // c初始化状态
  initialState: {
    res: [],
  },
  reducers: {
    deleteValue: (state, { payload }) => {
      state.res = state.res.filter((v) => v.id !== payload)
    },
    saveValue: (state, { payload }) => {
      state.res = [...state.res, payload]
    },
    editValue: (state, { payload }) => {
      state.res = state.res.map((v) => {
        return payload.id === v.id ? payload : v
      })
    },
    batcheDelete: (state, { payload }) => {
      state.res = state.res.filter((v) => {
        return !payload?.includes(v.id)
      })
    }
  },
});

export const { deleteValue, saveValue, editValue, batcheDelete } = moviesSlice.actions;
export default moviesSlice.reducer;