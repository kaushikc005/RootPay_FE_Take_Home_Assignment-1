import { useState, useRef, useEffect } from "react";
import Input from "../core/Input";
import StepNavigation from "./StepNavigation";

interface FormData {
  countryCode?: string;
  phone: string;
}

interface SetUserPhoneNumberProps {
  data: FormData;
  onChange: (data: Partial<FormData>) => void;
  onBack: () => void;
  onContinue: () => void;
}

const countryCodes = [
  { code: "+1", flag: "🇺🇸", country: "United States" },
  { code: "+44", flag: "🇬🇧", country: "United Kingdom" },
  { code: "+91", flag: "🇮🇳", country: "India" },
  { code: "+86", flag: "🇨🇳", country: "China" },
  { code: "+81", flag: "🇯🇵", country: "Japan" },
  { code: "+49", flag: "🇩🇪", country: "Germany" },
  { code: "+33", flag: "🇫🇷", country: "France" },
  { code: "+61", flag: "🇦🇺", country: "Australia" },
  { code: "+971", flag: "🇦🇪", country: "UAE" },
];

export default function SetUserPhoneNumber({
  data,
  onChange,
  onBack,
  onContinue,
}: SetUserPhoneNumberProps) {
  const [error, setError] = useState<string>("");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const countryCode = data.countryCode || "+1";
  const selected = countryCodes.find((c) => c.code === countryCode) || countryCodes[0];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handlePhoneChange = (value: string) => {
    setError("");
    onChange({ phone: value.replace(/\D/g, "") });
  };

  const handleContinue = () => {
    if (!data.phone) {
      setError("Mobile number is required");
      return;
    }
    if (data.phone.length < 7) {
      setError("Please enter a valid mobile number");
      return;
    }
    onContinue();
  };

  return (
    <div className="flex flex-col flex-1">
      <h2 className="text-xl font-bold text-foreground mb-6">
        Enter your mobile number
      </h2>

      <div>
        <label className="block text-xs font-medium text-label mb-2.5">
          Mobile Number <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2 items-start">
          {/* Custom country code dropdown — avoids transform-context positioning bug */}
          <div ref={dropdownRef} className="relative flex-shrink-0">
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="h-[44px] w-[90px] flex items-center justify-between gap-1 rounded-xl border border-[#729CF0] bg-white px-3 text-sm text-label shadow-sm focus:outline-none transition-all duration-200"
            >
              <span>{selected.flag} {selected.code}</span>
              <svg className="w-3 h-3 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {open && (
              <div className="absolute top-full left-0 mt-1 w-52 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
                {countryCodes.map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => { onChange({ countryCode: c.code }); setOpen(false); }}
                    className={`w-full flex items-center gap-2 px-3 py-2.5 text-sm text-left hover:bg-gray-50 transition-colors ${c.code === countryCode ? "bg-primary/5 text-primary font-medium" : "text-gray-700"}`}
                  >
                    <span>{c.flag}</span>
                    <span>{c.code}</span>
                    <span className="text-gray-400 text-xs">{c.country}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex-1">
            <Input
              type="tel"
              placeholder="Enter phone number"
              value={data.phone || ""}
              onChange={(e) => handlePhoneChange(e.target.value)}
              error={error || null}
              maxLength={15}
              className="text-label"
            />
          </div>
        </div>
      </div>

      <StepNavigation
        onBack={onBack}
        onContinue={handleContinue}
        disableContinue={!data.phone || data.phone.length < 7}
      />
    </div>
  );
}
