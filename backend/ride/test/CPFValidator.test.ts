import CPFValidator from '../src/CPFValidator';

test('deve verificar se os dígitos do CPF estão corretos', () => {
  expect(new CPFValidator('342.701.900-43').validate()).toBe(true);
});

test('deve verificar se os dígitos do CPF estão incorretos', () => {
  expect(() => new CPFValidator('342.701.900-00').validate()).toThrow('Invalid document');
});

test('deve verificar se o CPF sem pontuação está correto', () => {
  expect(new CPFValidator('34270190043').validate()).toBe(true);
});

test('deve verificar se o CPF sem pontuação está incorreto', () => {
  expect(() => new CPFValidator('34270190000').validate()).toThrow('Invalid document');
});

test('deve invalidar repetição de dígitos', () => {
  expect(() => new CPFValidator('99999999999').validate()).toThrow('Invalid document');
  expect(() => new CPFValidator('999.999.999-99').validate()).toThrow('Invalid document');
});

test('deve invalidar string vazia', () => {
  expect(() => new CPFValidator('').validate()).toThrow('Invalid document');
});
