import { Command as CommandPrimitive } from 'cmdk'
import * as React from 'react'

import { CommandInput } from '@/components/ui/command'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
export interface FloatingLabelInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  placeholder: string
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}

const FloatingLabelInput = React.forwardRef<
  HTMLInputElement,
  FloatingLabelInputProps
>(({ className, type, label, placeholder, inputProps, ...props }, ref) => {
  // console.log('FloatingLabelInput:', label, props)

  return (
    <div className={cn('relative', className)}>
      <Input
        id={props.id}
        type={type || 'text'}
        className="block z-20 h-12 px-3.5 pb-1.5 pt-5 w-full text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary focus-visible:shadow-none peer placeholder:text-transparent focus:placeholder-gray-300 dark:focus:placeholder-gray-300 bg-white"
        placeholder={placeholder}
        ref={ref}
        {...inputProps}
        {...props}
      />
      <label
        htmlFor={props.id}
        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-1.5 scale-75 top-2 z-10 origin-[0] bg-transparent dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
      >
        {label}
      </label>
    </div>
  )
})
FloatingLabelInput.displayName = 'FloatingLabelInput'

export interface FloatingLabelSelectProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  children: React.ReactNode
  field: any
  onValueChange?: (value: string) => void
}

const FloatingLabelSelect = React.forwardRef<
  HTMLInputElement,
  FloatingLabelSelectProps
>(({ className, label, children, field, ...props }, ref) => {
  return (
    <div className={cn('relative bg-white rounded-lg', className)}>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <SelectTrigger
          id={props.id}
          className="h-12 px-3.5 pb-1.5 pt-5 w-full text-gray-900 relative z-20 bg-transparent rounded-lg border border-gray-300 [&>svg]:-translate-y-1.5 dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer placeholder:text-transparent focus:placeholder-gray-300 dark:focus:placeholder-gray-300"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>{children}</SelectContent>
      </Select>
      <label
        htmlFor={props.id}
        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-1.5 scale-75 top-2 z-10 origin-[0] bg-transparent dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-data-[placeholder]:scale-100 peer-data-[placeholder]:-translate-y-1/2 peer-data-[placeholder]:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
      >
        {label}
      </label>
    </div>
  )
})
FloatingLabelSelect.displayName = 'FloatingLabelSelect'

type CommandFloatingLabelInputProps = React.ComponentPropsWithoutRef<
  typeof CommandPrimitive.Input
> & { label?: string }

const CommandFloatingLabelInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  CommandFloatingLabelInputProps
>(({ className, label, ...props }, ref) => {
  // console.log('CommandFloatingLabelInput:', label, props, ref)
  return (
    <div className="relative" cmdk-input-wrapper="">
      <CommandPrimitive.Input
        ref={ref}
        className={cn(
          'block px-3.5 pb-1.5 pt-5 w-full z-20 relative text-gray-900 rounded-lg border border-gray-300 ring-offset-background appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 peer placeholder-transparent focus:placeholder-gray-300 dark:focus:placeholder-gray-300 bg-transparent',
          className,
        )}
        {...props}
        id={props.id}
      />
      <label
        htmlFor={props.id}
        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-1.5 scale-75 top-2 z-10 origin-[0] bg-transparent dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
      >
        {label}
      </label>
    </div>
  )
})

CommandFloatingLabelInput.displayName = CommandPrimitive.Input.displayName

export { CommandFloatingLabelInput, FloatingLabelInput, FloatingLabelSelect }
