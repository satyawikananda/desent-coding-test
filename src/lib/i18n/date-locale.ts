import {
  enUS as localeEn,
  id as localeId,
  type Locale as DateFnsLocale,
} from 'date-fns/locale';

import type { Locale } from '@/cfgs/i18n.cfg';

export const dateFnsLocaleByLocale = {
  id: localeId,
  en: localeEn,
} as const satisfies Record<Locale, DateFnsLocale>;

export const intlDateLocaleByLocale = {
  id: 'id-ID',
  en: 'en-US',
} as const satisfies Record<Locale, string>;

export function getDateFnsLocale(locale: string): DateFnsLocale {
  return dateFnsLocaleByLocale[locale as Locale] ?? dateFnsLocaleByLocale.id;
}

export function getIntlDateLocale(locale: string): string {
  return intlDateLocaleByLocale[locale as Locale] ?? intlDateLocaleByLocale.id;
}
