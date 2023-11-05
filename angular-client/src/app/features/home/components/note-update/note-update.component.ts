import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoteService } from '../../services/note.service';
import { Note } from '../../models/Note';
import { snackBarConfig } from '../../../../shared/models/SnackBarConfig';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-note-update',
	templateUrl: './note-update.component.html',
	styleUrls: ['./note-update.component.css']
})
export class NoteUpdateComponent implements OnInit {
	formGroup: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
		private noteService: NoteService,
		private dialogRef: MatDialogRef<NoteUpdateComponent>,
		private snackbar: MatSnackBar,
		@Inject(MAT_DIALOG_DATA) private note: Note
	) {}

	ngOnInit(): void {
		this.initializeFormGroup(this.note);
	}

	private initializeFormGroup(note: Note): void {
		this.formGroup = this.formBuilder.group({
			title: [note.title, [Validators.required, Validators.maxLength(255)]],
			content: [note.content, [Validators.required]]
		});
	}

	updateNote(): void {
		const updatedNote: Note = {
			id: this.note.id,
			title: this.formGroup.get('title')?.value,
			content: this.formGroup.get('content')?.value
		};

		this.noteService.updateNote(updatedNote).subscribe({
			next: () => {
				this.noteService.propagateMainPageChange();
				this.dialogRef.close();
				this.snackbar.open('Successfully updated note!', 'Close', snackBarConfig);
			},
			error: error => {
				console.log(error);
				this.snackbar.open(
					'There was an error while creating the note! Try again',
					'Close',
					snackBarConfig
				);
			}
		});
	}
}
