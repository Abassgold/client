
import { Button } from '@/components/ui copy/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui copy/Card';
import { Input } from '@/components/ui copy/Input';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import React, { useEffect, useState } from 'react'
import axios, { AxiosError } from 'axios';
import { getToken } from '@/lib/Token';
import { toast } from 'sonner';
import { Check, X } from 'lucide-react';
import { Toaster } from '@/components/ui/sonner';
interface changePin {
  currentPin: string;
  newPin: string;
  confirmPin: string;
}
interface fetchResponse {
  ok: boolean;
  msg?: string
}
const TransactionPin = () => {
  const [hasPin, setHasPin] = useState(false)
  const [show, setShow] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const formik = useFormik<changePin>({
    initialValues: {
      currentPin: '',
      newPin: '',
      confirmPin: ''
    },
    validationSchema: Yup.object({
      currentPin: Yup.string()
        .max(4, 'Current PIN must be 4 digits')
        .matches(/^\d+$/, 'Current PIN must contain only numbers')
        .notRequired(),
      newPin: Yup.string()
        .matches(/^[0-9]+$/, 'PIN must contain only numbers')
        .min(4, 'PIN must be 4 digits')
        .max(9, 'PIN must be 4 digits')
        .required(),

      confirmPin: Yup.string()
        .test('no-spaces', 'Spaces are not allowed', (value) => !/\s/.test(value || ''))
        .min(4, 'PIN must be 4 digits')
        .max(9, 'PIN must be 4 digits')
        .oneOf([Yup.ref('newPin')], 'Pin must match'),

    }),
    onSubmit: async (values: changePin) => {

      setLoading(true)
      try {
        const response = await axios.post<fetchResponse>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/updatePin`, values, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json"
          }
        })

        setShow(false)
        toast.success(response.data.msg)
        return toast.success(response.data.msg);
      } catch (error) {
        const err = error as AxiosError;
        const errorResponse = err.response?.data as fetchResponse;
        console.error(err.message)
        toast.error(errorResponse.msg ?? 'Failed to fetch')
      } finally {
        setLoading(false)
      }
    }
  })
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await axios.get<fetchResponse>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/has-pin`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json"
          }
        }
        )
        if (res.data.ok) return setHasPin(true);
      } catch (error) {
        console.log(error)
        toast.error('Something went wrong')
      }
    }
    fetchInfo()
  }, [])
  return (
    <Card>
      <Toaster
        position='top-center'
        richColors
        duration={3000}
      />
      <CardHeader>
        <CardTitle>Transaction PIN</CardTitle>
        <CardDescription>Update your transaction PIN for secure payments.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          {hasPin && <Input
            label="Current Pin"
            type="tel"
            disabled={!show}
            placeholder="Enter"
            fullWidth
            required
            minLength={4}
            maxLength={4}
            name="currentPin"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />}

          <Input
            label="New PIN"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="tel" disabled={!show} placeholder="Enter 4-digit PIN"
            fullWidth
            required
            minLength={4}
            maxLength={4}
            name="newPin"
            error={
              formik.touched.newPin && formik.errors.newPin
                ? formik.errors.newPin
                : undefined
            }
          />
          <Input
            error={
              formik.touched.confirmPin && formik.errors.confirmPin
                ? formik.errors.confirmPin
                : undefined
            }
            minLength={4}
            maxLength={4}
            name='confirmPin'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="tel" disabled={!show} placeholder="Re-enter 4-digit PIN"
            label="Confirm Pin"
            fullWidth
          />
          {!show && <div className="text-center"><Button type='button' onClick={() => setShow(true)}>Edit</Button></div>}
          {show && (
            <div className="flex justify-center items-center gap-2">
              <Button type='button' onClick={() => setShow(false)}>Cancel <X size={16} /></Button>
              <Button disabled={loading} type='submit'>
                {loading ? "Saving..." : <>Save <Check size={16} /></>}
              </Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}

export default TransactionPin;