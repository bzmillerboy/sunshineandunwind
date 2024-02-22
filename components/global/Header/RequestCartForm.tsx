'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import useFormPersist from 'react-hook-form-persist'
import * as z from 'zod'

import AddressAutocompleteInput from '@/components/shared/AddressAutocompleteInput'
import Spinner from '@/components/shared/Spinner'
import { H6 } from '@/components/shared/Typography'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  FloatingLabelInput,
  FloatingLabelSelect,
} from '@/components/ui/floatinglabel'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { SelectItem } from '@/components/ui/select'
import { normalizePhoneNumber } from '@/lib/utils'
import { useRequestCartStore } from '@/store/useRequestCartStore'

export default function RequestCartForm({
  cartTitle,
  setCartStep,
  cartStep,
  cartType,
  cartItems,
}) {
  // console.log('RequestCartForm cartItems:', cartItems)

  const formSchema = z.object({
    firstName: z.string().min(1, 'Enter your first name.'),
    lastName: z.string().min(1, 'Enter your last name.'),
    email: z.string().email('Enter a valid email address.'),
    phone: z.string().refine((val) => val.length === 14, {
      message: 'Enter a valid phone number.',
    }),
    address: z.string().min(1, 'Enter your business address.'),
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
    wantDelivery: z.boolean().optional(),
    location: z.string().optional(),
    locationCity: z.string().optional(),
    locationStateAbbr: z
      .string()
      .optional()
      .refine((val) => {
        if (val) {
          return (
            ['AL', 'WY'].includes(val?.toUpperCase() ?? ''),
            {
              message: 'Enter a valid US state abbreviation.',
            }
          )
        }
        return true
      }),

    locationPostalCode: z
      .string()
      .optional()
      .refine(() => {
        return cartType === 'rental'
          ? z
              .string()
              .min(5, 'Enter a valid zip code.')
              .max(5, 'Enter a valid zip code.')
          : true
      }),
    startDate: z
      .string()
      .optional()
      .refine((val) => {
        if (cartType === 'rental') {
          const selectedDate = new Date(val ?? '')
          const currentDate = new Date()
          return selectedDate >= currentDate
        }
        return true
      }, 'Enter a valid future date.'),
    duration: z
      .string()
      .optional()
      .refine((val) => {
        return cartType === 'rental' ? val?.length ?? 0 >= 1 : true
      }, 'Select a duration.'),
    consent: z
      .boolean()
      .optional()
      .refine((val) => {
        return cartType !== 'rental' || val === true
      }, 'You must accept the availability agreement.'),
  })

  const clearCart = useRequestCartStore((state) => state.clearCart)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
  const {
    watch,
    formState: { isSubmitting, isSubmitSuccessful, errors },
    setError,
    setValue,
  } = form

  const isBrowser = typeof window !== 'undefined' && window
  useFormPersist('requestForm', {
    watch,
    setValue,
    ...(isBrowser && { storage: window.localStorage }),
    exclude: ['startDate', 'duration', 'consent', 'delivery'],
  })

  if (errors && Object.keys(errors).length > 0) {
    console.log('errors:', errors)
  }
  // watch all fields
  // console.log('watch:', watch())

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

  const updateLocationAddress = (loc) => {
    if (loc) {
      setValue('location', loc.address, { shouldValidate: true })
      setValue('locationCity', loc.city)
      setValue('locationStateAbbr', loc.stateAbbr)
      setValue('locationPostalCode', loc.postalCode)
    }
  }

  async function onSubmit(data: z.infer<typeof formSchema>, event: any) {
    // console.log('onSubmit data:', data)
    event.preventDefault()
    // await new Promise((resolve) => setTimeout(resolve, 3000)) // 3-second timeout

    const requestData = {
      cart: cartItems,
      cartType: cartType,
      contact: data,
    }
    // console.log('onSubmit requestData:', requestData)

    await fetch(`/function/request-notification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(requestData),
    })
      .then(async (res) => {
        // console.log('onSubmit res:', res)

        if (res.ok) {
          // Proceed to next step in cart
          setCartStep(cartStep + 1)
          clearCart && clearCart(cartType)
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
    <div>
      <H6>Contact Info</H6>
      <div className="space-y-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-6 gap-4 mb-4"
          >
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="col-span-3 space-y-0">
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
                <FormItem className="col-span-3 space-y-0">
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
                <FormItem className="col-span-3 space-y-0">
                  <FormControl>
                    <FloatingLabelInput
                      {...field}
                      label="Email"
                      placeholder="Enter your email address"
                      type="email"
                      autoCapitalize="none"
                      onChange={(e) => {
                        field.onChange(e.target.value.toLowerCase())
                      }}
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
                <FormItem className="col-span-3 space-y-0">
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
                <FormItem className="col-span-6 space-y-0">
                  <FormControl>
                    {/* <input placeholder="enter address" {...field} /> */}
                    <AddressAutocompleteInput
                      updateLocation={(loc) => updateBusinessAddress(loc)}
                      setAddressValue={(val) => setValue('address', val)}
                      label="Business Address"
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
                <FormItem className="col-span-3 space-y-0">
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
            {cartType === 'rental' && (
              <>
                <H6 className="col-span-6 mb-0">Jobsite Info</H6>
                <FormField
                  control={form.control}
                  name="wantDelivery"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 col-span-6">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>I want delivery</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem className="col-span-6 space-y-0">
                      <FormControl>
                        <AddressAutocompleteInput
                          updateLocation={(loc) => updateLocationAddress(loc)}
                          setAddressValue={(val) => setValue('location', val)}
                          label="Jobsite Address"
                          field={field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="locationCity"
                  render={({ field }) => (
                    <FormItem className="col-span-3 space-y-0">
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
                  name="locationStateAbbr"
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
                  name="locationPostalCode"
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
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="col-span-6 space-y-0">
                      <FormControl>
                        <FloatingLabelInput
                          label="Start Date"
                          placeholder="Date of rental start"
                          {...field}
                          type={'date'}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem className="col-span-6 space-y-0">
                      <FormControl>
                        <FloatingLabelSelect
                          label="Rental Duration"
                          field={field}
                        >
                          <SelectItem value="1 week">
                            1 week *only available on certain models
                          </SelectItem>
                          <SelectItem value="2-4 weeks">2-4 weeks</SelectItem>
                          <SelectItem value="1-2 months">1-2 months</SelectItem>
                          <SelectItem value="2-6 months">2-6 months</SelectItem>
                          <SelectItem value="6-12 months">
                            6-12 months
                          </SelectItem>
                          <SelectItem value="1 year or longer">
                            1 year or longer
                          </SelectItem>
                        </FloatingLabelSelect>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="consent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 col-span-6">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Accept Availability Agreement</FormLabel>
                        <FormDescription>
                          I understand that this request is not a guarantee of
                          rental agreement and is subject to inventory
                          availability. I will be contacted by a representative
                          with information including inventory, credit
                          application and a rental agreement form.
                        </FormDescription>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </>
            )}

            <div className="flex justify-between items-center mt-4 col-span-6">
              <Button
                className=""
                variant="outline"
                onClick={() => setCartStep(cartStep - 1)}
              >
                Back
              </Button>
              <Button type="submit" variant="primary" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    Submitting Request
                    <Spinner className="m-0 ml-2" />
                  </>
                ) : (
                  `Submit ${cartTitle} Request`
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
