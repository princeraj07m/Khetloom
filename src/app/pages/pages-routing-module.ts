import { NgModule } from '@angular/core';
import { AuthGuard } from '../auth-guard';
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
import { Botcontrol } from './bot-control/bot-control';
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
    path: 'contact',
    component: Contact
  },
  {
    path: 'about',
    component: About
  },
  {
    path: 'fieldlayout',
    component: FieldLayoutComponent,
    canActivate: [AuthGuard]
  },
   {
    path: 'bot-control',
    component: Botcontrol,
     canActivate: [AuthGuard]
  },
  {
    path: 'field-demo',
    component: FieldLayoutDemoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user-profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'crop-cycles',
    component: CropCycleComponent,
    canActivate: [AuthGuard]
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
    component: Profile,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [AuthGuard]
  },
  {
    path: 'health',
    component: Health,
    canActivate: [AuthGuard]
  },
  {
    path: 'sprayer',
    component: Sprayer,
    canActivate: [AuthGuard]
  },
  {
    path: 'analytics',
    component: Analytics,
    canActivate: [AuthGuard]
  },
  {
    path: 'setting',
    component: Setting,
    canActivate: [AuthGuard]
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
    component: HistoryLogsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'financial-overview',
    component: FinancialOverviewComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
