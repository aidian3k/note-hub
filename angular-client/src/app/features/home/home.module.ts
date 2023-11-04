import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NavbarButtonComponent } from '../../shared/components/navbar-button/navbar-button.component';

@NgModule({
	declarations: [HomeComponent],
	imports: [CommonModule, HomeRoutingModule, MatIconModule, MatButtonModule, NavbarButtonComponent]
})
export class HomeModule {}
