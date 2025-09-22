import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, interval, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HealthDataService {
  private sleepHoursSubject = new BehaviorSubject<number>(7.5);
  sleepHours$: Observable<number> = this.sleepHoursSubject.asObservable();

  constructor() {
    // Mock data stream: update sleep hours every 5 seconds
    interval(5000)
      .pipe(
        map(() => this.generateRandomSleepHours())
      )
      .subscribe((value: number) => this.sleepHoursSubject.next(value));
  }

  // Simulate fetching latest sleep hours from a backend/mock source
  private generateRandomSleepHours(): number {
    // Random between 6.0 and 9.0 with 0.1 precision
    const min = 6.0;
    const max = 9.0;
    const value = Math.random() * (max - min) + min;
    return Math.round(value * 10) / 10;
  }
}
