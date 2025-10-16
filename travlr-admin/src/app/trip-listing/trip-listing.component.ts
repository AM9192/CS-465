import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, RouterModule], // ✅ routerLink now works
  templateUrl: './trip-listing.component.html',
})
export class TripListingComponent implements OnInit {
  trips: Trip[] = [];
  loading = true;
  error = '';

  constructor(private tripsSvc: TripDataService) {}

  ngOnInit(): void {
    this.tripsSvc.getTrips().subscribe({
      next: (data) => {
        this.trips = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load trips.';
        this.loading = false;
        console.error(err);
      },
    });
  }

  // ✅ moved inside class
  onDelete(id: string) {
    this.tripsSvc.deleteTrip(id).subscribe(() => {
      this.trips = this.trips.filter((t) => t._id !== id);
    });
  }
}