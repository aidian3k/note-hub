import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteNoteModalComponent } from '../delete-note-modal/delete-note-modal.component';
import { NoteReadComponent } from '../note-read/note-read.component';
import { Note } from '../../models/Note';

@Component({
	selector: 'app-note',
	templateUrl: './note.component.html'
})
export class NoteComponent implements OnInit {
	@Input() note: Note;
	constructor(private dialog: MatDialog) {}

	ngOnInit(): void {}

	openDeleteDialog() {
		this.dialog.open(DeleteNoteModalComponent, { data: this.note.id });
	}

	openNoteReadDialog() {
		this.dialog.open(NoteReadComponent, { width: '600px', data: this.note });
	}
}
