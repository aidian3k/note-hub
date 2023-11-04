import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
	selector: 'app-navbar-button',
	templateUrl: './navbar-button.component.html',
	styleUrls: ['./navbar-button.component.css'],
	imports: [MatButtonModule],
	standalone: true
})
export class NavbarButtonComponent implements OnInit {
	@Input() routeName: string;
	constructor() {}

	ngOnInit(): void {}
}
