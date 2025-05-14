// src/features/transactionsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Wallet {
  id: number;
  id_user: number;
  title: string;
  value: number;
  created_at: Date;
  id_banking_institution: number;
}

interface WalletState {
  wallets: Wallet[];
}

const initialState: WalletState = {
    wallets: [],
};

const walletSlice = createSlice({
  name: 'wallets',
  initialState,
  reducers: {
    addWallet: (state, action: PayloadAction<Wallet>) => {
      state.wallets.push(action.payload);
    },
    removeWallet: (state, action: PayloadAction<number>) => {
      state.wallets = state.wallets.filter(
        (wallet) => wallet.id !== action.payload
      );
    },
    updateWallet: (state, action: PayloadAction<{id: number, value: number}>) => {
      state.wallets = state.wallets.map(
        (wallet) => {
          if (wallet.id === action.payload.id) {
            return {
              ...wallet,
              value: action.payload.value
            }
          }
          return wallet;
        }
      );
    },
    setWallets: (state, action: PayloadAction<Wallet[]>) => {
      state.wallets = action.payload;
    },
  },
});

export const { addWallet, removeWallet, setWallets, updateWallet } = walletSlice.actions;
export default walletSlice.reducer;
