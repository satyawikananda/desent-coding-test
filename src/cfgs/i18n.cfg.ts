export const locales = ['id', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'id';

export const localeNames: Record<Locale, string> = {
  id: 'Bahasa Indonesia',
  en: 'English',
};

export const localeHtmlLang: Record<Locale, string> = {
  id: 'id-ID',
  en: 'en-US',
};

export const LOCALE_COOKIE_NAME = 'MAGER_LOCALE';
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year
