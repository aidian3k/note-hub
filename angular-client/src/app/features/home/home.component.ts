import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateNoteModalComponent } from './components/main-dashboard/create-note-modal/create-note-modal.component';
import { AuthService } from '../authentication/services/auth.service';
import { Router } from '@angular/router';
import { AboutUsComponent } from './components/main-dashboard/about-us/about-us.component';
import { ContactUsComponent } from './components/main-dashboard/contact-us/contact-us.component';
import { ProfileComponent } from './components/main-dashboard/profile/profile.component';

@Component({
	selector: 'app-home',
	templateUrl: 'home.component.html'
})
export class HomeComponent {
	constructor(public dialog: MatDialog, private authService: AuthService, private router: Router) {}

	handleCreateNewNote(): void {
		this.dialog.open(CreateNoteModalComponent, { width: '800px', height: '500px' });
	}

	handleAboutUs(): void {
		this.dialog.open(AboutUsComponent);
	}

	handleProfileView(): void {
		this.dialog.open(ProfileComponent);
	}

	handleContactUs(): void {
		this.dialog.open(ContactUsComponent);
	}

	logoutUser(): void {
		this.authService.logoutUser().subscribe({
			next: () => {
				localStorage.removeItem('accessToken');
				localStorage.removeItem('refreshToken');
				this.router.navigate(['/login']);
			},
			error: err => {
				console.log(err);
			}
		});
	}
}
