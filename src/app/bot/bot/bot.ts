import { Component } from '@angular/core';

@Component({
  selector: 'app-bot',
  standalone: false,
  templateUrl: './bot.html',
  styleUrl: './bot.scss'
})
export class Bot {
 botStatus: any = { x: 0, y: 0, battery: 100, fertilizer_level: 100 };


  constructor() {
    this.updateBotStatus();
    setInterval(() => this.updateBotStatus(), 3000);
  }

  async updateBotStatus() {
    try {
      const response = await fetch('http://localhost:3001/api/status');
      this.botStatus = await response.json();
    } catch (error) {
      console.error('Failed to fetch bot status:', error);
    }
  }
}
