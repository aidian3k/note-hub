import { Injectable } from '@angular/core';
import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest
} from '@angular/common/http';
import { noop, Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthorizationInterceptor implements HttpInterceptor {
	constructor(private router: Router, private authService: AuthService) {}
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const accessToken: string | null = localStorage.getItem('accessToken');
		const refreshToken: string | null = localStorage.getItem('refreshToken');

		if (accessToken) {
			request.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } });
		}

		return next.handle(request).pipe(
			tap({
				next: noop,
				error: (error: HttpErrorResponse) => {
					if (error.status === 401) {
						if (!!refreshToken) {
							this.handleRefreshTokenCall(refreshToken);
							return;
						}

						this.handleAuthenticationError();
					}
				}
			})
		);
	}

	private handleRefreshTokenCall(refreshToken: string): void {
		this.authService.makeCallWithRefreshToken(refreshToken).pipe(
			tap({
				next: response => {
					localStorage.setItem('accessToken', response.accessToken);
					localStorage.setItem('refreshToken', response.refreshToken);
				},
				error: error => {
					this.handleAuthenticationError();
					console.log(error);
				}
			})
		);
	}

	private handleAuthenticationError(): void {
		this.authService.cleanUpUser();
		this.router.navigateByUrl('/login');
	}
}
