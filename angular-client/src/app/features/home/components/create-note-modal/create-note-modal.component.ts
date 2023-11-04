import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreationNote } from '../../models/CreationNote';
import { NoteService } from '../../services/note.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarConfig } from '../../../../shared/models/SnackBarConfig';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-create-note-modal',
	templateUrl: './create-note-modal.component.html'
})
export class CreateNoteModalComponent implements OnInit {
	formGroup: FormGroup;
	constructor(
		private noteService: NoteService,
		private snackbar: MatSnackBar,
		private formBuilder: FormBuilder,
		private dialogRef: MatDialogRef<CreateNoteModalComponent>
	) {}

	ngOnInit(): void {
		this.initializeFormGroup();
	}

	saveNewNote(): void {
		const creationNote: CreationNote = {
			title: this.formGroup.get('title')?.value,
			content: this.formGroup.get('content')?.value
		};

		this.noteService.saveNewNote(creationNote).subscribe({
			next: () => {
				this.dialogRef.close();
				this.snackbar.open('Successfully created new note!', 'Close', snackBarConfig);
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

	private initializeFormGroup(): void {
		this.formGroup = this.formBuilder.group({
			title: [null, [Validators.required, Validators.maxLength(255)]],
			content: [null, [Validators.required]]
		});
	}
}
