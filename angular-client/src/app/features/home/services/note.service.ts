import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreationNote } from '../models/CreationNote';
import { environment } from '../../../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { Note } from '../models/Note';

@Injectable({ providedIn: 'root' })
export class NoteService {
	private mainPageChangeSubject$: Subject<void> = new Subject<void>();
	constructor(private httpClient: HttpClient) {}

	public saveNewNote(newNote: CreationNote): Observable<CreationNote> {
		return this.httpClient.post<CreationNote>(environment.apiUrl + '/note', newNote);
	}

	public getAllUserNotes(): Observable<Note[]> {
		return this.httpClient.get<Note[]>(environment.apiUrl + '/note');
	}

	public deleteNoteById(noteId: number): Observable<void> {
		return this.httpClient.delete<void>(environment.apiUrl + '/note/' + noteId);
	}

	public getNotesBySearchKeyWord(searchWord: string): Observable<Note[]> {
		return this.httpClient.get<Note[]>(environment.apiUrl + '/note/search-word', {
			params: { searchWord: searchWord }
		});
	}

	public propagateMainPageChange(): void {
		this.mainPageChangeSubject$.next();
	}

	public get notesChangeObservable(): Observable<void> {
		return this.mainPageChangeSubject$.asObservable();
	}
}
