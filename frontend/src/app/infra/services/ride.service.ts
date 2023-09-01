import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import RidePositions from 'src/app/domain/ride-positions';
import { HttpClientService } from '../http/http-client.service';
import { IRide } from './ride.interface';

@Injectable({
  providedIn: 'root',
})
export class RideService implements IRide {
  private httpClient = inject(HttpClientService);

  calculate(positions: RidePositions): Observable<any> {
    return this.httpClient.post('/calculate_ride', positions);
  }
}
