import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  title = 'HealthTrack Dashboard';
  
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
      value: '7.5',
      unit: 'hrs',
      icon: '😴',
      color: '#8b5cf6',
      bgGradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
      progress: 85
    }
  ];

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
