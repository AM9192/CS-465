import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-trip.component.html'
})
export class AddTripComponent implements OnInit {
  public addForm!: FormGroup;
  public submitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private trips: TripDataService
  ) {}

  ngOnInit(): void {
    this.addForm = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  public onSubmit() {
    this.submitted = true;
    if (this.addForm.valid) {
      this.trips.addTrip(this.addForm.value).subscribe({
        next: () => this.router.navigate(['/']),
        error: err => console.error(err)
      });
    }
  }

  get f() { return this.addForm.controls; }
}