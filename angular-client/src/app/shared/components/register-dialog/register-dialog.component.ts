import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
	selector: 'app-generic-dialog',
	templateUrl: './register-dialog.component.html',
	imports: [MatDialogModule, MatButtonModule],
	standalone: true
})
export class RegisterDialogComponent {
	constructor() {}
}
