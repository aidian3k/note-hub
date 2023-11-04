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

@NgModule({
	declarations: [
		MainDashboardPageComponent,
		SearchComponentComponent,
		SelectTagComponent,
		NoteComponent
	],
	imports: [
		CommonModule,
		MainDashboardRoutingModule,
		MatInputModule,
		MatIconModule,
		MatSelectModule
	]
})
export class MainDashboardModule {}
