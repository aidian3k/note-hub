import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthService } from './services/auth.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
	declarations: [LoginComponent, RegisterComponent],
	imports: [
		CommonModule,
		MatIconModule,
		MatInputModule,
		ReactiveFormsModule,
		MatButtonModule,
		AuthRoutingModule,
		MatFormFieldModule,
		MatInputModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatSnackBarModule
	],
	providers: [AuthService]
})
export class AuthModule {}
