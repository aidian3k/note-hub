import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationEventService } from '../../services/registration-event.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { UserLoginResponse } from '../../models/UserLoginResponse';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
	formGroup: FormGroup;
	shouldDisplayLoginError = false;

	constructor(
		private authService: AuthService,
		private router: Router,
		private formBuilder: FormBuilder,
		private registrationEventService: RegistrationEventService,
		private snackBar: MatSnackBar
	) {}

	ngOnInit(): void {
		this.initializeLoginFormGroup();
		this.authService.getCurrentUserObservable().subscribe(loggedUser => {
			if (loggedUser) {
				this.router.navigateByUrl('/');
			}
		});
		this.registrationEventService.registrationObservable.subscribe({
			next: () => {
				this.snackBar.open('Successfully registered - Sign in!', 'Close', {
					verticalPosition: 'bottom',
					horizontalPosition: 'center',
					duration: 5000
				});
			}
		});
	}

	private initializeLoginFormGroup(): void {
		this.formGroup = this.formBuilder.group({
			username: [null, [Validators.required, Validators.maxLength(255)]],
			password: [null, [Validators.required, Validators.maxLength(255)]]
		});
	}

	loginUser(): void {
		this.authService
			.loginUser({
				username: this.formGroup.get('username')?.value,
				password: this.formGroup.get('password')?.value
			})
			.subscribe({
				next: (response: UserLoginResponse) => {
					localStorage.setItem('accessToken', response.access_token);
					localStorage.setItem('refreshToken', response.refresh_token);
				},
				error: (error: HttpErrorResponse) => {
					if (error.status === HttpStatusCode.Unauthorized) {
						this.snackBar.open('Credentials are not correct!', 'Close', {
							verticalPosition: 'bottom',
							horizontalPosition: 'center',
							panelClass: ['snack-bar-warning'],
							duration: 3000
						});
					}
				}
			});
	}
}
