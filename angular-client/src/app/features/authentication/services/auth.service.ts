import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/User';
import { LoginRequest } from '../models/LoginRequest';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { RefreshTokenResponse } from '../models/RefreshTokenResponse';
import { CreationUserRequest } from '../models/CreationUserRequest';
import { UserLoginResponse } from '../models/UserLoginResponse';
import { ProfileInfo } from '../../home/models/ProfileInfo';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	constructor(private httpClient: HttpClient) {}

	private currentUser$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
	private readonly currentUserObservable$ = this.currentUser$.asObservable();

	public loginUser(loginRequest: LoginRequest): Observable<UserLoginResponse> {
		return this.httpClient.post<any>(environment.apiUrl + '/auth/login', loginRequest);
	}

	public logoutUser(): Observable<any> {
		return this.httpClient.post<void>(environment.apiUrl + '/auth/logout', {});
	}

	public registerUser(registrationRequest: CreationUserRequest): Observable<number> {
		return this.httpClient.post<number>(environment.apiUrl + '/auth/register', registrationRequest);
	}

	public getUserProfileInformation(): Observable<ProfileInfo> {
		return this.httpClient.get<ProfileInfo>(environment.apiUrl + '/profile');
	}

	public cleanUpUser(): void {
		this.currentUser$.next(null);
	}

	public getCurrentUserValue(): User | null {
		return this.currentUser$.value;
	}

	public getCurrentUserObservable(): Observable<User | null> {
		return this.currentUserObservable$;
	}

	public getCurrentUserSubject(): BehaviorSubject<User | null> {
		return this.currentUser$;
	}

	public makeCallWithRefreshToken(refreshToken: string): Observable<RefreshTokenResponse> {
		return this.httpClient.post<RefreshTokenResponse>(environment.apiUrl + '/auth/refresh-token', {
			refreshToken: refreshToken
		});
	}
}
