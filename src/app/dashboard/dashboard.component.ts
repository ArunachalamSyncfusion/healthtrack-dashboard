import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HealthDataService } from '../services/health-data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  title = 'HealthTrack Dashboard';

  // Live data stream for sleep hours
  sleepHours$: Observable<number>;
  
  // Sample health metrics data
  healthMetrics = [
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
      value: '', // value will be provided dynamically from service
      unit: 'hrs',
      icon: '😴',
      color: '#8b5cf6',
      bgGradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
      progress: 0 // progress will be computed dynamically
    }
  ];

  constructor(private healthData: HealthDataService) {
    this.sleepHours$ = this.healthData.sleepHours$;
  }

  // Compute progress based on an 8-hour goal
  computeSleepProgress(hours: number): number {
    const goal = 8;
    const pct = Math.round((Math.max(0, Math.min(hours, goal)) / goal) * 100);
    return pct;
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
}
