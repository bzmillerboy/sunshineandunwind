'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import Cookies from 'js-cookie'
import { useForm } from 'react-hook-form'
import useFormPersist from 'react-hook-form-persist'
import { GiBulldozer } from 'react-icons/gi'
import { HiWrenchScrewdriver } from 'react-icons/hi2'
import { MdCheckCircle } from 'react-icons/md'
import { MdOutlineCheckCircleOutline } from 'react-icons/md'
import * as z from 'zod'

import Spinner from '@/components/shared/Spinner'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { FloatingLabelInput } from '@/components/ui/floatinglabel'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { normalizePhoneNumber } from '@/lib/utils'

interface FinancingApplicationProps {
  activeStep?: number
  steps?: any
  handleBack?: any
  handleNext?: any
}
const formSchema = z.object({
  firstName: z.string().min(1, 'Please enter your first name.'),
  lastName: z.string().min(1, 'Please enter your last name.'),
  email: z.string().email('Please enter a valid email address.'),
  phone: z.string().refine((val) => val.length === 14, {
    message: 'Please enter a valid phone number.',
  }),
  type: z.string().refine((val) => val === '1' || val === '2', {
    message: 'Please select a type.',
  }),
})
export default function RequestFinancingFormStep1({
  activeStep,
  steps,
  handleBack,
  handleNext,
}: FinancingApplicationProps) {
  // console.log('RequestFinancingFormStep1 value:', value)
  const isBrowser = typeof window !== 'undefined' && window
  const hutk = isBrowser ? Cookies.get('hubspotutk') : null
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
  const {
    register,
    watch,
    formState: { isSubmitting, isSubmitSuccessful, errors },
    setValue,
    setError,
  } = form

  useFormPersist('requestForm', {
    watch,
    setValue,
    ...(isBrowser && { storage: window.localStorage }),
    exclude: ['type'],
  })

  async function onSubmit(data: z.infer<typeof formSchema>, event: any) {
    // console.log('onSubmit data:', data)
    event.preventDefault()
    // await new Promise((resolve) => setTimeout(resolve, 3000)) // 3-second timeout
    await fetch(`/function/request-demo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        hutk: hutk,
        ...data,
      }),
    })
      .then((res) => {
        if (res.ok) {
          handleNext()

          return
        }
        throw new Error('Error in the API, status: ' + res.status)
      })
      .catch((error) => {
        console.log('error:', error)
        setError('root', {
          message: 'Error. There was an unexpected error. Please try again.',
        })
      })
  }

  const typeValue = watch('type')

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4 mb-4"
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="w-full space-y-0">
              <FormControl>
                <FloatingLabelInput
                  label="First Name"
                  placeholder="Enter your first name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="w-full space-y-0">
              <FormControl>
                <FloatingLabelInput
                  label="Last Name"
                  placeholder="Enter your last name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full space-y-0">
              <FormControl>
                <FloatingLabelInput
                  {...field}
                  label="Email"
                  placeholder="Enter your email address"
                  type="email"
                  autoCapitalize="none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="w-full space-y-0">
              <FormControl>
                <FloatingLabelInput
                  label="Phone Number"
                  placeholder="Enter your phone number"
                  inputProps={{
                    maxLength: 14,
                    minLength: 14,
                  }}
                  {...field}
                  onChange={(e) => {
                    field.onChange(normalizePhoneNumber(e.target.value))
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="col-span-2">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="grid grid-cols-2 gap-2 space-y-0">
                <FormControl>
                  <div>
                    <input
                      {...register('type')}
                      type="radio"
                      id="1"
                      value="1"
                      className="hidden peer"
                    />
                    <label
                      htmlFor="1"
                      className="group inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-neutral-500 peer-checked:border-neutral-600 peer-checked:text-neutral-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                      <div className="block">
                        <div className="w-full text-lg font-semibold">
                          Equipment Financing
                        </div>
                        <div className="w-full">
                          Select this option if you are applying for a
                          loan/lease to purchase equipment.
                        </div>
                      </div>
                      {typeValue === '1' ? (
                        <MdCheckCircle className="w-16 h-16 text-green-600" />
                      ) : (
                        <GiBulldozer className="w-16 h-16" />
                      )}
                    </label>
                  </div>
                </FormControl>
                <FormControl>
                  <div>
                    <input
                      {...register('type')}
                      type="radio"
                      id="2"
                      value="2"
                      className="hidden peer"
                    />
                    <label
                      htmlFor="2"
                      className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-neutral-500 peer-checked:border-neutral-600 peer-checked:text-neutral-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                      <div className="block">
                        <div className="w-full text-lg font-semibold">
                          Rentals, Parts, & Service
                        </div>
                        <div className="w-full">
                          Select this option if you are applying for a credit
                          line account.
                        </div>
                      </div>
                      {typeValue === '2' ? (
                        <MdCheckCircle className="w-14 h-14 text-green-600" />
                      ) : (
                        <HiWrenchScrewdriver className="w-10 h-10" />
                      )}
                    </label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {errors.root && (
          <Alert variant="error" className="col-span-2">
            <MdOutlineCheckCircleOutline className="h-4 w-4" />
            <AlertDescription>{errors.root.message}</AlertDescription>
          </Alert>
        )}
        <div className="col-span-2 text-right">
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? <Spinner className="m-0" /> : 'Submit'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
