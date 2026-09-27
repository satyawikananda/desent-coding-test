'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon, Monitor } from 'lucide-react'
import { forwardRef, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { Button, type ButtonProps } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const icons = {
  light: Sun,
  dark: Moon,
  system: Monitor,
}

type Theme = 'light' | 'dark' | 'system'

const themeOptions: { value: Theme; label: string; icon: typeof Sun }[] = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor },
]

// 1. Icon Theme - click icon to cycle through themes
type IconThemeProps = React.ButtonHTMLAttributes<HTMLButtonElement>

const IconTheme = forwardRef<HTMLButtonElement, IconThemeProps>(
  ({ className, ...props }, ref) => {
    const { resolvedTheme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])

    if (!mounted) {
      return (
        <button
          ref={ref}
          className={cn('rounded-full p-2 hover:bg-muted transition-colors cursor-pointer', className)}
          aria-label="Toggle theme"
          {...props}
        >
          <Sun className="size-5" />
        </button>
      )
    }

    const theme = resolvedTheme as keyof typeof icons
    const Icon = icons[theme]

    const toggleTheme = () => {
      if (theme === 'light') setTheme('dark')
      else if (theme === 'dark') setTheme('system')
      else setTheme('light')
    }

    return (
      <button
        ref={ref}
        onClick={toggleTheme}
        className={cn('rounded-full p-2 hover:bg-muted transition-colors cursor-pointer', className)}
        aria-label="Toggle theme"
        {...props}
      >
        <Icon className="size-5" />
      </button>
    )
  }
)
IconTheme.displayName = 'IconTheme'

// 2. Button Icon Theme - button to cycle through themes
type ButtonIconThemeProps = Omit<ButtonProps, 'onClick' | 'icon' | 'iconPlacement' | 'isLoading'>

const ButtonIconTheme = forwardRef<HTMLButtonElement, ButtonIconThemeProps>(
  ({ className, ...props }, ref) => {
    const { resolvedTheme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])

    if (!mounted) {
      return (
        <Button
          ref={ref}
          variant="ghost"
          size="icon"
          className={className}
          aria-label="Toggle theme"
          {...props}
        >
          <Sun className="size-5" />
        </Button>
      )
    }

    const theme = (resolvedTheme === 'system' ? 'system' : resolvedTheme) as Theme
    const current = themeOptions.find((o) => o.value === theme) || themeOptions[2]
    const Icon = current.icon

    const cycleTheme = () => {
      if (theme === 'light') setTheme('dark')
      else if (theme === 'dark') setTheme('system')
      else setTheme('light')
    }

    return (
      <Button
        ref={ref}
        onClick={cycleTheme}
        variant="ghost"
        size="icon"
        className={className}
        aria-label="Toggle theme"
        {...props}
      >
        <Icon className="size-5" />
      </Button>
    )
  }
)
ButtonIconTheme.displayName = 'ButtonIconTheme'

// 3. Select Icon Theme - dropdown to select theme
type SelectIconThemeProps = Omit<React.ComponentProps<typeof SelectTrigger>, 'value' | 'onValueChange'> & {
  onValueChange?: (value: Theme) => void
}

const SelectIconTheme = forwardRef<HTMLButtonElement, SelectIconThemeProps>(
  ({ className, onValueChange, ...props }, ref) => {
    const { resolvedTheme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])

    if (!mounted) {
      return (
        <Select defaultValue="system">
          <SelectTrigger ref={ref} className={cn('w-36', className)} {...props}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {themeOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                <span className="flex items-center gap-2">
                  <opt.icon className="size-4" />
                  {opt.label}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )
    }

    const theme = (resolvedTheme === 'system' ? 'system' : resolvedTheme) as Theme

    const handleValueChange = (newValue: Theme) => {
      setTheme(newValue)
      onValueChange?.(newValue)
    }

    return (
      <Select value={theme} onValueChange={handleValueChange}>
        <SelectTrigger ref={ref} className={cn('w-36', className)} {...props}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {themeOptions.map((opt) => {
            const Icon = opt.icon
            return (
              <SelectItem key={opt.value} value={opt.value}>
                <span className="flex items-center gap-2">
                  <Icon className="size-4" />
                  {opt.label}
                </span>
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
    )
  }
)
SelectIconTheme.displayName = 'SelectIconTheme'

export { IconTheme, ButtonIconTheme, SelectIconTheme }