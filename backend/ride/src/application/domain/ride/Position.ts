import Coord from '../distance/Coord';

export default class Position {
  coord: Coord;

  constructor(readonly lat: number, readonly long: number, readonly date: Date) {
    if (!this.isValidLat() || !this.isValidLong()) throw new Error('Invalid distance');

    this.coord = new Coord(lat, long);
  }

  private isValidLat() {
    return this.lat >= -90 && this.lat <= 90;
  }

  private isValidLong() {
    return this.long >= -180 && this.long <= 180;
  }
}
