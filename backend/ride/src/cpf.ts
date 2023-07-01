enum DigitType {
  PENULTIMATE = 9, // 111.444.777-X5
  LAST = 10, // 111.444.777-3X
}

function isRepeated(cpf: string): boolean {
  const firstDigit = cpf.at(0);

  return cpf.split('').every((digit) => digit === firstDigit);
}

const removeFormat = (cpf: string) => cpf.replace(/[^\d]/g, '');

function getVerificationDigit(rawCPF: string, upToDigit: DigitType): string {
  const reverseDigitList = rawCPF.slice(0, upToDigit).split('').reverse();
  let multiplier = 2;
  let sum = 0;

  for (const digit of reverseDigitList) {
    sum += parseInt(digit) * multiplier;
    multiplier++;
  }

  const rest = sum % 11;
  return String(rest <= 2 ? 0 : 11 - rest);
}

export function validate(formattedCPF: string): boolean {
  if (!formattedCPF || formattedCPF.length < 11 || formattedCPF.length > 14)
    return false;

  const rawCPF = removeFormat(formattedCPF);
  if (isRepeated(rawCPF)) return false;

  try {
    const penultimateDigit = getVerificationDigit(
      rawCPF,
      DigitType.PENULTIMATE
    );
    if (penultimateDigit !== rawCPF.at(DigitType.PENULTIMATE)) return false;

    const lastDigit = getVerificationDigit(rawCPF, DigitType.LAST);
    if (lastDigit !== rawCPF.at(DigitType.LAST)) return false;
  } catch (e) {
    console.error('Erro !' + e);
    return false;
  }

  return true;
}
