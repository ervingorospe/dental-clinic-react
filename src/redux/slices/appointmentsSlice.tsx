import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiGET } from '@features/dashboard/api/api';
import { toast } from 'react-toastify';

interface Service {
  name: string;
  description: string;
  price: number;
  category: string;
}

interface User {
  firstName: string;
  lastName: string;
  role: string;
}

interface Appointment {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  status: string | null;
  notes: string | null;
  canceledAt: string;
  service: Service;
  patient: User;
  doctor: User;
}

interface AppointmentsState {
  appointments: Appointment[];
  loading: boolean;
}

const initialState: AppointmentsState = {
  appointments: [],
  loading: false,
};

export const fetchAppointments = createAsyncThunk(
  'appointments/fetchAppointments',
  async (
    { path = '/api/appointments', userId, status, limit }: { path?: string, userId?: number | string; status: string; limit: number },
    { rejectWithValue }
  ) => {
    try {
      const startDate = new Date().toISOString();
      const response = await apiGET(
        `${path}/${userId}?status=${status}&startDate=${startDate}&limit=${limit}`
      );

      if (response.status === 200) {
        return response.data.appointments;
      } else {
        return rejectWithValue('Failed to fetch appointments');
      }
    } catch (error) {
      return rejectWithValue('Something went wrong while fetching appointments');
    }
  }
);

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    setAppointments(state, action: PayloadAction<Appointment[]>) {
      state.appointments = action.payload;
    },
    addAppointment(state, action: PayloadAction<Appointment>) {
      state.appointments.push(action.payload);
    },
    removeAppointment(state, action: PayloadAction<string>) {
      state.appointments = state.appointments.filter(
        (appointment) => appointment.id !== action.payload
      );
    },
    updateAppointment(state, action: PayloadAction<Appointment>) {
      const index = state.appointments.findIndex(
        (appointment) => appointment.id === action.payload.id
      );
      if (index !== -1) {
        state.appointments[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.loading = false;

        toast.error(action.payload as string);
      });
  },
});

export const {
  setAppointments,
  addAppointment,
  removeAppointment,
  updateAppointment,
} = appointmentsSlice.actions;

export default appointmentsSlice.reducer;
