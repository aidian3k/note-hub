import { Injectable } from '@angular/core';
import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest
} from '@angular/common/http';
import { catchError, Observable, switchMap, take, tap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthorizationInterceptor implements HttpInterceptor {
	constructor(private router: Router, private authService: AuthService) {}
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const accessToken: string | null = localStorage.getItem('accessToken');

		if (accessToken) {
			request = request.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } });
		}

		return next.handle(request).pipe(
			catchError(error => {
				if (error instanceof HttpErrorResponse && error.status === 401) {
					return this.handleRefreshTokenCall(error, request, next);
				} else {
					this.handleAuthenticationError();
					return throwError(error);
				}
			})
		);
	}

	private handleRefreshTokenCall(err: any, request: HttpRequest<any>, next: HttpHandler) {
		const refreshToken = localStorage.getItem('refreshToken');

		if (!refreshToken) {
			this.handleAuthenticationError();
			return throwError(err);
		}

		return this.authService.makeCallWithRefreshToken(refreshToken).pipe(
			tap({
				next: response => {
					localStorage.setItem('accessToken', response.accessToken);
					localStorage.setItem('refreshToken', response.refreshToken);
				},
				error: error => {
					this.handleAuthenticationError();
					console.log(error);
				}
			}),
			take(1),
			switchMap(response => {
				request = request.clone({
					setHeaders: { Authorization: `Bearer ${response.accessToken}` }
				});

				return next.handle(request);
			})
		);
	}

	private handleAuthenticationError(): void {
		this.authService.cleanUpUser();
		this.router.navigateByUrl('/login');
	}
}
