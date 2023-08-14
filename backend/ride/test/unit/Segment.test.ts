import Segment from '../../src/application/domain/Segment';

const coordsSaoRoque = [-19.7392195, -40.6681334];
const coordsSantaTeresa = [-19.9320348, -40.6102108];

test('Deve inicializar um trajeto', function () {
  const segment = new Segment(coordsSaoRoque, coordsSantaTeresa, new Date('2023-03-01T10:00:00'));
  expect(segment).toBeDefined();
});

test('Deve retornar erro se a distância for inválida', function () {
  expect(() => new Segment([], [], new Date('2023-03-01T10:00:00'))).toThrow(
    new Error('Invalid distance')
  );
});

test('Deve retornar erro se a data for inválida', function () {
  expect(() => new Segment(coordsSaoRoque, coordsSantaTeresa, new Date('javascript'))).toThrow(
    new Error('Invalid date')
  );
});
