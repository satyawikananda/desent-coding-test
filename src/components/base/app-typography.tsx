'use client'

import { cn } from '@/lib/utils'
import { forwardRef, HTMLAttributes } from 'react'

const headingStyles = {
  h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
  h2: 'scroll-m-20 pb-2 text-3xl font-semibold tracking-tight',
  h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
  h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
  h5: 'scroll-m-20 text-lg font-semibold tracking-tight',
  h6: 'scroll-m-20 text-base font-semibold tracking-tight',
} as const

// Heading Components (H1-H6)

const H1 = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement> & { balance?: boolean }>(
  ({ className, balance = true, ...props }, ref) => (
    <h1 ref={ref} className={cn(headingStyles.h1, balance && 'text-balance', className)} {...props} />
  )
)
H1.displayName = 'H1'

const H2 = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement> & { balance?: boolean }>(
  ({ className, balance = true, ...props }, ref) => (
    <h2 ref={ref} className={cn(headingStyles.h2, balance && 'text-balance', className)} {...props} />
  )
)
H2.displayName = 'H2'

const H3 = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn(headingStyles.h3, className)} {...props} />
  )
)
H3.displayName = 'H3'

const H4 = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h4 ref={ref} className={cn(headingStyles.h4, className)} {...props} />
  )
)
H4.displayName = 'H4'

const H5 = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5 ref={ref} className={cn(headingStyles.h5, className)} {...props} />
  )
)
H5.displayName = 'H5'

const H6 = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h6 ref={ref} className={cn(headingStyles.h6, className)} {...props} />
  )
)
H6.displayName = 'H6'

// Paragraph Component

interface PProps extends HTMLAttributes<HTMLParagraphElement> {
  variant?: 'default' | 'lead' | 'muted' | 'large' | 'small'
}

const paragraphStyles = {
  default: 'leading-7 [&:not(:first-child)]:mt-6',
  lead: 'text-xl text-muted-foreground',
  muted: 'text-sm text-muted-foreground',
  large: 'text-lg font-semibold',
  small: 'text-sm leading-none font-medium',
} as const

const P = forwardRef<HTMLParagraphElement, PProps>(
  ({ className, variant = 'default', ...props }, ref) => (
    <p ref={ref} className={cn(paragraphStyles[variant], className)} {...props} />
  )
)
P.displayName = 'P'

const Span = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => <span ref={ref} className={cn(className)} {...props} />
)
Span.displayName = 'Span'

// List Components

const UL = forwardRef<HTMLUListElement, HTMLAttributes<HTMLUListElement>>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn('my-6 ml-6 list-disc [&>li]:mt-2', className)} {...props} />
  )
)
UL.displayName = 'UL'

const OL = forwardRef<HTMLOListElement, HTMLAttributes<HTMLOListElement>>(
  ({ className, ...props }, ref) => (
    <ol ref={ref} className={cn('my-6 ml-6 list-decimal [&>li]:mt-2', className)} {...props} />
  )
)
OL.displayName = 'OL'

const LI = forwardRef<HTMLLIElement, HTMLAttributes<HTMLLIElement>>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn(className)} {...props} />
  )
)
LI.displayName = 'LI'

// Additional Typography Components

const Blockquote = forwardRef<HTMLQuoteElement, HTMLAttributes<HTMLQuoteElement>>(
  ({ className, ...props }, ref) => (
    <blockquote ref={ref} className={cn('mt-6 border-l-2 pl-6 italic', className)} {...props} />
  )
)
Blockquote.displayName = 'Blockquote'

const Code = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <code
      ref={ref}
      className={cn(
        'rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
        className
      )}
      {...props}
    />
  )
)
Code.displayName = 'Code'

export {
  H1,
  H2,
  H3, H4,
  H5,
  H6,
  P,
  Span,
  UL,
  OL,
  LI,
  Blockquote,
  Code,
}