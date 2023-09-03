import { CommonModule } from '@angular/common';
import { Component, ViewChild, inject } from '@angular/core';
import { RideBaseFormComponent } from 'src/app/components/ride-base-form/ride-base-form.component';
import RideRequest from 'src/app/domain/ride-request';
import { RideService } from 'src/app/infra/services/ride.service';

@Component({
  standalone: true,
  imports: [CommonModule, RideBaseFormComponent],
  templateUrl: './request-ride.component.html',
  styleUrls: ['./request-ride.component.scss'],
})
export class RequestRideComponent {
  private rideService = inject(RideService);
  @ViewChild('rideBaseForm') rideBaseForm!: RideBaseFormComponent;
  private passengerId = '123';

  request() {
    this.rideService
      .request({
        passengerId: this.passengerId,
        positions: this.rideBaseForm.positions.getRawValue(),
      } as RideRequest)
      .subscribe((response) => {
        alert(response._id);
      });
  }
}
