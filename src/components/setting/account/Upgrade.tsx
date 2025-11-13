import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui copy/Card'
import { Input } from '@/components/ui copy/Input'
import Link from 'next/link'
import React from 'react'

const Upgrade = () => {
  return (
  <Card>
                <CardHeader>
                    <div className='flex items-center gap-2 p-4'>
                        <CardTitle><Link href='/user/account' className="focus:underline focus:underline-offset-2">Profile</Link></CardTitle>
                        <CardTitle><Link href='/user/account/security' className="focus:underline focus:underline-offset-2">Security</Link></CardTitle>
                    </div>

                    <CardDescription>Your Profile</CardDescription>
                </CardHeader>
                 <CardContent>
            <form className="space-y-4" >
                <Input label="Full Name" type="text" disabled placeholder='' fullWidth />
                <Input disabled label="Email Address" type="text" fullWidth placeholder='' />
            </form>
        </CardContent>

            </Card>
  )
}

export default Upgrade