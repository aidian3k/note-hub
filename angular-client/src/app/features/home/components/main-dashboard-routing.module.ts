import { RouterModule, Routes } from '@angular/router';
import { MainDashboardPageComponent } from './main-dashboard-page/main-dashboard-page.component';
import { NgModule } from '@angular/core';

const routes: Routes = [{ path: '', component: MainDashboardPageComponent }];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MainDashboardRoutingModule {}
