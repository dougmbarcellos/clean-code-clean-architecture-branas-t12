export default class Segment {
  constructor(readonly from: number[], readonly to: number[], readonly date: Date) {
    if (!this.isValidCoordinatesFrom() || !this.isValidCoordinatesTo())
      throw new Error('Invalid distance');
    if (!this.isValidDate()) throw new Error('Invalid date');
  }

  isOvernight() {
    return this.date.getHours() >= 22 || this.date.getHours() <= 6;
  }

  isSunday() {
    return this.date.getDay() === 0;
  }

  isValidCoordinatesFrom() {
    return this.from && this.from.length === 2 && this.isValidLatLong(this.from);
  }

  isValidCoordinatesTo() {
    return this.to && this.to.length === 2 && this.isValidLatLong(this.to);
  }

  isValidLatLong(coordinates: number[]) {
    const [lat, long] = coordinates;
    return this.isValidLatitude(lat) && this.isValidLongitude(long);
  }

  isValidLatitude(latitude: number) {
    return latitude >= -90 && latitude <= 90;
  }

  isValidLongitude(longitude: number) {
    return longitude >= -180 && longitude <= 180;
  }

  isValidDate() {
    return this.date && this.date instanceof Date && this.date.toString() !== 'Invalid Date';
  }
}
