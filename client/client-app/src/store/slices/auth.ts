// third-party
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DefaultRootStateProps } from './types';

// ----------------------------------------------------------------------

const initialState: DefaultRootStateProps['auth'] = {
  bearerToken: ''
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.bearerToken = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

export const { setToken } = slice.actions;
