import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthModule } from './features/authentication/auth.module';
import { RouterOutlet } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthorizationInterceptor } from './features/authentication/helpers/authorization-interceptor';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AuthModule,
		BrowserAnimationsModule,
		HttpClientModule,
		RouterOutlet,
		MatDialogModule
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
