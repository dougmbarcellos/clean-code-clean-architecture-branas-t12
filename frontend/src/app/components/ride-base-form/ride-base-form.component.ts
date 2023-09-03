import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-ride-base-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ride-base-form.component.html',
  styleUrls: ['./ride-base-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RideBaseFormComponent {
  private fb = inject(FormBuilder);

  positions = this.fb.array([this.createGroup(), this.createGroup()]);

  createGroup() {
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

  addSegment() {
    this.positions.push(this.createGroup());
  }

  removeSegment(index: number) {
    this.positions.removeAt(index);
  }
}
