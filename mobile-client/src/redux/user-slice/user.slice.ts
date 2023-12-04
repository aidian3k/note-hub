import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialUserSliceState } from './user-slice.type';
import { User } from '../../model/auth/User';

export const userSlice = createSlice({
	name: 'user',
	initialState: initialUserSliceState,
	reducers: {
		setUserDetails(state, action: PayloadAction<User>) {
			state.userDetails = action.payload;
		},
		clearUserDetails: state => {
			state.userDetails = null;
		}
	}
});

export const { setUserDetails, clearUserDetails } = userSlice.actions;

export default userSlice.reducer;
