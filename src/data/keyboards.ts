import type { Item } from './items.type';

export const keyboards: Item[] = [
  {
    id: 8,
    name: 'Logitech MX Keyboard',
    slug: 'logitech-mx-keyboard',
    description: 'The Logitech MX Keys is a high-performance wireless keyboard featuring a full-size layout with a Numpad and arrow keys, ideal for professionals. Its Easy-Switch™ keys allow seamless operation across up to three computers, boasting a reliable wireless range of up to 10 meters, even in congested environments. Compatible with a wide range of operating systems including Windows®, macOS, Linux®, Chrome OS, iPadOS, and Android, it offers versatility for any setup. With up to 5 months of battery life, the MX Keys combines convenience, durability, and advanced functionality for an optimized typing experience. Ensuring your laptop or PC can connect via Bluetooth will allow you a seamless connection setup with the Logitech MX Keys.\n\n**NOTE:** If you rent a Mac Studio or Mac Mini, we strongly recommend choosing an Apple Magic Keyboard to avoid any connectivity issues during setup. The Logitech MX Keyboard will be shipped without a USB pairing dongle (Logi Bolt Receiver).',
    short_description: 'Up to 10 meters wireless range, Easy-Switch™ keys to work on up to 3 computers, supported by all operating systems, up to 5-month battery live.',
    weekly_price: 7,
    monthly_price: 28,
    weekly_price_over_one_month: 7,
    image: '/images/items/keyboard/logitech-mx-keyboard/image-1.jpg',
  },
  {
    id: 32,
    name: 'Apple Magic Keyboard',
    slug: 'apple-magic-keyboard',
    description: 'The Apple Magic Keyboard with Touch ID offers a sleek, wireless typing experience with the added convenience of secure fingerprint recognition. Designed for Mac users, it seamlessly integrates with macOS, allowing for fast user switching and authentication without compromising on comfort or accuracy. Its compact, minimalist design not only complements your workspace but also ensures portability and ease of use. With a stable scissor mechanism beneath each key and optimized key travel, it delivers a remarkably comfortable and precise typing experience. The Magic Keyboard with Touch ID is not just a tool but an extension of your Mac, enhancing productivity and security with style.',
    short_description: 'Touch ID, numeric keypad, wireless connection, Apple silicon, lightning port.',
    weekly_price: 12,
    monthly_price: 32,
    weekly_price_over_one_month: 8,
    image: '/images/items/keyboard/apple-magic-keyboard/image-1.jpg',
  },
];
