'use server'

import webpush from 'web-push'

// Setup VAPID
webpush.setVapidDetails(
  'mailto:your-email@example.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
)

// let subscription: webpush.PushSubscription | null = null
// {
//   endpoint: 'https://fcm.googleapis.com/fcm/send/c3c_0oM2P38:APA91bGc_Nn671pebBIjeQ8nQuq5XzbQyhzypFhy4xyLAUaY5gI4UFRweHyop9wCW_4cLuSPjDzzga0x72zJ88YzuoOjAc2n-7-nXQFipOtO0n-_VQ5DTG8ozYUh1LP4KeISrkPt-j8-',
//   expirationTime: null,
//   keys: {
//     p256dh: 'BDLbcT318Xa3wH8L0YZ6MdRP-os5YP9Rceeuftn5FM9qrQhV4x1N3Ewmh_QXjibjEMfInNLAbxCqM3xVjZ0tWJk',
//     auth: 'sz5Ihl0xXLVtKH3j4dmkYw'
//   }
// }

export async function subscribeUser(sub: webpush.PushSubscription) {
  // subscription = sub;
  await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/subscription/subscribe`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(sub),
  })
  console.log('User subscribed:', sub)
  return { success: true }
}

export async function unsubscribeUser() {
  // subscription = null
  return { success: true }
}

export async function sendNotification(message: string) {
  // send-notifications
  // NEXT_PUBLIC_API_BASE_URL
  try {
     await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/send-notification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    })
    return { success: true }
  } catch (error) {
    console.error('Error sending push notification:', error)
    return { success: false, error: 'Failed to send notification' }
  }
}
