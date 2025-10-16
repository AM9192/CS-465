import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';

function toDateInputValue(isoOrDate: string | Date) {
  const d = new Date(isoOrDate);
  // adjust for timezone so the date input shows the correct local day
  const off = d.getTimezoneOffset();
  const local = new Date(d.getTime() - off * 60000);
  return local.toISOString().slice(0, 10); // yyyy-MM-dd
}

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './edit-trip.component.html'
})
export class EditTripComponent implements OnInit {
  editForm!: FormGroup;
  submitted = false;
  id!: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private trips: TripDataService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;

    this.editForm = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.trips.getTrip(this.id).subscribe({
      next: (t: any) => {
        const data = Array.isArray(t) ? t[0] : t;
        if (data?.start) data.start = toDateInputValue(data.start);
        this.editForm.patchValue(data);
      },
      error: err => console.error('getTrip failed', err)
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.editForm.valid) {
      this.trips.updateTrip(this.id, this.editForm.value).subscribe({
        next: () => this.router.navigate(['/']),
        error: err => console.error('updateTrip failed', err)
      });
    }
  }
}