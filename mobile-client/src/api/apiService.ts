import axios, { AxiosInstance } from 'axios';
import { store } from '../redux/store';
import { clearUserDetails, setUserDetails } from '../redux/user-slice/user.slice';

export const apiService: AxiosInstance = axios.create({
	baseURL: 'http://localhost:8080'
});

export const authenticationService: AxiosInstance = axios.create({
	baseURL: 'http://localhost:8080'
});

apiService.interceptors.request.use(
	config => {
		const accessToken: string | undefined = store.getState().user.userDetails?.access_token;

		if (!accessToken) {
			throw new Error('Error occured during the authorization with access token');
		}

		config.headers['Content-Type'] = 'application/json';
		config.headers['Authorization'] = `Bearer ${accessToken}`;

		return config;
	},
	error => {
		console.debug('Reject during the interceptor request with access_token', error);
		Promise.reject(error);
	}
);

apiService.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config;

		if (error.response && error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				const refreshToken = store.getState().user.userDetails?.refresh_token;

				if (!refreshToken) {
					return;
				}

				const response = await authenticationService.post('/api/refresh-token', null, {
					headers: {
						Authorization: `Bearer ${refreshToken}`
					}
				});

				if (!response.data) {
					throw new Error('Unable to refresh tokens!');
				}

				store.dispatch(setUserDetails(response.data));

				originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;

				return apiService(originalRequest);
			} catch (refreshError) {
				store.dispatch(clearUserDetails());
				return Promise.reject(refreshError);
			}
		}

		return Promise.reject(error);
	}
);
