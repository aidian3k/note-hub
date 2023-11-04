import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Note } from '../../models/Note';

@Component({
	selector: 'app-note-read',
	templateUrl: './note-read.component.html'
})
export class NoteReadComponent implements OnInit {
	constructor(@Inject(MAT_DIALOG_DATA) public data: Note) {}

	ngOnInit(): void {}
}
