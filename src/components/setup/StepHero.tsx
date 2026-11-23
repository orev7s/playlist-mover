import type { ComponentType, ReactNode, SVGProps } from "react";
import { Text } from "../../ui/components/text";

interface StepHeroProps {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  children: ReactNode;
}

export function StepHero({ icon: Icon, title, children }: StepHeroProps) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <span className="flex size-20 items-center justify-center rounded-3xl bg-primary/12 text-primary shadow-surface ring-1 ring-primary/20">
        <Icon className="size-9" />
      </span>
      <Text variant="heading-md">{title}</Text>
      <Text color="muted" className="max-w-md">
        {children}
      </Text>
    </div>
  );
}

export function StepHint({ children }: { children: ReactNode }) {
  return <p className="w-full max-w-md rounded-control bg-muted/60 px-4 py-3 text-center text-sm text-muted-foreground">{children}</p>;
}
