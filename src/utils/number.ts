import { isNumber } from 'es-toolkit/compat';

export const sanitizeNumericString = (value: string) => value.replace(/[^\d]/g, '');

export const parseNumberInput = (value?: string | null) => {
  if (!value) {
    return null;
  }

  const numeric = sanitizeNumericString(value);
  if (!numeric) {
    return null;
  }

  const parsed = Number.parseInt(numeric, 10);
  return Number.isNaN(parsed) ? null : parsed;
};

export const formatCurrency = (value?: number | null, locale: Intl.LocalesArgument = 'ko-KR') => {
  if (!isNumber(value)) {
    return '';
  }

  return new Intl.NumberFormat(locale).format(value);
};
