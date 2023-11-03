import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CreationUserRequest } from '../../models/CreationUserRequest';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RegisterDialogComponent } from '../../../../shared/components/register-dialog/register-dialog.component';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegistrationEventService } from '../../services/registration-event.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
	formGroup: FormGroup;
	constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService,
		public dialog: MatDialog,
		private router: Router,
		private registrationEventService: RegistrationEventService
	) {}

	ngOnInit(): void {
		this.initializeRegisterFormGroup();
	}

	private initializeRegisterFormGroup(): void {
		this.formGroup = this.formBuilder.group(
			{
				email: [
					null,
					[
						Validators.required,
						Validators.maxLength(255),
						Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')
					]
				],
				password: [null, [Validators.required, Validators.maxLength(255)]],
				confirmationPassword: [null, [Validators.required, Validators.maxLength(255)]],
				firstName: [null, [Validators.required, Validators.maxLength(255)]],
				lastName: [null, [Validators.required, Validators.maxLength(255)]],
				birthdayDate: [null, [Validators.required]]
			},
			{ validators: confirmationPasswordValidator }
		);
	}

	registerUser(): void {
		const user: CreationUserRequest = {
			email: this.formGroup.get('email')?.value,
			password: this.formGroup.get('password')?.value,
			confirmationPassword: this.formGroup.get('confirmationPassword')?.value,
			firstName: this.formGroup.get('firstName')?.value,
			lastName: this.formGroup.get('lastName')?.value,
			birthdayDate: this.formGroup.get('birthdayDate')?.value
		};
		console.log(user);

		this.authService.registerUser(user).subscribe({
			next: () => {
				this.registrationEventService.propagateRegistrationChange();
				this.router.navigate(['/login']);
			},
			error: error => {
				const dialogReference: MatDialogRef<RegisterDialogComponent> = this.dialog.open(
					RegisterDialogComponent,
					{ height: '400', width: '400px' }
				);

				dialogReference.afterClosed().subscribe({
					next: () => {
						this.formGroup.reset();
					}
				});
			}
		});
	}
}

export function confirmationPasswordValidator(formGroup: FormGroup) {
	const password: string = formGroup.get('password')?.value;
	const confirmationPassword = formGroup.get('confirmationPassword')?.value;

	return password !== confirmationPassword ? { confirmationPassword: true } : null;
}
