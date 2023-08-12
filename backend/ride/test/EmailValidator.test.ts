import { validate } from '../src/EmailValidator';

test('Deve validar o email', () => {
  const email = 'doug@doug.com';
  const isValid = validate(email);
  expect(isValid).toBeTruthy();
});

test('Não deve validar um email inválid', () => {
  const email = 'doug@doug';
  const isValid = validate(email);
  expect(isValid).toBeFalsy();
});
