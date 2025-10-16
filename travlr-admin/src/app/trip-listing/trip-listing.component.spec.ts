import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TripListingComponent } from './trip-listing.component';
import { TripCardComponent } from '../trip-card/trip-card.component';

describe('TripListingComponent', () => {
  let component: TripListingComponent;
  let fixture: ComponentFixture<TripListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripListingComponent, TripCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TripListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});