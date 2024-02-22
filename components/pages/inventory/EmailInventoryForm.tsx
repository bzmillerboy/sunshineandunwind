'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import useFormPersist from 'react-hook-form-persist'
import { MdOutlineCheckCircleOutline } from 'react-icons/md'
import * as z from 'zod'

import Spinner from '@/components/shared/Spinner'
import { H5, P } from '@/components/shared/Typography'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { FloatingLabelInput } from '@/components/ui/floatinglabel'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { currencyFormatter } from '@/lib/utils'
import { resolveHref, stringifyImages, urlForImage } from '@/sanity/lib/utils'

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
})

export default function EmailInventoryForm({ data }) {
  const {
    slug,
    equipmentMake,
    equipmentCategories,
    mainImage,
    imageGallery,
    videoURL,
    stockNumber,
    price,
    closeout,
    year,
    model,
    hoursCurrent,
  } = data ?? {}
  //   console.log('EmailInventoryForm data:', data)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
  const {
    watch,
    formState: { isSubmitting, isSubmitSuccessful, errors },
    setValue,
    setError,
    reset,
  } = form
  const isBrowser = typeof window !== 'undefined' && window

  useFormPersist('emailInventoryForm', {
    watch,
    setValue,
    ...(isBrowser && { storage: window.localStorage }),
  })

  async function resetForm() {
    await new Promise((resolve) => setTimeout(resolve, 8000))
    reset()
  }

  async function onSubmit(data: z.infer<typeof formSchema>, event: any) {
    event.preventDefault()
    const dataObj = {
      ...data,
      model: model,
      price: price && currencyFormatter(price),
      hoursCurrent: hoursCurrent || '',
      videoURL: videoURL,
      closeout: closeout,
      stockNumber: stockNumber,
      mainImage: urlForImage(mainImage)?.width(600).url() || '',
      slug: resolveHref('inventory', slug, '', equipmentCategories.slug),
      year: year,
      equipmentMakeTitle: equipmentMake.name,
      equipmentCategoriesTitle: equipmentCategories.title,
      imageGallery: stringifyImages(imageGallery?.images),
    }
    // console.log('dataObj:', dataObj)

    // await new Promise((resolve) => setTimeout(resolve, 3000)) // 3-second timeout

    await fetch(`/function/email-equipment-info`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(dataObj),
    })
      .then((res) => {
        if (res.ok) {
          resetForm()
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
      <div className="mt-12">
        <Card className="w-full bg-neutral-100">
          <CardHeader>
            <H5 className="mb-0">Email Photos and Info</H5>
            <P className="text-sm">
              Enter your email address and we&apos;ll send you details and high
              resolution photos.
            </P>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-1 gap-4 mb-4"
            >
              {!isSubmitSuccessful && (
                <>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="w-full space-y-1">
                        <FormControl>
                          <FloatingLabelInput
                            {...field}
                            label="Email"
                            placeholder="Enter your email address"
                            value={field.value ?? ''}
                            type="email"
                            autoCapitalize="none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    variant="outline"
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? (
                      <>
                        Sending...
                        <Spinner className="m-0 ml-2" />
                      </>
                    ) : (
                      `Send`
                    )}
                  </Button>
                </>
              )}
              {isSubmitSuccessful && (
                <Alert variant="success">
                  <MdOutlineCheckCircleOutline className="h-4 w-4" />
                  <AlertDescription>
                    Success, an email has been sent to you.
                  </AlertDescription>
                </Alert>
              )}
              {errors.root && (
                <Alert variant="error" className="border-success">
                  <MdOutlineCheckCircleOutline className="h-4 w-4" />
                  <AlertDescription>{errors.root.message}</AlertDescription>
                </Alert>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </Form>
  )
}
