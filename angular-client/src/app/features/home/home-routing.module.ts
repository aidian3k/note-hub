import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AuthorizationGuard } from '../authentication/helpers/authorization.guard';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		children: [
			{
				path: '',
				loadChildren: () =>
					import('./components/main-dashboard.module').then(m => m.MainDashboardModule)
			}
		],
		canActivate: [AuthorizationGuard]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class HomeRoutingModule {}
