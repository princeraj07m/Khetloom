import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PagesRoutingModule } from './pages-routing-module';
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
import { SharedModule } from '../shared/shared-module';
import { FieldLayoutComponent } from './field-layout.component/field-layout.component';
import { FieldLayoutDemoComponent } from './field-layout-demo/field-layout-demo';
import { UserProfileComponent } from './user-profile/user-profile';
import { NotificationsComponent } from './notifications/notifications';
import { CropCycleComponent } from './crop-cycle/crop-cycle';
import { Weather } from './weather/weather';
import { GoogleMap } from './google-map/google-map';
import { Botcontrol } from './bot-control/bot-control';

@NgModule({
  declarations: [
    Home,
    Dashboard,
    Health,
    Sprayer,
    Analytics,
    Setting,
    Users,
    Profile,
    Features,
    Contact,
    About,
    FieldLayoutComponent,
    FieldLayoutDemoComponent,
    UserProfileComponent,
    NotificationsComponent,
    CropCycleComponent,
    Weather,
    GoogleMap,
    Botcontrol,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    SharedModule
  ]
})
export class PagesModule { }
