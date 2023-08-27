export type NullableProperties<T> = {
  [Property in keyof T]: null | T[Property];
};
