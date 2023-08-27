import { FormControl } from '@angular/forms';

export type FormControlsBy<T> = {
  [Property in keyof T]: FormControl<null | T[Property]>;
};
