import { motion } from "framer-motion";
import { CircleCheck, ShieldCheck } from "lucide-react";
import Button from "../core/Button";

interface FormData {
  accountType: string;
  countryCode?: string;
  phone: string;
  firstName: string;
  lastName: string;
}

interface SuccessModalProps {
  formData: FormData;
  onClose: () => void;
}

export default function SuccessModal({ formData, onClose }: SuccessModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-t-2xl sm:rounded-2xl shadow-2xl p-5 sm:p-8 w-full sm:max-w-md border border-border overflow-y-auto max-h-[90vh] sm:max-h-none"
      >
        <div className="flex flex-col items-center text-center">
          <CircleCheck className="w-11 h-11 text-primary" strokeWidth={1.5} />

          <h2 className="text-2xl font-medium text-foreground mb-2">
            You're all set!
          </h2>
          <p className="text-sm text-foreground mb-6">
            Here's a quick summary of your account details
          </p>

          <div className="w-full bg-neutral-100 rounded-xl p-5 mb-6 space-y-3 text-left">
            <div className="flex justify-between items-center">
              <span className="text-xs text-foreground">Account Type</span>
              <span className="text-sm font-medium text-foreground capitalize">
                {formData.accountType}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-foreground">Email</span>
              <span className="text-sm font-medium text-foreground">
                jason@example.com
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-foreground">Name</span>
              <span className="text-sm font-medium text-foreground">
                {formData.firstName} {formData.lastName}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-foreground">Mobile Number</span>
              <span className="text-sm font-medium text-foreground">
                {formData.countryCode || "+1"}
                {formData.phone}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-foreground mb-6">
            <ShieldCheck className="w-4 h-4 text-green-700" />
            <span>Your account is secured with bank-grade security</span>
          </div>

          <Button
            variant="primary"
            label="Go To Dashboard"
            onClick={onClose}
            className="rounded-full w-full sm:w-[250px]"
          />
        </div>
      </motion.div>
    </div>
  );
}
