import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiGET } from '@features/dashboard/api/api';
import { toast } from 'react-toastify';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  category: {
    name: string;
    description: string;
  };
}

interface ServicesState {
  services: Service[];
  loading: boolean;
}

const initialState: ServicesState = {
  services: [],
  loading: false,
};

export const fetchServices = createAsyncThunk(
  'services/fetchServices',
  async (
    { limit }: { limit?: number },
    { rejectWithValue }
  ) => {
    const params: Record<string, string> = {};

    if (limit !== null && limit !== undefined) {
      params.limit = limit.toString();
    }

    const queryString = new URLSearchParams(params).toString();

    try {
      const response = await apiGET(
        `/api/services?${queryString}`
      );

      if (response.status === 200) {
        return response.data.services;
      } else {
        return rejectWithValue('Failed to fetch services');
      }
    } catch (error) {
      return rejectWithValue('Something went wrong while fetching services');
    }
  }
);

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    setServices(state, action: PayloadAction<Service[]>) {
      state.services = action.payload;
    },
    addServices(state, action: PayloadAction<Service>) {
      state.services.push(action.payload);
    },
    removeServices(state, action: PayloadAction<string>) {
      state.services = state.services.filter(
        (service) => service.id !== action.payload
      );
    },
    updateServices(state, action: PayloadAction<Service>) {
      const index = state.services.findIndex(
        (service) => service.id === action.payload.id
      );
      if (index !== -1) {
        state.services[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;

        toast.error(action.payload as string);
      });
  },
});

export const {
  setServices,
  addServices,
  removeServices,
  updateServices,
} = servicesSlice.actions;

export default servicesSlice.reducer;
