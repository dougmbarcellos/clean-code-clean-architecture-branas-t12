enum VerificationDigit {
  PENULTIMATE = 9, // 111.444.777-X5
  LAST = 10, // 111.444.777-3X
}

export default class Cpf {
  value: string;

  constructor(value: string) {
    if (!this.validate(value)) throw new Error('Invalid cpf');
    this.value = value;
  }

  private validate(value: string): boolean {
    if (!this.isValidLength(value)) return false;
    const cleanDocument = this.clearFormatting(value);
    if (this.hasSequentiallyRepeatedDigits(cleanDocument)) return false;
    if (
      !this.isValidVerificationDigit(cleanDocument, VerificationDigit.PENULTIMATE) ||
      !this.isValidVerificationDigit(cleanDocument, VerificationDigit.LAST)
    )
      return false;

    return true;
  }

  private isValidLength(document: string) {
    return document && document.length >= 11 && document.length <= 14;
  }

  private hasSequentiallyRepeatedDigits(cleanDocument: string): boolean {
    const firstDigit = cleanDocument.at(0);

    return cleanDocument.split('').every((digit) => digit === firstDigit);
  }

  private clearFormatting(document: string) {
    return document.replace(/\D/g, '');
  }

  private isValidVerificationDigit(
    cleanDocument: string,
    verificationDigit: VerificationDigit
  ): boolean {
    const reverseDigitList = cleanDocument.slice(0, verificationDigit).split('').reverse();
    let multiplier = 2;
    let sum = 0;
    for (const digit of reverseDigitList) {
      sum += parseInt(digit) * multiplier;
      multiplier++;
    }
    const rest = sum % 11;
    const resultDigit = rest <= 2 ? 0 : 11 - rest;
    return cleanDocument.at(verificationDigit) === resultDigit.toString();
  }
}
