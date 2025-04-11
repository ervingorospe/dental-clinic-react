import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiGET } from '@features/dashboard/api/api';
import { toast } from 'react-toastify';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  active: boolean;
  phoneNumber: string;
  birthDate: Date;
  role: string;
}

interface UsersState {
  users: User[];
  loading: boolean,
}

const initialState: UsersState = {
  users: [],
  loading: false,
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (
    { role, limit }: { role: string; limit: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiGET(
        `/api/users?role=${role}&limit=${limit}`
      );

      if (response.status === 200) {
        return response.data.users;
      } else {
        return rejectWithValue('Failed to fetch users');
      }
    } catch (error) {
      return rejectWithValue('Something went wrong while fetching users');
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
    addUser(state, action: PayloadAction<User>) {
      state.users.push(action.payload);
    },
    removeUser(state, action: PayloadAction<number>) {
      state.users = state.users.filter(
        (user) => user.id !== action.payload
      );
    },
    updateUser(state, action: PayloadAction<User>) {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;

        toast.error(action.payload as string);
      });
  },
});

export const {
  setUsers,
  addUser,
  removeUser,
  updateUser,
} = usersSlice.actions;

export default usersSlice.reducer;
