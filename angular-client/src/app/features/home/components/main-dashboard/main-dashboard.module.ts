import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainDashboardPageComponent } from './main-dashboard-page/main-dashboard-page.component';
import { SearchComponentComponent } from './search-component/search-component.component';
import { MainDashboardRoutingModule } from './main-dashboard-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { SelectTagComponent } from './select-tag/select-tag.component';
import { MatSelectModule } from '@angular/material/select';
import { NoteComponent } from './note/note.component';
import { CreateNoteModalComponent } from './create-note-modal/create-note-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DeleteNoteModalComponent } from './delete-note-modal/delete-note-modal.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { MatCardModule } from '@angular/material/card';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
	declarations: [
		MainDashboardPageComponent,
		SearchComponentComponent,
		SelectTagComponent,
		NoteComponent,
		CreateNoteModalComponent,
		DeleteNoteModalComponent,
		AboutUsComponent,
		ContactUsComponent,
		ProfileComponent
	],
	imports: [
		CommonModule,
		MainDashboardRoutingModule,
		MatInputModule,
		MatIconModule,
		MatSelectModule,
		MatDialogModule,
		MatButtonModule,
		MatCardModule
	]
})
export class MainDashboardModule {}
