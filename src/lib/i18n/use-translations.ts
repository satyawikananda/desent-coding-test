/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTranslations as useNextIntlTranslations } from 'next-intl';

import type {
  MessagesNamespacesDeep,
  NamespaceKey,
  RootMessageKey,
  TranslatorMethods,
} from '@/lib/i18n/i18n.type';

/**
 * Typed wrapper around next-intl's `useTranslations`.
 *
 * Deliberately NOT a `'use client'` module and deliberately hook-free: it is a
 * straight passthrough that only adds key typing. next-intl resolves
 * `useTranslations` per environment through its `react-server` export
 * condition, so this works unchanged in both Server and Client Components.
 * Adding `useCallback` here (or a `'use client'` directive) would break every
 * Server Component that calls it.
 */
export function useTranslations<N extends MessagesNamespacesDeep>(
  namespace: N,
): {
  (key: string & {}, ...args: any[]): string;
  <K extends NamespaceKey<N>>(key: K, ...args: any[]): string;
} & TranslatorMethods<NamespaceKey<N>>;

export function useTranslations(): {
  (key: string & {}, ...args: any[]): string;
  <K extends RootMessageKey>(key: K, ...args: any[]): string;
} & TranslatorMethods<RootMessageKey>;

export function useTranslations<N extends MessagesNamespacesDeep>(
  namespace?: N,
) {
  return useNextIntlTranslations(namespace as any) as any;
}
