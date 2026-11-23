import type { ReactNode } from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/components/alert";
import { Button } from "../ui/components/button";
import { IconWarning } from "../ui/components/icons";

interface PageShellProps {
  error?: string;
  onChangeApp?: () => void;
  children: ReactNode;
}

export function PageShell({ error, onChangeApp, children }: PageShellProps) {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <main className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col gap-6 px-4 py-10">
        {error && (
          <Alert variant="destructive" className="animate-reveal">
            <IconWarning />
            <div>
              <AlertTitle>Something went wrong</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </div>
          </Alert>
        )}

        {/* Short screens sit in the middle of the page instead of hugging the top. */}
        <div className="flex flex-1 flex-col justify-center">{children}</div>

        <footer className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
          <span>MIT licensed. Not affiliated with Spotify.</span>
          {onChangeApp && (
            <Button variant="ghost" size="sm" onClick={onChangeApp}>
              Change Client ID
            </Button>
          )}
        </footer>
      </main>
    </div>
  );
}
