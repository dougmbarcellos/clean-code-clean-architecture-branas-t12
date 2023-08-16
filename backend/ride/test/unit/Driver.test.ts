import Driver from '../../src/application/domain/driver/Driver';

test('Deve criar um motorista', () => {
  const driver = Driver.create('doug', 'doug@doug.com', '111.444.777-35', 'XYZ1230');
  expect(driver._id).toBeDefined();
  expect(driver.name).toBe('doug');
  expect(driver.email.value).toBe('doug@doug.com');
  expect(driver.document.value).toBe('111.444.777-35');
});

test('Não pode criar motorista com email inválido', async () => {
  expect(() => Driver.create('doug', 'doug@doug', '111.444.777-35', 'XYZ1230')).toThrow(
    new Error('Invalid email')
  );
});

test('Não pode criar motorista com documento inválido', async () => {
  expect(() => Driver.create('doug', 'doug@doug.com', '111.444.777-36', 'XYZ1230')).toThrow(
    new Error('Invalid document')
  );
});

test('Não pode criar motorista com placa do carro inválida', async () => {
  expect(() => Driver.create('doug', 'doug@doug.com', '111.444.777-36', 'XYZ123')).toThrow(
    new Error('Invalid document')
  );
});
