import { notFound } from 'next/navigation';
import * as rootParams from 'next/root-params';
import { Formats, hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

import { routing } from '@/lib/i18n/routing';

export const formats = {
  dateTime: {
    short: {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    },
  },
  number: {
    precise: {
      maximumFractionDigits: 5,
    },
  },
  list: {
    enumeration: {
      style: 'long',
      type: 'conjunction',
    },
  },
  displayName: {
    region: {
      type: 'region',
    },
  },
} satisfies Formats;

export default getRequestConfig(async () => {
  // The `[locale]` segment is a Next.js root param, so it can be read here
  // without threading `params` through every layout and page.
  const requested = await rootParams.locale();

  if (!hasLocale(routing.locales, requested)) {
    notFound();
  }

  return {
    locale: requested,
    formats,
    messages: (await import(`@/messages/${requested}.json`)).default,
  };
});
