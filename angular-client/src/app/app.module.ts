import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthModule } from './features/authentication/auth.module';
import { RouterOutlet } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthorizationInterceptor } from './features/authentication/helpers/authorization-interceptor';
import { MatDialogModule } from '@angular/material/dialog';
import { HomeModule } from './features/home/home.module';
import { AppRoutingModule } from './app-routing.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		AuthModule,
		HomeModule,
		BrowserAnimationsModule,
		HttpClientModule,
		RouterOutlet,
		MatDialogModule,
		MatButtonModule
	],
	bootstrap: [AppComponent],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthorizationInterceptor,
			multi: true
		}
	]
})
export class AppModule {}
