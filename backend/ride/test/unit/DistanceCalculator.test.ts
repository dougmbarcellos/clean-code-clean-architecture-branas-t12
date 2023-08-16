import Coord from '../../src/application/domain/Coord';
import DistanceCalculator from '../../src/application/domain/DistanceCalculator';

test('Deve calcular a distância entre duas coordenadas', () => {
  const from = new Coord(-19.7392195, -40.6681334);
  const to = new Coord(-19.9320348, -40.6102108);
  const distance = DistanceCalculator.calculate(from, to);
  expect(distance).toBe(22.3694985);
});
