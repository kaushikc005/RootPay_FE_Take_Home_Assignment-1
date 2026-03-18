import Button from "../core/Button";

interface StepNavigationProps {
  onBack?: () => void;
  onContinue: () => void;
  disableContinue?: boolean;
  showBack?: boolean;
}

export default function StepNavigation({
  onBack,
  onContinue,
  disableContinue,
  showBack = true,
}: StepNavigationProps) {
  return (
    <div className="flex items-center justify-center gap-3 mt-auto pt-8 w-full flex-wrap sm:flex-nowrap">
      {showBack && (
        <Button
          variant="secondary"
          label="Back"
          onClick={onBack ?? (() => {})}
          disabled={!onBack}
          className="rounded-full w-full sm:w-[250px]"
        />
      )}
      <Button
        variant="primary"
        label="Continue"
        onClick={onContinue}
        disabled={disableContinue}
        className="rounded-full w-full sm:w-[250px]"
      />
    </div>
  );
}
