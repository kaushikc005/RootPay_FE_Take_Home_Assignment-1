import { useState } from "react";
import Input from "../core/Input";
import StepNavigation from "./StepNavigation";

interface FormData {
  password: string;
  confirmPassword: string;
}

interface SetUserPasswordProps {
  data: FormData;
  onChange: (data: Partial<FormData>) => void;
  onBack: () => void;
  onContinue: () => void;
}

export default function SetUserPassword({
  data,
  onChange,
  onBack,
  onContinue,
}: SetUserPasswordProps) {
  const [errors, setErrors] = useState<{
    password: string;
    confirmPassword: string;
  }>({ password: "", confirmPassword: "" });

  const handleContinue = () => {
    const newErrors = { password: "", confirmPassword: "" };

    if (!data.password) {
      newErrors.password = "Password is required";
    } else if (data.password.length < 6) {
      newErrors.password = "Password must be atleast 6 characters";
    }

    if (!data.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    if (!newErrors.password && !newErrors.confirmPassword) {
      onContinue();
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
    onChange({ [field]: value });
  };

  const passwordValid = data.password && data.password.length >= 6;
  const passwordsMatch =
    data.password && data.password === data.confirmPassword;

  return (
    <div className="flex flex-col flex-1">
      <h2 className="text-xl font-bold text-foreground mb-6">
        Create Password for your account
      </h2>

      <div className="space-y-5">
        <Input
          label="Enter new password"
          required
          type="password"
          placeholder="Enter new password"
          value={data.password || ""}
          onChange={(e) => handleChange("password", e.target.value)}
          error={errors.password || null}
          helperText={
            !errors.password ? "Must be atleast 6 characters" : undefined
          }
        />

        <Input
          label="Confirm password"
          required
          type="password"
          placeholder="Confirm password"
          value={data.confirmPassword || ""}
          onChange={(e) => handleChange("confirmPassword", e.target.value)}
          error={errors.confirmPassword || null}
          helperText={
            !errors.confirmPassword ? "Both passwords must match" : undefined
          }
        />
      </div>

      <StepNavigation
        onBack={onBack}
        onContinue={handleContinue}
        disableContinue={!passwordValid || !passwordsMatch}
      />
    </div>
  );
}
