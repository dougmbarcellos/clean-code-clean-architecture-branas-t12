import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import RidePositions from 'src/app/domain/ride-positions';
import { RideService } from 'src/app/infra/services/ride.service';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './calculate-ride.component.html',
  styleUrls: ['./calculate-ride.component.scss'],
})
export class CalculateRideComponent {
  private fb = inject(FormBuilder);
  private rideService = inject(RideService);

  formGroup = this.fb.group({
    positions: this.fb.array([this.buildGroup(), this.buildGroup()]),
  });

  get positions() {
    return this.formGroup.controls.positions;
  }

  buildGroup() {
    return this.fb.group({
      lat: this.fb.control<null | number>(null, {
        validators: [Validators.required],
      }),
      long: this.fb.control<null | number>(null, {
        validators: [Validators.required],
      }),
      date: this.fb.control<string>('', {
        validators: [Validators.required],
      }),
    });
  }

  removeSegment(index: number) {
    this.positions.removeAt(index);
  }

  addSegment() {
    this.positions.push(this.buildGroup());
  }

  calculate() {
    this.rideService
      .calculate({ positions: this.positions.getRawValue() } as RidePositions)
      .subscribe((response) => {
        alert(response.price);
      });
  }
}
