import { Component, Input } from '@angular/core';
import {
	FormGroup,
	ReactiveFormsModule,
	UntypedFormControl,
	ValidationErrors
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgForOf, NgIf } from '@angular/common';

@Component({
	selector: 'app-form-field',
	templateUrl: './form-field.component.html',
	imports: [MatInputModule, ReactiveFormsModule, NgIf, NgForOf],
	standalone: true
})
export class FormFieldComponent {
	@Input() formGroup!: FormGroup;
	@Input() nameOfField!: string;
	@Input() placeHolder?: string;

	private readonly errorsMap: Map<string, string> = new Map()
		.set('required', 'You must enter a value')
		.set('maxLength', 'You exceeded maxLength of input');

	constructor() {}

	get errorDictionary(): Map<string, string> {
		return this.errorsMap;
	}

	get errorKeys(): string[] {
		const controlErrors = this.formGroup.get(this.nameOfField)?.errors;

		if (controlErrors) {
			return Object.keys(controlErrors);
		}

		return [];
	}
}
