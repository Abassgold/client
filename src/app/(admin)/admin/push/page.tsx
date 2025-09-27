'use client'
import { sendNotification } from '@/app/actions'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from 'react'
import { PushNotificationManagerPage } from '@/components/PushNotification'

const Page = () => {
  const [message, setMessage] = useState('')

  return (
    <>
    <PushNotificationManagerPage/>
    <form 
      action={async (formData: FormData) => {
        const msg = formData.get('message') as string
        await sendNotification(msg);
      }}
      className="max-w-md mx-auto p-4 border rounded mt-10"
    >
      <Label htmlFor="message">Message</Label>
      <Input
        type="text"
        name="message"
        id="message"
        placeholder="Enter your message"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        className="mb-4"
      />
      <Button type="submit" className='bg-blue-500 cursor-pointer text-white py-2 px-4 rounded'>Send Notification</Button>
    </form>
    </>
    
  )
}

export default Page
