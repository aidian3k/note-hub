import { Injectable } from '@angular/core';
import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
	HttpStatusCode
} from '@angular/common/http';
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { RefreshTokenResponse } from '../models/RefreshTokenResponse';

@Injectable({ providedIn: 'root' })
export class AuthorizationInterceptor implements HttpInterceptor {
	private isRefreshing: boolean = false;
	private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

	constructor(private router: Router, private authService: AuthService) {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		const key = this.isRefreshing
			? localStorage.getItem('refreshToken')
			: localStorage.getItem('accessToken');

		if (key) {
			request = this.addTokenToRequest(key, request);
		}

		return next.handle(request).pipe(
			catchError((error: any) => {
				if (error instanceof HttpErrorResponse && error.status === HttpStatusCode.Forbidden) {
					localStorage.removeItem('accessToken');

					return this.refreshUsersTokenIfPossible(request, next);
				}
				return throwError(error);
			})
		);
	}

	private refreshUsersTokenIfPossible(
		request: HttpRequest<unknown>,
		next: HttpHandler
	): Observable<HttpEvent<unknown>> {
		if (!this.isRefreshing) {
			this.isRefreshing = true;
			this.refreshTokenSubject.next(null);
			const refreshToken = localStorage.getItem('refreshToken');

			if (!refreshToken) {
				this.router.navigateByUrl('/login');
				return throwError('Refresh token does not exist');
			}

			return this.authService.makeCallWithRefreshToken(refreshToken).pipe(
				switchMap((data: RefreshTokenResponse) => {
					this.isRefreshing = false;
					this.refreshTokenSubject.next(data.accessToken);
					localStorage.setItem('accessToken', data.accessToken);
					localStorage.setItem('refreshToken', data.accessToken);

					return next.handle(this.addTokenToRequest(data.accessToken, request));
				})
			);
		}

		return this.refreshTokenSubject.pipe(
			filter(token => token != null),
			take(1),
			switchMap((authToken: string) => {
				return next.handle(this.addTokenToRequest(authToken, request));
			})
		);
	}

	private addTokenToRequest(token: string, request: HttpRequest<unknown>): HttpRequest<unknown> {
		return request.clone({
			setHeaders: {
				Authorization: `Bearer ${token}`
			}
		});
	}
}
