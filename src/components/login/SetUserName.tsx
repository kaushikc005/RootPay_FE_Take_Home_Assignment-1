import React, { useState } from "react";
import Input from "../core/Input";
import StepNavigation from "./StepNavigation";

interface FormData {
  firstName: string;
  lastName: string;
}

interface SetUserNameProps {
  data: FormData;
  onChange: (data: Partial<FormData>) => void;
  onBack: () => void;
  onContinue: () => void;
}

export default function SetUserName({
  data,
  onChange,
  onBack,
  onContinue,
}: SetUserNameProps) {
  const [errors, setErrors] = useState<{ firstName: string; lastName: string }>(
    { firstName: "", lastName: "" },
  );

  const handleContinue = () => {
    const newErrors = { firstName: "", lastName: "" };

    if (!data.firstName?.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!data.lastName?.trim()) {
      newErrors.lastName = "Last name is required";
    }

    setErrors(newErrors);

    if (!newErrors.firstName && !newErrors.lastName) {
      onContinue();
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
    onChange({ [field]: value });
  };

  return (
    <div className="flex flex-col flex-1">
      <h2 className="text-xl font-bold text-foreground mb-6">
        What is your name?
      </h2>

      <div className="space-y-5">
        <Input
          label="First Name"
          required
          placeholder="First"
          value={data.firstName || ""}
          onChange={(e) => handleChange("firstName", e.target.value)}
          error={errors.firstName || null}
        />
        <Input
          label="Last Name"
          required
          placeholder="Last Name"
          value={data.lastName || ""}
          onChange={(e) => handleChange("lastName", e.target.value)}
          error={errors.lastName || null}
        />
      </div>

      <StepNavigation
        onBack={onBack}
        onContinue={handleContinue}
        disableContinue={!data.firstName?.trim() || !data.lastName?.trim()}
      />
    </div>
  );
}
