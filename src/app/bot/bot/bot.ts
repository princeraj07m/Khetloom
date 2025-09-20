import { Component } from '@angular/core';
import { BotService, Analytic, Plant, LogEntry } from '../../services/bot.services';
import { BotStatus } from '../../services/bot.services';

@Component({
  selector: 'app-bot',
  standalone: false,
  templateUrl: './bot.html',
  styleUrl: './bot.scss'
})
export class Bot {
 botStatus: any = { x: 0, y: 0, battery: 100, fertilizer_level: 100 };
 currentTime = new Date();

  constructor() {
    this.updateBotStatus();
    // setInterval(() => this.updateBotStatus(), 3000);
    // setInterval(() => this.currentTime = new Date(), 1000);
  }

  async updateBotStatus() {
    try {
      const response = await fetch('http://13.60.157.181:4000/api/bot/status');
      this.botStatus = await response.json();
    } catch (error) {
      console.error('Failed to fetch bot status:', error);
    }
  }
}
