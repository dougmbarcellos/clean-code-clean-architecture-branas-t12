import { CommonModule } from '@angular/common';
import { Component, ViewChild, inject } from '@angular/core';
import { RideBaseFormComponent } from 'src/app/components/ride-base-form/ride-base-form.component';
import RidePositions from 'src/app/domain/ride-positions';
import { RideService } from 'src/app/infra/services/ride.service';

@Component({
  standalone: true,
  imports: [CommonModule, RideBaseFormComponent],
  templateUrl: './calculate-ride.component.html',
  styleUrls: ['./calculate-ride.component.scss'],
})
export class CalculateRideComponent {
  private rideService = inject(RideService);
  @ViewChild('rideBaseForm') rideBaseForm!: RideBaseFormComponent;

  calculate() {
    this.rideService
      .calculate({ positions: this.rideBaseForm.positions.getRawValue() } as RidePositions)
      .subscribe((response) => {
        alert(response.price);
      });
  }
}
