import { useState } from "react";
import OnboardingLayout from "../../components/login/OnboardingLayout";
import AccountTypeSelection from "../../components/login/AccountTypeSelection";
import SetUserPhoneNumber from "../../components/login/SetUserPhoneNumber";
import UserOTPVerification from "../../components/login/UserOTPVerification";
import SetUserName from "../../components/login/SetUserName";
import SetUserPassword from "../../components/login/SetUserPassword";
import SuccessModal from "../../components/login/SuccessModal";
import { useNavigate } from "react-router-dom";

const TOTAL_STEPS = 5;

export default function LoginFlow() {
  const [step, setStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    accountType: "",
    countryCode: "+1",
    phone: "",
    otp: ["", "", "", ""],
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const updateData = (partial) => {
    setFormData((prev) => ({ ...prev, ...partial }));
  };

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const handleFinish = () => {
    setTimeout(() => {
      setShowSuccess(true);
    }, 1000);
  };

  const handleGoToDashboard = () => {
    navigate("/");
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <AccountTypeSelection
            data={formData}
            onChange={updateData}
            onBack={back}
            onContinue={next}
          />
        );
      case 1:
        return (
          <SetUserPhoneNumber
            data={formData}
            onChange={updateData}
            onBack={back}
            onContinue={next}
          />
        );
      case 2:
        return (
          <UserOTPVerification
            data={formData}
            onChange={updateData}
            onBack={back}
            onContinue={next}
          />
        );
      case 3:
        return (
          <SetUserName
            data={formData}
            onChange={updateData}
            onBack={back}
            onContinue={next}
          />
        );
      case 4:
        return (
          <SetUserPassword
            data={formData}
            onChange={updateData}
            onBack={back}
            onContinue={handleFinish}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <OnboardingLayout currentStep={step} totalSteps={TOTAL_STEPS}>
        {renderStep()}
      </OnboardingLayout>
      {showSuccess && (
        <SuccessModal formData={formData} onClose={handleGoToDashboard} />
      )}
    </>
  );
}
