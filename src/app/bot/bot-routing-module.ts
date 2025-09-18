import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Bot } from './bot/bot';
import { FieldOverview } from './field-overview/field-overview';
import { BotControl } from './bot-control/bot-control';
import { PlantDetails } from './plant-details/plant-details';
import { Analytics } from './analytics/analytics';
import { Logs } from './logs/logs';
import { Settings } from './settings/settings';

const routes: Routes = [
  {
    path: '',
    component: Bot,
    children: [
      { path: '', component: Dashboard },
      { path: 'field', component: FieldOverview },
      { path: 'bot-control', component: BotControl },
      { path: 'plants', component: PlantDetails },
      { path: 'analytics', component: Analytics },
      { path: 'logs', component: Logs },
      { path: 'settings', component: Settings },
      { path: '**', redirectTo: '' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BotRoutingModule { }
