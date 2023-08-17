import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormControlsBy } from 'src/app/domain/FormControlsBy';
import Passenger from 'src/app/domain/Passenger';
import { CreatePassengerService } from './services/create-passenger.service';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-passenger.component.html',
  styleUrls: ['./create-passenger.component.scss'],
})
export class CreatePassengerComponent {
  private createPassengerService = inject(CreatePassengerService);
  private fb = inject(FormBuilder);
  formGroup = this.fb.group<FormControlsBy<Passenger>>({
    id: this.fb.control({ value: '', disabled: true }),
    name: this.fb.control(''),
    email: this.fb.control('', {
      validators: [Validators.email],
    }),
    document: this.fb.control(''),
  });

  createPassenger() {
    this.createPassengerService
      .createPassenger(this.formGroup.getRawValue())
      .subscribe((response) => {
        this.formGroup.controls.id.setValue(response.passengerId);
      });
  }
}
