import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { FinancialService, FinancialData, FinancialMetrics, TrendData, ExpenseCategory, CropProfitability } from '../../services/financial.service';
import { ApiService } from '../../services/api.service';
import { SharedModule } from '../../shared/shared-module';

declare var Chart: any;

@Component({
  selector: 'app-financial-overview',
  standalone: true,
  imports: [CommonModule, FormsModule, SharedModule],
  templateUrl: './financial-overview.html',
  styleUrls: ['./financial-overview.scss']
})
export class FinancialOverviewComponent implements OnInit, OnDestroy {
  @ViewChild('trendChart', { static: true }) trendChartRef!: ElementRef;
  @ViewChild('donutChart', { static: true }) donutChartRef!: ElementRef;

  private readonly destroy$ = new Subject<void>();
  
  // Data properties
  financialData: FinancialData | null = null;
  trendChart: any = null;
  donutChart: any = null;
  
  // UI state
  selectedPeriod = 'Last 90 Days';
  showExportModal = false;
  exportFormat: 'csv' | 'json' | 'pdf' = 'csv';
  isLoading = false;
  
  // Backend finance
  financeSummary: any = null;
  financeRecords: any[] = [];

  // Period options
  periodOptions = [
    'Last 30 Days',
    'Last 90 Days',
    'Last 6 Months',
    'Last Year'
  ];

  constructor(
    private readonly financialService: FinancialService,
    private readonly api: ApiService
  ) {}

  ngOnInit(): void {
    this.loadFinancialData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    
    if (this.trendChart) {
      this.trendChart.destroy();
    }
    if (this.donutChart) {
      this.donutChart.destroy();
    }
  }

  private loadFinancialData(): void {
    this.isLoading = true;
    
    this.financialService.getFinancialDataByPeriod(this.selectedPeriod)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.financialData = data;
        this.isLoading = false;
        this.initializeCharts();
      });

    // Also load backend finance summary and records
    this.api.getFinanceSummary()
      .pipe(takeUntil(this.destroy$))
      .subscribe({ next: (s) => this.financeSummary = s, error: () => {} });
    this.api.getFinanceRecords()
      .pipe(takeUntil(this.destroy$))
      .subscribe({ next: (r) => this.financeRecords = r || [], error: () => {} });
  }

  onPeriodChange(): void {
    this.loadFinancialData();
  }

  private initializeCharts(): void {
    if (!this.financialData) return;

    // Initialize trend chart
    this.initializeTrendChart();
    
    // Initialize donut chart
    this.initializeDonutChart();
  }

  private initializeTrendChart(): void {
    if (this.trendChart) {
      this.trendChart.destroy();
    }

    const chartData = this.financialService.getChartData();
    
    this.trendChart = new Chart(this.trendChartRef.nativeElement, {
      type: 'line',
      data: chartData.trendChart,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              usePointStyle: true,
              padding: 20
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value: any) {
                return '$' + value.toLocaleString();
              }
            }
          }
        },
        elements: {
          point: {
            radius: 4,
            hoverRadius: 6
          }
        }
      }
    });
  }

  private initializeDonutChart(): void {
    if (this.donutChart) {
      this.donutChart.destroy();
    }

    const chartData = this.financialService.getChartData();
    
    this.donutChart = new Chart(this.donutChartRef.nativeElement, {
      type: 'doughnut',
      data: chartData.donutChart,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              usePointStyle: true,
              padding: 20,
              generateLabels: (chart: any) => {
                const data = chart.data;
                if (data.labels.length && data.datasets.length) {
                  return data.labels.map((label: string, index: number) => {
                    const dataset = data.datasets[0];
                    const value = dataset.data[index];
                    const total = dataset.data.reduce((a: number, b: number) => a + b, 0);
                    const percentage = ((value / total) * 100).toFixed(1);
                    
                    return {
                      text: `${label} (${percentage}%)`,
                      fillStyle: dataset.backgroundColor[index],
                      strokeStyle: dataset.backgroundColor[index],
                      lineWidth: 0,
                      pointStyle: 'rect',
                      hidden: false,
                      index: index
                    };
                  });
                }
                return [];
              }
            }
          },
          tooltip: {
            callbacks: {
              label: (context: any) => {
                const label = context.label || '';
                const value = context.parsed;
                return `${label}: $${value.toLocaleString()}`;
              }
            }
          }
        },
        cutout: '60%'
      }
    });
  }

  // Export functionality
  openExportModal(): void {
    this.showExportModal = true;
  }

  closeExportModal(): void {
    this.showExportModal = false;
  }

  exportData(): void {
    const exportData = this.financialService.exportFinancialData(this.exportFormat);
    
    if (this.exportFormat === 'csv') {
      this.downloadCSV(exportData, 'financial-overview.csv');
    } else if (this.exportFormat === 'json') {
      this.downloadJSON(exportData, 'financial-overview.json');
    } else if (this.exportFormat === 'pdf') {
      console.log('PDF export:', exportData);
    }
    
    this.closeExportModal();
  }

  private downloadCSV(content: string, filename: string): void {
    const blob = new Blob([content], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  private downloadJSON(content: string, filename: string): void {
    const blob = new Blob([content], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  // Utility methods
  formatCurrency(amount: number): string {
    return '$' + amount.toLocaleString();
  }

  getExpenseBarWidth(amount: number): string {
    if (!this.financialData) return '0%';
    const maxAmount = Math.max(...this.financialData.expenseBreakdown.map(e => e.amount));
    return `${(amount / maxAmount) * 100}%`;
  }

  getExpensePercentage(amount: number): number {
    if (!this.financialData) return 0;
    const total = this.financialData.expenseBreakdown.reduce((sum, e) => sum + e.amount, 0);
    return Math.round((amount / total) * 100);
  }

  getCropPercentage(profit: number): number {
    if (!this.financialData) return 0;
    const total = this.financialData.cropProfitability.reduce((sum, c) => sum + c.profit, 0);
    return Math.round((profit / total) * 100);
  }
}
