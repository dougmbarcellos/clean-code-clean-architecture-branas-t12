import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import Driver from 'src/app/domain/driver';
import { FormControlsBy } from 'src/app/domain/form-controls-by';
import { DriverService } from 'src/app/infra/services/driver.service';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-driver.component.html',
  styleUrls: ['./create-driver.component.scss'],
})
export class CreateDriverComponent {
  private driverService = inject(DriverService);
  private fb = inject(FormBuilder);
  formGroup = this.fb.group<FormControlsBy<Driver>>({
    id: this.fb.control({ value: '', disabled: true }),
    name: this.fb.control(''),
    email: this.fb.control('', {
      validators: [Validators.email],
    }),
    document: this.fb.control(''),
    carPlate: this.fb.control(''),
  });

  createDriver() {
    this.driverService.save(this.formGroup.getRawValue()).subscribe((response) => {
      this.formGroup.controls.id.setValue(response.driverId);
    });
  }
}
