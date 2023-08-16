import Passenger from '../../src/application/domain/passenger/Passenger';

test('Deve criar um passageiro', () => {
  const passenger = Passenger.create('doug', 'doug@doug.com', '111.444.777-35');
  expect(passenger._id).toBeDefined();
  expect(passenger.name).toBe('doug');
  expect(passenger.email.value).toEqual('doug@doug.com');
  expect(passenger.document.value).toEqual('111.444.777-35');
});

test('Não pode criar passageiro com email inválido', async () => {
  expect(() => Passenger.create('doug', 'doug@doug', '111.444.777-35')).toThrow(
    new Error('Invalid email')
  );
});

test('Não pode criar passageiro com documento inválido', async () => {
  expect(() => Passenger.create('doug', 'doug@doug.com', '111.444.777-36')).toThrow(
    new Error('Invalid document')
  );
});
