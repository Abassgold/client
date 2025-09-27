import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'FloZap',
    short_name: 'FloZap',
    description:
      'FloZap is your all-in-one digital services app for airtime, data, TV subscriptions, exam result checks, virtual numbers, eSIMs, and bill payments.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#115E59', 
    icons: [
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icons/icon-maskable-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-maskable-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
