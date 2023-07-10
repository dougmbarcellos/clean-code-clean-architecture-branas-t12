import Segment from './Segment';

export default class Ride {
  segments: Segment[];
  OVERNIGHT_FARE = 3.9;
  OVERNIGHT_SUNDAY_FARE = 5;
  SUNDAY_FARE = 2.9;
  NORMAL_FARE = 2.1;
  MIN_PRICE = 10;
  KILOMETERS_PER_COORDINATE_POINT = 111.11;

  constructor() {
    this.segments = [];
  }

  addSegment(from: number[], to: number[], date: Date) {
    this.segments.push(new Segment(from, to, date));
  }

  measureDistance([fromLat, fromLong]: number[], [toLat, toLong]: number[]) {
    return parseFloat(
      Math.sqrt(Math.pow(fromLong - toLong, 2) + Math.pow(fromLat - toLat, 2)).toFixed(7)
    );
  }

  getDistance(from: number[], to: number[]) {
    return this.measureDistance(from, to) * this.KILOMETERS_PER_COORDINATE_POINT;
  }

  calculate() {
    let price = 0;
    for (const segment of this.segments) {
      if (segment.isOvernight() && !segment.isSunday()) {
        price += this.getDistance(segment.from, segment.to) * this.OVERNIGHT_FARE;
      }
      if (segment.isOvernight() && segment.isSunday()) {
        price += this.getDistance(segment.from, segment.to) * this.OVERNIGHT_SUNDAY_FARE;
      }
      if (!segment.isOvernight() && segment.isSunday()) {
        price += this.getDistance(segment.from, segment.to) * this.SUNDAY_FARE;
      }
      if (!segment.isOvernight() && !segment.isSunday()) {
        price += this.getDistance(segment.from, segment.to) * this.NORMAL_FARE;
      }
    }
    return price < this.MIN_PRICE ? this.MIN_PRICE : parseFloat(price.toFixed(2));
  }
}
