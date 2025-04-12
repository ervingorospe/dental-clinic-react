import { configureStore } from '@reduxjs/toolkit';
import appointmentsReducer from './slices/appointmentsSlice';
import usersReducer from './slices/usersSlice';
import servicesReducer from './slices/servicesSlice'

export const store = configureStore({
  reducer: {
    appointments: appointmentsReducer,
    users: usersReducer,
    services: servicesReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
