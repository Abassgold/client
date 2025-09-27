'use client'

import { useState, useEffect } from 'react'
import {  subscribeUser, unsubscribeUser } from '@/app/actions'

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

function PushNotificationManager() {
  const [isSupported, setIsSupported] = useState(false)
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null
  )

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true)
      registerServiceWorker()
    }
  }, [])

  async function registerServiceWorker() {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
      updateViaCache: 'none',
    })
    const sub = await registration.pushManager.getSubscription()
    setSubscription(sub)
  }

  async function subscribeToPush() {
    const registration = await navigator.serviceWorker.ready
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
      ),
    })
    setSubscription(sub)
    const serializedSub = JSON.parse(JSON.stringify(sub))
    await subscribeUser(serializedSub)
  }

  async function unsubscribeFromPush() {
    await subscription?.unsubscribe()
    setSubscription(null)
    await unsubscribeUser()
  }

  // async function sendTestNotification() {
  //   if (subscription) {
  //     await sendNotification(message)
  //     setMessage('')
  //   }
  // }

  if (!isSupported) {
    return <p>Push notifications are not supported in this browser.</p>
  }
  return (
    <div>
      <h3>Push Notifications</h3>
      {subscription ? (
        <>
          <p>You are subscribed to push notifications.</p>
          <button onClick={unsubscribeFromPush} className='bg-red-500 cursor-pointer text-white py-2 px-4 rounded'>Unsubscribe</button>
        </>
      ) : (
        <>
          <p>You are not subscribed to push notifications.</p>
          <button onClick={subscribeToPush} className='bg-blue-500 cursor-pointer text-white py-2 px-4 rounded'>Subscribe</button>
        </>
      )}

    </div>
  )
}

function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setIsIOS(
  /iPad|iPhone|iPod/.test(navigator.userAgent) &&
  !('MSStream' in window)
);
    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);

    const alreadyShown = sessionStorage.getItem("iosInstallPromptShown");
    if (!alreadyShown) {
      sessionStorage.setItem("iosInstallPromptShown", "false");
    }

    if (alreadyShown === "false") {
      setShowModal(true);
    }
  }, []);

  const triggerModal = () => {
    setShowModal(false);
    sessionStorage.setItem("iosInstallPromptShown", "true");
  };

  if (isStandalone) return null;

  if (isIOS && showModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
        <div className="max-w-md mx-auto p-6 rounded-2xl shadow-2xl bg-white border border-teal-200">
          <h2 className="text-lg font-bold text-teal-900 mb-3 text-center">
            📲 Install FloZap on iOS
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed text-center">
            To install this app on your iPhone or iPad, tap the{" "}
            <span className="font-medium text-teal-900">Share</span> button{" "}
            <span role="img" aria-label="share icon"> ⎋ </span> then select{" "}
            <span className="font-medium text-teal-900">Add to Home Screen</span>{" "}
            <span role="img" aria-label="plus icon"> ➕ </span>.
          </p>
          <button
            onClick={triggerModal}
            className="mt-5 w-full bg-teal-900 cursor-pointer hover:bg-teal-800 text-white text-sm font-medium py-3 px-4 rounded-lg transition">
            Got it 👍
          </button>
        </div>
      </div>
    );
  }

  return null;
}


export const InstallPromptPage = () => <InstallPrompt />
export const PushNotificationManagerPage = () => <PushNotificationManager />