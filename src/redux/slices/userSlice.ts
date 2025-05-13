import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: number | null;
  name: string | null;
  email: string | null;
  password: string | null;
  created_at: Date | null;
  receita?: number | null;
  despesa?: number | null;
}

const initialState: UserState = {
  id: null,
  name: null,
  email: null,
  password: null,
  created_at: null,
  receita: null,
  despesa: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.created_at = action.payload.created_at;
    },
    setValues: (state, action: PayloadAction<{receita?: number, despesa?: number}>) => {
      if (action.payload.receita) {
        state.receita = action.payload.receita;
      }

      if (action.payload.despesa) {
        state.despesa = action.payload.despesa;
      }
    },
    logout: (state) => {
      state.id = null;
      state.name = null;
      state.email = null;
      state.password = null;
      state.created_at = null;
    },
  },
});

export const { setUser, logout, setValues } = userSlice.actions;
export default userSlice.reducer;
