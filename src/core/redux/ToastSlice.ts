import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ToastStyle } from '../../components/Toast';

export interface IToastState {
  message: string;
  dismissible: boolean;
  visible: boolean;
  alertStyle: ToastStyle;
  duration: number;
}

const initialState: IToastState = {
  alertStyle: 'info',
  dismissible: true,
  message: '[None]',
  visible: false,
  duration: 0,
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    show: (state, action: PayloadAction<Partial<IToastState>>) => ({ ...state, ...action.payload, visible: true }),
    dismiss: state => {
      state.visible = false;
    },
  },
});

export const { show: showToast, dismiss: dismissToast } = toastSlice.actions;
export default toastSlice.reducer;
