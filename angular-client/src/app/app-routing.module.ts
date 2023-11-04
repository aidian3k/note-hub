import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
	{
		path: '',
		loadChildren: () =>
			import('./features/authentication/auth-routing.module').then(m => m.AuthRoutingModule)
	},
	{
		path: 'main',
		loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
