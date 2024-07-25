import { cn } from '@/lib/utils'

const baseHeadingClasses =
  'scroll-m-20 font-extrabold tracking-widest text-foreground font-serif'
const baseParagraphClasses =
  'text-lg font-weight-400 [&:not(:last-child)]:mb-4 [&:not(:only-child)]:mb-4 text-foreground'

export function P({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <p
      className={cn(
        `${baseParagraphClasses} group-[.footer]:text-zinc-500 ${className}`,
      )}
    >
      {children}
    </p>
  )
}

export function H1({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <h1
      className={cn(
        `${baseHeadingClasses} md:text-4xl lg:text-6xl mb-3 ${className}`,
      )}
    >
      {children}
    </h1>
  )
}
export function H2({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <h2
      className={cn(
        `${baseHeadingClasses} text-3xl lg:text-5xl mb-3 ${className}`,
      )}
    >
      {children}
    </h2>
  )
}
export function H3({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <h3
      className={cn(
        `${baseHeadingClasses} text-xl lg:text-4xl mb-3 ${className}`,
      )}
    >
      {children}
    </h3>
  )
}
export function H4({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <h4
      className={cn(
        `${baseHeadingClasses} text-xl lg:text-3xl mb-3 ${className}`,
      )}
    >
      {children}
    </h4>
  )
}
export function H5({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <h5
      className={cn(
        `${baseHeadingClasses} text-lg lg:text-xl mb-3 ${className}`,
      )}
    >
      {children}
    </h5>
  )
}
export function H6({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <h6
      className={cn(
        `${baseHeadingClasses} text-sm lg:text-xl mb-3 ${className}`,
      )}
    >
      {children}
    </h6>
  )
}
export function Blockquote({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <blockquote
      className={cn(
        `max-w-3xl my-6 border-l-2 pl-6 italic font-serif text-xl text-gray-600 ${className}`,
      )}
    >
      {children}
    </blockquote>
  )
}

export function Lead({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <p
      className={cn(
        `text-xl text-muted-foreground font-thin leading-6 mb-5 lg:text-xl lg:leading-7 ${className}`,
      )}
    >
      {children}
    </p>
  )
}

export function Label({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <p
      className={cn(
        `text-sm text-muted-foreground leading-6 mb-0 lg:leading-7 uppercase font-medium tracking-wider ${className}`,
      )}
    >
      {children}
    </p>
  )
}

export function GrayBackground({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        `${baseParagraphClasses} bg-gray-100 p-4 rounded-md inline-block ${className}`,
      )}
    >
      {children}
    </span>
  )
}

export function Muted({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        `${baseParagraphClasses} text-sm text-muted-foreground ${className}`,
      )}
    >
      {children}
    </span>
  )
}

export function List({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <ul
      className={cn(`${baseParagraphClasses} my-6 ml-6 list-disc ${className}`)}
    >
      {children}
    </ul>
  )
}
export function NumberList({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <ol
      className={cn(
        `${baseParagraphClasses} my-6 ml-7 list-decimal ${className}`,
      )}
    >
      {children}
    </ol>
  )
}
export function RomanList({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <ol
      type="I"
      style={{ listStyle: 'upper-roman' }}
      className={cn(`${baseParagraphClasses} my-6 ml-7 ${className}`)}
    >
      {children}
    </ol>
  )
}
