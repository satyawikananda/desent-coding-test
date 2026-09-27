import { defineRouting } from 'next-intl/routing';

import { defaultLocale, locales } from '@/cfgs/i18n.cfg';

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'always',
  localeDetection: false,
});

export type Routing = typeof routing;
