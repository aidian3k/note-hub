import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RegistrationEventService {
	private registrationSubject$: Subject<void> = new Subject<void>();

	public propagateRegistrationChange(): void {
		this.registrationSubject$.next();
	}

	public get registrationObservable(): Observable<void> {
		return this.registrationSubject$.asObservable();
	}
}
