import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'FloZap',
    short_name: 'FloZap',
    description:
      'FloZap makes it easy to buy airtime, data, pay bills, get virtual numbers, and manage transactions all in one app.',
    start_url: '/',
    display: 'standalone',
    background_color: '#115e59', // teal splash background
    theme_color: '#115e59', // teal for status bar / browser UI
    icons: [
      {
        src: '/logo.svg',
        sizes: '192x192',
         type: 'image/svg+xml',
         purpose: 'maskable',
      },
      {
        src: '/logo.svg',
        sizes: '512x512',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
    ],
    screenshots: [
      {
         src: '/myflozap_logo.png',
    sizes: '632x394', // match the actual file size
    type: 'image/png',
        form_factor: 'narrow', // mobile
      },
      {
 src: '/myflozap_logo.png',
    sizes: '632x394', // match the actual file size
    type: 'image/png',
        form_factor: 'wide', // desktop
      },
    ],
  }
}
