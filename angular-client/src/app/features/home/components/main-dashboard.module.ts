import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainDashboardPageComponent } from './main-dashboard-page/main-dashboard-page.component';
import { MainDashboardRoutingModule } from './main-dashboard-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
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
import { NoteReadComponent } from './note-read/note-read.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	declarations: [
		MainDashboardPageComponent,
		NoteComponent,
		CreateNoteModalComponent,
		DeleteNoteModalComponent,
		AboutUsComponent,
		ContactUsComponent,
		ProfileComponent,
		NoteReadComponent
	],
	imports: [
		CommonModule,
		MainDashboardRoutingModule,
		MatInputModule,
		MatIconModule,
		MatSelectModule,
		MatDialogModule,
		MatButtonModule,
		MatCardModule,
		ReactiveFormsModule,
		HttpClientModule
	]
})
export class MainDashboardModule {}
