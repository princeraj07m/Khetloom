import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BotStatus, FertilizerLog, ApiResponse, Command } from '../models/bot.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BotService {
private baseUrl = environment.backendUrl;


  constructor(private http: HttpClient) { }

  // Send move command
  moveBot(x: number, y: number): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/move`, { x, y });
  }

  // Send drop fertilizer command
  dropFertilizer(): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/drop`, {});
  }

  // Get bot status
  getBotStatus(): Observable<BotStatus> {
    return this.http.get<BotStatus>(`${this.baseUrl}/status`);
  }

  // Get fertilizer logs
  getFertilizerLogs(): Observable<FertilizerLog[]> {
    return this.http.get<FertilizerLog[]>(`${this.baseUrl}/logs`);
  }

  // Get all commands (for debugging)
  getCommands(): Observable<Command[]> {
    return this.http.get<Command[]>(`${this.baseUrl}/commands`);
  }
}
