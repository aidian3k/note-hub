import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../authentication/services/auth.service';
import { ProfileInfo } from '../../models/ProfileInfo';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
	profile?: ProfileInfo;
	constructor(private authService: AuthService) {}

	ngOnInit(): void {
		this.authService.getUserProfileInformation().subscribe({
			next: profile => {
				this.profile = profile;
			}
		});
	}
}
