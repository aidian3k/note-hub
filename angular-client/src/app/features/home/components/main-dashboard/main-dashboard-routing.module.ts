import { RouterModule, Routes } from '@angular/router';
import { MainDashboardPageComponent } from './main-dashboard-page/main-dashboard-page.component';
import { NgModule } from '@angular/core';
import { AuthorizationGuard } from '../../../authentication/helpers/authorization.guard';

const routes: Routes = [
	{ path: '', component: MainDashboardPageComponent, canActivate: [AuthorizationGuard] }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MainDashboardRoutingModule {}
