import CarPlate from '../../src/application/domain/driver/CarPlate';

test('Deve testar uma placa válida', () => {
  const carPlate = new CarPlate('AAA9999');
  expect(carPlate).toBeDefined();
});

test('Deve testar uma placa inválida', () => {
  expect(() => new CarPlate('AAA999')).toThrow(new Error('Invalid car plate'));
});
