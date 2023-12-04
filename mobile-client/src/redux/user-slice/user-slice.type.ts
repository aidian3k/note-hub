import { User } from '../../model/auth/User';

export type UserSliceState = {
	userDetails: User | null;
};

export const initialUserSliceState: UserSliceState = {
	userDetails: null
};
