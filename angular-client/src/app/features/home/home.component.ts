import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateNoteModalComponent } from './components/main-dashboard/create-note-modal/create-note-modal.component';
import { AuthService } from '../authentication/services/auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-home',
	templateUrl: 'home.component.html'
})
export class HomeComponent {
	constructor(public dialog: MatDialog, private authService: AuthService, private router: Router) {}

	handleCreateNewNote(): void {
		this.dialog.open(CreateNoteModalComponent, { width: '800px', height: '500px' });
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
