import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { Note } from '../../models/Note';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-main-dashboard-page',
	templateUrl: './main-dashboard-page.component.html'
})
export class MainDashboardPageComponent implements OnInit {
	userNotes$: Observable<Note[]>;
	constructor(private noteService: NoteService) {}

	ngOnInit(): void {
		this.noteService.notesChangeObservable.subscribe({
			next: () => {
				this.userNotes$ = this.noteService.getAllUserNotes();
			}
		});

		this.userNotes$ = this.noteService.getAllUserNotes();
	}

	handleSearchWordChange(event: any): void {
		this.userNotes$ = this.noteService.getNotesBySearchKeyWord(event.target.value);
	}
}
