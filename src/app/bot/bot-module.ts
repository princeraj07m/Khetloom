import { NgModule } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';

import { BotRoutingModule } from './bot-routing-module';
import { Dashboard } from './dashboard/dashboard';
import { Bot } from './bot/bot';
import { FieldOverview } from './field-overview/field-overview';
import { BotControl } from './bot-control/bot-control';
import { PlantDetails } from './plant-details/plant-details';
import { Analytics } from './analytics/analytics';
import { Logs } from './logs/logs';
import { Settings } from './settings/settings';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    Dashboard,
    Bot,
    FieldOverview,
    BotControl,
    PlantDetails,
    Analytics,
    Logs,
    Settings,
  ],
  imports: [
    CommonModule,
    BotRoutingModule,
    FormsModule
  ]
})
export class BotModule { }
