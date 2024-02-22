'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { MdOutlineCheckCircleOutline } from 'react-icons/md'
import * as z from 'zod'

import Spinner from '@/components/shared/Spinner'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
  email: z.string().email(),
})

interface EmailSubscribeProps {
  formId?: string
}

export default function EmailSubscribe({ formId }: EmailSubscribeProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })
  const {
    formState: { isSubmitting, isSubmitSuccessful, errors },
    setError,
  } = form
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const emailData = {
      formId: formId,
      ...values,
    }
    try {
      // await new Promise((resolve) => setTimeout(resolve, 3000)) // 3-second timeout
      const response = await fetch('/function/email-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData),
      })
      if (!response.ok) {
        throw new Error(
          `Error. There was an unexpected error. Please try again.`,
        )
      }
    } catch (err) {
      console.log(err)
      setError('root', {
        message: 'Error. There was an unexpected error. Please try again.',
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mb-4">
        <div className="flex items-start space-x-2">
          <FormField
            control={form.control}
            name="email"
            disabled={isSubmitting}
            render={({ field }) => (
              <FormItem className="flex-auto">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Email"
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
            variant="secondary"
            size="icon"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Spinner className="m-0" />
            ) : (
              <MdKeyboardArrowRight className="m-0" />
            )}
          </Button>
        </div>
      </form>
      {isSubmitSuccessful && (
        <Alert variant="success">
          <MdOutlineCheckCircleOutline className="h-4 w-4" />
          <AlertDescription>
            Success. You are now subscribed to our newsletter.
          </AlertDescription>
        </Alert>
      )}
      {errors.root && (
        <Alert variant="error">
          <MdOutlineCheckCircleOutline className="h-4 w-4" />
          <AlertDescription>{errors.root.message}</AlertDescription>
        </Alert>
      )}
    </Form>
  )
}
