import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { Dashboard } from './dashboard/dashboard';
import { Health } from './health/health';
import { Sprayer } from './sprayer/sprayer';
import { Analytics } from './analytics/analytics';
import { Setting } from './setting/setting';
import { Users } from './users/users';
import { Profile } from './profile/profile';
import { Features } from './features/features';
import { Contact } from './contact/contact';
import { About } from './about/about';
import { FieldLayoutComponent } from '../pages/field-layout.component/field-layout.component';
import { FieldLayoutDemoComponent } from '../pages/field-layout-demo/field-layout-demo';
import { UserProfileComponent } from '../pages/user-profile/user-profile';
import { NotificationsComponent } from '../pages/notifications/notifications';
import { CropCycleComponent } from '../pages/crop-cycle/crop-cycle';
import { Weather } from '../pages/weather/weather';
import { HistoryLogsComponent } from '../pages/history-logs/history-logs';
import { FinancialOverviewComponent } from '../pages/financial-overview/financial-overview';
const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'features',
    component: Features
  },
  {
    path: 'fieldlayout',
    component: FieldLayoutComponent
  },
  {
    path: 'field-demo',
    component: FieldLayoutDemoComponent
  },
  {
    path: 'user-profile',
    component: UserProfileComponent
  },
  {
    path: 'notifications',
    component: NotificationsComponent
  },
  {
    path: 'crop-cycles',
    component: CropCycleComponent
  },
  {
    path: 'contact',
    component: Contact
  },
  {
    path: 'about',
    component: About
  },
  {
    path: 'profile',
    component: Profile
  },
  {
    path: 'dashboard',
    component: Dashboard
  },
  {
    path: 'health',
    component: Health
  },
  {
    path: 'sprayer',
    component: Sprayer
  },
  {
    path: 'analytics',
    component: Analytics
  },
  {
    path: 'setting',
    component: Setting
  },
  {
    path: 'users',
    component: Users
  },
  {
    path: 'weather',
    component: Weather
  },
  {
    path: 'history-logs',
    component: HistoryLogsComponent
  },
  {
    path: 'financial-overview',
    component: FinancialOverviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
