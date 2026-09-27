'use client';

import { useRouter as useBProgressRouter } from '@bprogress/next';
import { createNavigation } from 'next-intl/navigation';

import { routing } from './routing';

const {
  Link,
  redirect,
  usePathname,
  useRouter: useIntlRouter,
  getPathname,
} = createNavigation(routing);

export { Link, redirect, usePathname, getPathname };

export function useRouter() {
  const intlRouter = useIntlRouter();
  return useBProgressRouter({ customRouter: () => intlRouter });
}
