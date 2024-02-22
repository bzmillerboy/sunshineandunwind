'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import Cookies from 'js-cookie'
import React from 'react'
import { useForm } from 'react-hook-form'
import useFormPersist from 'react-hook-form-persist'
import { GiBulldozer } from 'react-icons/gi'
import { HiWrenchScrewdriver } from 'react-icons/hi2'
import { MdCheckCircle } from 'react-icons/md'
import { MdOutlineCheckCircleOutline } from 'react-icons/md'
import { MdCheck } from 'react-icons/md'
import * as z from 'zod'

import AddressAutocompleteInput from '@/components/shared/AddressAutocompleteInput'
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
import { cn } from '@/lib/utils'

interface RequestDemoFormProps {
  successContent?: React.ReactNode
  headingContent?: React.ReactNode
  handleClose?: () => void
  modalMode?: boolean
}
const formSchema = z.object({
  firstName: z.string().min(1, 'Please enter your first name.'),
  lastName: z.string().min(1, 'Please enter your last name.'),
  email: z.string().email('Please enter a valid email address.'),
  phone: z.string().refine((val) => val.length === 14, {
    message: 'Please enter a valid phone number.',
  }),
  address: z.string().min(1, 'Enter your location address.'),
  city: z.string().min(1, 'Enter your city.'),
  state: z.string(),
  stateAbbr: z
    .string()
    .min(2)
    .refine(
      (val) =>
        [
          'AL',
          'AK',
          'AZ',
          'AR',
          'CA',
          'CO',
          'CT',
          'DE',
          'FL',
          'GA',
          'HI',
          'ID',
          'IL',
          'IN',
          'IA',
          'KS',
          'KY',
          'LA',
          'ME',
          'MD',
          'MA',
          'MI',
          'MN',
          'MS',
          'MO',
          'MT',
          'NE',
          'NV',
          'NH',
          'NJ',
          'NM',
          'NY',
          'NC',
          'ND',
          'OH',
          'OK',
          'OR',
          'PA',
          'RI',
          'SC',
          'SD',
          'TN',
          'TX',
          'UT',
          'VT',
          'VA',
          'WA',
          'WV',
          'WI',
          'WY',
        ].includes(val.toUpperCase()),
      {
        message: 'Enter a valid US state abbreviation.',
      },
    ),
  postalCode: z
    .string()
    .min(5, 'Enter a valid zip code.')
    .max(5, 'Enter a valid zip code.'),
  county: z.string(),
  placeId: z.string(),
  addressComponents: z.string(),
})

export default function RequestDemoForm({
  successContent,
  headingContent,
  handleClose,
  modalMode,
}: RequestDemoFormProps) {
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

  useFormPersist('demoRequestForm', {
    watch,
    setValue,
    ...(isBrowser && { storage: window.localStorage }),
    exclude: ['type'],
  })

  const updateBusinessAddress = (loc) => {
    if (loc) {
      setValue('address', loc.address, { shouldValidate: true })
      setValue('city', loc.city)
      setValue('stateAbbr', loc.stateAbbr)
      setValue('state', loc.state)
      setValue('postalCode', loc.postalCode)
      setValue('county', loc.county)
      setValue('placeId', loc.placeId)
      setValue('addressComponents', JSON.stringify(loc.addressComponents))
    }
  }

  async function onSubmit(data: z.infer<typeof formSchema>, event: any) {
    // console.log('onSubmit data:', data)
    event.preventDefault()
    // await new Promise((resolve) => setTimeout(resolve, 3000)) // 3-second timeout

    const requestDemoData = {
      url: location.href,
      contact: data,
    }

    await fetch(`/function/request-demo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        hutk: hutk,
        ...requestDemoData,
      }),
    })
      .then((res) => {
        if (res.ok) {
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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
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
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="col-span-2 space-y-0">
              <FormControl>
                {/* <input placeholder="enter address" {...field} /> */}
                <AddressAutocompleteInput
                  updateLocation={(loc) => updateBusinessAddress(loc)}
                  setAddressValue={(val) => setValue('address', val)}
                  label="Location Address"
                  field={field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormControl>
                <FloatingLabelInput
                  label="City"
                  placeholder="City"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stateAbbr"
          render={({ field }) => (
            <FormItem className="col-span-1 space-y-0">
              <FormControl>
                <FloatingLabelInput
                  label="State"
                  placeholder="State"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="postalCode"
          render={({ field }) => (
            <FormItem className="col-span-2 space-y-0">
              <FormControl>
                <FloatingLabelInput
                  label="Zip Code"
                  placeholder="Zip Code"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* The below fields are hidden from the UI but passed with the form. */}
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormControl>
                <input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="county"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormControl>
                <input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="placeId"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormControl>
                <input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="addressComponents"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormControl>
                <input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {errors.root && (
          <Alert variant="error" className="col-span-2">
            <MdOutlineCheckCircleOutline className="h-4 w-4" />
            <AlertDescription>{errors.root.message}</AlertDescription>
          </Alert>
        )}
        {isSubmitSuccessful && (
          <div className="col-span-2">
            <Alert variant="success">
              <MdOutlineCheckCircleOutline className="h-4 w-4" />
              <AlertDescription>
                Success. Your request has been submitted.
              </AlertDescription>
            </Alert>
          </div>
        )}
        <div className="col-span-2 text-right">
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? <Spinner className="m-0" /> : 'Submit Demo Request'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
