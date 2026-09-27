/* eslint-disable @typescript-eslint/no-explicit-any */
// Custom type for i18n translations, based on the structure of our messages and next-intl's useTranslations hook.

import messages from '@/messages/en.json';

type Messages = typeof messages;

type Path<T> = T extends string
  ? never
  : {
      [K in keyof T & string]: T[K] extends string
        ? `${K}`
        : `${K}` | `${K}.${Path<T[K]>}`;
    }[keyof T & string];

// Only paths that point to an object (valid namespaces)
type ObjectPath<T> = T extends string
  ? never
  : {
      [K in keyof T & string]: T[K] extends string
        ? never
        : `${K}` | `${K}.${ObjectPath<T[K]>}`;
    }[keyof T & string];

export type MessagesNamespaces = keyof Messages & string;
export type MessagesNamespacesDeep = ObjectPath<Messages>;
export type NamespaceKey<N extends MessagesNamespacesDeep> = Path<
  NestedValue<Messages, N>
>;
export type RootMessageKey = Path<Messages>;
export type TranslatorMethods<K extends string> = {
  rich: (key: K | (string & {}), ...args: any[]) => any;
  raw: (key: K | (string & {})) => any;
  has: (key: K | (string & {})) => boolean;
  markup: (key: K | (string & {}), ...args: any[]) => string;
};

// Helper to resolve nested object by dot path
type NestedValue<T, P extends string> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? NestedValue<T[K], Rest>
    : never
  : P extends keyof T
    ? T[P]
    : never;
