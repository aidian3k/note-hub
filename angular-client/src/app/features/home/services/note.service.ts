import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreationNote } from '../models/CreationNote';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NoteService {
	constructor(private httpClient: HttpClient) {}

	public saveNewNote(newNote: CreationNote): Observable<CreationNote> {
		return this.httpClient.post<CreationNote>(environment.apiUrl + '/note', newNote);
	}
}
