import { useState } from "react";
import { isClientId, SETUP_STEPS, SetupStep } from "../components/setup/SetupStep";
import { StepProgress } from "../components/setup/StepProgress";
import { Button } from "../ui/components/button";
import { Card, CardContent, CardFooter } from "../ui/components/card";
import { IconCheck } from "../ui/components/icons";
import { IconArrowRight, IconChevronLeft } from "../ui/components/icons-extra";
import { Reveal } from "../ui/components/reveal";

const NEXT_LABEL = ["I made the app", "I added it", "Both are added"];

export function SetupScreen({ onSave }: { onSave: (clientId: string) => void }) {
  const [step, setStep] = useState(0);
  const [clientId, setClientId] = useState("");
  const last = step === SETUP_STEPS - 1;
  const save = () => onSave(clientId.trim());

  return (
    <Card className="gap-8 py-6">
      <CardContent className="flex flex-col gap-10">
        <StepProgress step={step} total={SETUP_STEPS} />
        {/* Keyed by step so each step animates in. */}
        <Reveal key={step} duration={400} blur={4} offset={0.5} className="flex min-h-80 flex-col items-center justify-center gap-6">
          <SetupStep step={step} clientId={clientId} onClientId={setClientId} onSubmit={save} />
        </Reveal>
      </CardContent>
      <CardFooter className="justify-between">
        <Button variant="ghost" className={step === 0 ? "invisible" : ""} onClick={() => setStep(step - 1)}>
          <IconChevronLeft /> Back
        </Button>
        {last ? (
          <Button disabled={!isClientId(clientId)} onClick={save}>
            Finish setup <IconCheck />
          </Button>
        ) : (
          <Button onClick={() => setStep(step + 1)}>
            {NEXT_LABEL[step]} <IconArrowRight />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
