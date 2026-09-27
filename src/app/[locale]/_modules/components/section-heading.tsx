import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  id?: string
  title: string
  description: string
  className?: string
}

export function SectionHeading({
  id,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <h2
        id={id}
        className="font-heading text-4xl leading-[1.04] font-bold tracking-[-0.045em] text-balance sm:text-5xl lg:text-[3.5rem]"
      >
        {title}
      </h2>
      <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
        {description}
      </p>
    </div>
  )
}
