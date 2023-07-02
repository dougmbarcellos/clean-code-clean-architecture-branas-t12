enum VerificationDigitPosition {
  PENULTIMATE = 9, // 111.444.777-X5
  LAST = 10, // 111.444.777-3X
}

const isValidLength = (formattedCPF: string) =>
  formattedCPF && formattedCPF.length >= 11 && formattedCPF.length <= 14;

function hasSequentiallyRepeatedDigits(cpf: string): boolean {
  const firstDigit = cpf.at(0);

  return cpf.split('').every((digit) => digit === firstDigit);
}

const clearFormatting = (cpf: string) => cpf.replace(/\D/g, '');

function isValidVerificationDigit(
  cleanCPF: string,
  verificationDigitPosition: VerificationDigitPosition
): boolean {
  const reverseDigitList = cleanCPF.slice(0, verificationDigitPosition).split('').reverse();
  let multiplier = 2;
  let sum = 0;
  for (const digit of reverseDigitList) {
    sum += parseInt(digit) * multiplier;
    multiplier++;
  }
  const rest = sum % 11;
  const resultDigit = rest <= 2 ? 0 : 11 - rest;
  return cleanCPF.at(verificationDigitPosition) === resultDigit.toString();
}

export function validate(formattedCPF: string): boolean {
  if (!isValidLength(formattedCPF)) return false;

  const cleanCPF = clearFormatting(formattedCPF);
  if (hasSequentiallyRepeatedDigits(cleanCPF)) return false;

  try {
    if (!isValidVerificationDigit(cleanCPF, VerificationDigitPosition.PENULTIMATE)) return false;
    if (!isValidVerificationDigit(cleanCPF, VerificationDigitPosition.LAST)) return false;
  } catch (e) {
    console.error(`Error ${e}!`);
    return false;
  }

  return true;
}
