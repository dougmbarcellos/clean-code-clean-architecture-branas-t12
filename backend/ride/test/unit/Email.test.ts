import Email from '../../src/application/domain/person/Email';

test('Deve validar o email', () => {
  const email = new Email('doug@doug.com');
  expect(email).toBeTruthy();
});

test('Não deve validar um email inválido', () => {
  expect(() => new Email('doug@doug')).toThrow(new Error('Invalid email'));
});
