// src/features/budgetSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Budget {
  id: number;
  id_user: number;
  id_category: number;
  limit: number;
  created_date: Date;
}

interface BudgetsState {
  budgets: Budget[];
}

const initialState: BudgetsState = {
  budgets: [],
};

const budgetsSlice = createSlice({
  name: 'budgets',
  initialState,
  reducers: {
    addBudget: (state, action: PayloadAction<Budget>) => {
      state.budgets.push(action.payload);
    },
    removeBudget: (state, action: PayloadAction<number>) => {
      state.budgets = state.budgets.filter(
        (budget) => budget.id !== action.payload
      );
    },
    updateBudget: (state, action: PayloadAction<{id: number; newLimit: number}>) => {
      const {id, newLimit} = action.payload;
      const budget = state.budgets.find(b => b.id === id);
      if (budget) {
        budget.limit = newLimit;
      }
    },
    setBudgets: (state, action: PayloadAction<Budget[]>) => {
      state.budgets = action.payload;
    },
  },
});

export const { addBudget, removeBudget, updateBudget, setBudgets } = budgetsSlice.actions;
export default budgetsSlice.reducer;
