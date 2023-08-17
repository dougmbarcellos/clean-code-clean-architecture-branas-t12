import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Nullable as NullableProperties } from 'src/app/domain/NullableProperties';
import Passenger from 'src/app/domain/Passenger';

@Injectable({
  providedIn: 'root',
})
export class CreatePassengerService {
  private httpClient = inject(HttpClient);

  createPassenger(data: NullableProperties<Passenger>) {
    return this.httpClient.post<any>('http://localhost:3000/passengers', data);
  }
}
