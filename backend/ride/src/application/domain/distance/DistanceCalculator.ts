import Coord from './Coord';

const KILOMETERS_PER_COORDINATE_POINT = 111.11;

export default class DistanceCalculator {
  static calculate(from: Coord, to: Coord) {
    const result = parseFloat(
      Math.sqrt(Math.pow(from.long - to.long, 2) + Math.pow(from.lat - to.lat, 2)).toFixed(7)
    );

    return parseFloat((result * KILOMETERS_PER_COORDINATE_POINT).toFixed(7));
  }
}
