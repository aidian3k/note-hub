import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Note } from '../../models/Note';
import { NoteUpdateComponent } from '../note-update/note-update.component';

@Component({
	selector: 'app-note-read',
	templateUrl: './note-read.component.html'
})
export class NoteReadComponent implements OnInit {
	constructor(@Inject(MAT_DIALOG_DATA) public note: Note, private dialog: MatDialog) {}

	ngOnInit(): void {}
	openEditDialog() {
		this.dialog.open(NoteUpdateComponent, { data: this.note, width: '800px', height: '500px' });
	}
}
