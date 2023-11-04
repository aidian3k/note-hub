import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoteService } from '../../services/note.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarConfig } from '../../../../shared/models/SnackBarConfig';

@Component({
	selector: 'app-delete-note-modal',
	templateUrl: './delete-note-modal.component.html'
})
export class DeleteNoteModalComponent {
	constructor(
		@Inject(MAT_DIALOG_DATA) public noteId: number,
		private noteService: NoteService,
		private snackBar: MatSnackBar,
		private dialogRef: MatDialogRef<DeleteNoteModalComponent>
	) {}
	deleteNote(): void {
		this.noteService.deleteNoteById(this.noteId).subscribe({
			next: () => {
				this.noteService.propagateMainPageChange();
				this.snackBar.open('Successfully deleted note!', 'Close', snackBarConfig);
				this.dialogRef.close();
			},
			error: err => {
				console.log(err);
				this.snackBar.open('There was a problem with deleting the note', 'Close', snackBarConfig);
			}
		});
	}
}
