import { cn } from "@/lib/utils";

export function SectionHeading({
  index,
  label,
  title,
  description,
  className,
}: {
  index: string;
  label: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("border-t border-ink pt-4", className)}>
      <p className="label-mono text-muted-foreground">
        {index} / {label}
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-12 md:items-end">
        <h2 className="display-tight col-span-full text-[clamp(2rem,6vw,4rem)] md:col-span-7">
          {title}
        </h2>
        {description ? (
          <p className="col-span-full max-w-prose text-[17px] leading-relaxed text-muted-foreground md:col-span-5">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
