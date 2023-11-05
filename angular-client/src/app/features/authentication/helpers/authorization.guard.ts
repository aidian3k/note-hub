import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
	UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthorizationGuard implements CanActivate {
	constructor(private router: Router) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		const isAuthenticated: boolean = this.isUserAuthenticated();

		if (!isAuthenticated) {
			this.router.navigate(['/login']);
		}

		return isAuthenticated;
	}

	private isUserAuthenticated(): boolean {
		const accessToken = localStorage.getItem('accessToken');

		return !!accessToken;
	}
}
