import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HealthDataService, HealthMetric } from '../services/health-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  title = 'HealthTrack Dashboard';
  healthMetrics: HealthMetric[] = [];
  sleepSummary: { average: number; trend: string } = { average: 7.2, trend: 'stable' };
  
  private subscriptions: Subscription[] = [];

  constructor(private healthDataService: HealthDataService) {}

  ngOnInit(): void {
    // Subscribe to dynamic health metrics data
    const metricsSubscription = this.healthDataService.getHealthMetrics().subscribe(
      (metrics: HealthMetric[]) => {
        this.healthMetrics = metrics;
      }
    );

    // Subscribe to sleep summary data
    const summarySubscription = this.healthDataService.getSleepSummary().subscribe(
      (summary) => {
        this.sleepSummary = summary;
      }
    );

    this.subscriptions.push(metricsSubscription, summarySubscription);
  }

  ngOnDestroy(): void {
    // Clean up subscriptions to prevent memory leaks
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  getCurrentDate(): string {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return today.toLocaleDateString('en-US', options);
  }

  // Method to manually refresh sleep data for testing
  refreshSleepData(): void {
    this.healthDataService.refreshSleepData();
  }

  // Get sleep-specific metric for easy access
  get sleepMetric(): HealthMetric | undefined {
    return this.healthMetrics.find(metric => metric.id === 'sleep');
  }
}
