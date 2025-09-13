import { Component, OnInit, OnDestroy } from '@angular/core';
import { BotService } from '../../services/bot.services';
import { BotStatus, FertilizerLog } from '../../models/bot.model';
import { interval, Subscription } from 'rxjs';
@Component({
  selector: 'app-bot-control',
  standalone: false,
  templateUrl: './bot-control.html',
  styleUrl: './bot-control.scss'
})
export class Botcontrol {
 botStatus: BotStatus = {
    x: 0,
    y: 0,
    battery: 100,
    isMoving: false,
    lastUpdate: new Date().toISOString()
  };

  logs: FertilizerLog[] = [];
  grid: any[][] = [];
  moveX: number = 0;
  moveY: number = 0;
  loading: boolean = false;
  error: string = '';
  success: string = '';

  private statusSubscription?: Subscription;
  private logsSubscription?: Subscription;

  constructor(private botService: BotService) {
    this.initializeGrid();
  }

  ngOnInit() {
    this.loadBotStatus();
    this.loadLogs();

    // Auto-refresh data every 2 seconds
    this.statusSubscription = interval(2000).subscribe(() => {
      this.loadBotStatus();
      this.loadLogs();
    });
  }

  ngOnDestroy() {
    if (this.statusSubscription) {
      this.statusSubscription.unsubscribe();
    }
    if (this.logsSubscription) {
      this.logsSubscription.unsubscribe();
    }
  }

  initializeGrid() {
    this.grid = [];
    for (let y = 0; y < 5; y++) {
      this.grid[y] = [];
      for (let x = 0; x < 5; x++) {
        this.grid[y][x] = {
          x: x,
          y: y,
          hasBot: false,
          hasFertilizer: false
        };
      }
    }
  }

  updateGrid() {
    // Reset grid
    this.initializeGrid();

    // Mark bot position
    if (this.botStatus) {
      this.grid[this.botStatus.y][this.botStatus.x].hasBot = true;
    }

    // Mark fertilizer positions
    this.logs.forEach(log => {
      if (log.x >= 0 && log.x < 5 && log.y >= 0 && log.y < 5) {
        this.grid[log.y][log.x].hasFertilizer = true;
      }
    });
  }

  loadBotStatus() {
    this.botService.getBotStatus().subscribe({
      next: (status) => {
        this.botStatus = status;
        this.updateGrid();
      },
      error: (error) => {
        console.error('Error loading bot status:', error);
        this.showError('Failed to load bot status');
      }
    });
  }

  loadLogs() {
    this.botService.getFertilizerLogs().subscribe({
      next: (logs) => {
        this.logs = logs;
        this.updateGrid();
      },
      error: (error) => {
        console.error('Error loading logs:', error);
      }
    });
  }

  onGridCellClick(cell: any) {
    this.moveX = cell.x;
    this.moveY = cell.y;
  }

  moveBot() {
    if (this.moveX < 0 || this.moveX > 4 || this.moveY < 0 || this.moveY > 4) {
      this.showError('Coordinates must be between 0 and 4');
      return;
    }

    this.loading = true;
    this.clearMessages();

    this.botService.moveBot(this.moveX, this.moveY).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.success) {
          this.showSuccess(`Move command sent to (${this.moveX}, ${this.moveY})`);
        } else {
          this.showError('Failed to send move command');
        }
      },
      error: (error) => {
        this.loading = false;
        console.error('Error moving bot:', error);
        this.showError('Failed to send move command');
      }
    });
  }

  dropFertilizer() {
    this.loading = true;
    this.clearMessages();

    this.botService.dropFertilizer().subscribe({
      next: (response) => {
        this.loading = false;
        if (response.success) {
          this.showSuccess('Drop fertilizer command sent');
        } else {
          this.showError('Failed to send drop command');
        }
      },
      error: (error) => {
        this.loading = false;
        console.error('Error dropping fertilizer:', error);
        this.showError('Failed to send drop command');
      }
    });
  }

  getBatteryClass(): string {
    if (this.botStatus.battery > 60) return 'battery-high';
    if (this.botStatus.battery > 20) return 'battery-medium';
    return 'battery-low';
  }

  formatTimestamp(timestamp: string): string {
    return new Date(timestamp).toLocaleString();
  }

  private showError(message: string) {
    this.error = message;
    setTimeout(() => this.clearMessages(), 5000);
  }

  private showSuccess(message: string) {
    this.success = message;
    setTimeout(() => this.clearMessages(), 3000);
  }

   clearMessages() {
    this.error = '';
    this.success = '';
  }
}
