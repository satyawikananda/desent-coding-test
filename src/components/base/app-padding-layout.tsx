import { cn } from "@/lib/utils"

interface AppPaddingLayoutProps {
  children: React.ReactNode
  className?: string
  as?: "main" | "div"
}

function AppPaddingLayout({
  children,
  className,
  as: Component = "div",
}: AppPaddingLayoutProps) {
  return (
    <Component
      className={cn(
        "flex min-h-dvh flex-col gap-6 px-4 pb-4 md:px-8 lg:px-16 lg:pb-6 xl:px-32",
        className
      )}
    >
      {children}
    </Component>
  )
}

export default AppPaddingLayout
