import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';

export interface HealthMetric {
  id: string;
  title: string;
  value: string;
  unit: string;
  icon: string;
  color: string;
  bgGradient: string;
  progress: number;
}

@Injectable({
  providedIn: 'root'
})
export class HealthDataService {
  private sleepHoursSubject = new BehaviorSubject<number>(7.5);
  private mockSleepData = [7.2, 8.1, 6.8, 7.5, 8.3, 7.9, 6.5, 7.8, 8.0, 7.3];
  private dataIndex = 0;

  constructor() {
    // Simulate dynamic data updates every 10 seconds
    interval(10000).subscribe(() => {
      this.updateSleepHours();
    });
  }

  getSleepHours(): Observable<number> {
    return this.sleepHoursSubject.asObservable();
  }

  private updateSleepHours(): void {
    // Cycle through mock data
    this.dataIndex = (this.dataIndex + 1) % this.mockSleepData.length;
    const newSleepHours = this.mockSleepData[this.dataIndex];
    this.sleepHoursSubject.next(newSleepHours);
  }

  // Method to manually trigger data refresh for testing
  refreshSleepData(): void {
    this.updateSleepHours();
  }

  // Get all health metrics with dynamic sleep data
  getHealthMetrics(): Observable<HealthMetric[]> {
    return this.getSleepHours().pipe(
      map(sleepHours => [
        {
          id: 'steps',
          title: 'Steps Taken',
          value: '8,000',
          unit: 'steps',
          icon: '👣',
          color: '#3b82f6',
          bgGradient: 'linear-gradient(135deg, #3b82f6, #1e40af)',
          progress: 80
        },
        {
          id: 'calories',
          title: 'Calories Burned',
          value: '500',
          unit: 'kcal',
          icon: '🔥',
          color: '#ef4444',
          bgGradient: 'linear-gradient(135deg, #ef4444, #dc2626)',
          progress: 65
        },
        {
          id: 'heartrate',
          title: 'Heart Rate',
          value: '72',
          unit: 'bpm',
          icon: '❤️',
          color: '#f59e0b',
          bgGradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
          progress: 75
        },
        {
          id: 'sleep',
          title: 'Sleep Hours',
          value: sleepHours.toFixed(1),
          unit: 'hrs',
          icon: '😴',
          color: '#8b5cf6',
          bgGradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
          progress: Math.round((sleepHours / 9) * 100) // Progress based on 9 hours target
        }
      ])
    );
  }

  // Get sleep statistics for summary
  getSleepSummary(): Observable<{ average: number; trend: string }> {
    return this.getSleepHours().pipe(
      map(currentSleep => ({
        average: 7.2,
        trend: currentSleep > 7.2 ? 'increasing' : 'decreasing'
      }))
    );
  }
}