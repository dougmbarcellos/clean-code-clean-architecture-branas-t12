import Segment from '../../src/application/domain/ride/Segment';

test('Deve inicializar um trajeto', function () {
  const segment = new Segment(10, new Date('2023-03-01T10:00:00'));
  expect(segment).toBeDefined();
});

test('Deve retornar erro se a data for inválida', function () {
  expect(() => new Segment(10, new Date('javascript'))).toThrow(new Error('Invalid date'));
});
