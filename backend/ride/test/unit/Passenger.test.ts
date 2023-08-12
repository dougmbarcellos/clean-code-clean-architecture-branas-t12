import Passenger from '../../src/Passenger';

test('Deve criar um passageiro', () => {
  const passenger = Passenger.create('doug', 'doug@doug.com', '111.444.777-35');
  expect(passenger._id).toBeDefined();
  expect(passenger.name).toBe('doug');
  expect(passenger.email).toEqual({ value: 'doug@doug.com' });
  expect(passenger.cpf).toEqual({ value: '111.444.777-35' });
});

test('Não pode criar passageiro com CPF inválido', async () => {
  expect(() => Passenger.create('doug', 'doug@doug.com', '111.444.777-36')).toThrow(
    new Error('Invalid cpf')
  );
});
