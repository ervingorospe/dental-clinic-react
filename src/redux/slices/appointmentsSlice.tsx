import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiGET } from '@features/dashboard/api/api';
import { toast } from 'react-toastify';
import { Appointment } from '@features/dashboard/interaces';
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
    { path = '/api/appointments/list', userId, status, limit, startDate }: { path?: string, userId?: number | string; status?: string; limit?: number, startDate?: string },
    { rejectWithValue }
  ) => {
    const params: Record<string, string> = {};

    if (startDate !== null && startDate !== undefined) {
      params.startDate = startDate
    }

    if (limit !== null && limit !== undefined) {
      params.limit = limit.toString();
    }

    if (status !== null && status !== undefined) {
      params.status = status;
    }

    const queryString = new URLSearchParams(params).toString();

    try {
      const response = await apiGET(
        `${path}/${userId}?${queryString}`
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
