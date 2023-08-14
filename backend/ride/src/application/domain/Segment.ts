export default class Segment {
  private KILOMETERS_PER_COORDINATE_POINT = 111.11;
  distance: number;

  constructor(readonly from: number[], readonly to: number[], readonly date: Date) {
    if (!this.isValidCoordinatesFrom() || !this.isValidCoordinatesTo())
      throw new Error('Invalid distance');
    if (!this.isValidDate()) throw new Error('Invalid date');
    this.distance = this.getDistance();
  }

  private isValidCoordinatesFrom() {
    return this.from && this.from.length === 2 && this.isValidLatLong(this.from);
  }

  private isValidCoordinatesTo() {
    return this.to && this.to.length === 2 && this.isValidLatLong(this.to);
  }

  private isValidLatLong(coordinates: number[]) {
    const [lat, long] = coordinates;
    return this.isValidLatitude(lat) && this.isValidLongitude(long);
  }

  private isValidLatitude(latitude: number) {
    return latitude >= -90 && latitude <= 90;
  }

  private isValidLongitude(longitude: number) {
    return longitude >= -180 && longitude <= 180;
  }

  private isValidDate() {
    return this.date && this.date instanceof Date && this.date.toString() !== 'Invalid Date';
  }

  isOvernight() {
    return this.date.getHours() >= 22 || this.date.getHours() <= 6;
  }

  isSunday() {
    return this.date.getDay() === 0;
  }

  private getDistance() {
    return this.measureDistance() * this.KILOMETERS_PER_COORDINATE_POINT;
  }

  private measureDistance() {
    const [fromLat, fromLong] = this.from;
    const [toLat, toLong] = this.to;
    return parseFloat(
      Math.sqrt(Math.pow(fromLong - toLong, 2) + Math.pow(fromLat - toLat, 2)).toFixed(7)
    );
  }
}
