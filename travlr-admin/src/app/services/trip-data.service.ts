import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';

@Injectable({ providedIn: 'root' })
export class TripDataService {
  private base = '/api/trips'; // proxy points /api → localhost:3000

  constructor(private http: HttpClient) {}

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.base);
  }

  getTrip(id: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.base}/${id}`);
  }

  addTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.base, trip);
  }

  updateTrip(id: string, trip: Partial<Trip>): Observable<Trip> {
    return this.http.put<Trip>(`${this.base}/${id}`, trip);
  }

  deleteTrip(id: string) {
    return this.http.delete(`${this.base}/${id}`);
  }
}