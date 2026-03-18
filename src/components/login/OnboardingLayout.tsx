import { motion, AnimatePresence } from "framer-motion";
import ArtboardImg from "../../assets/Artboard11.png";
import BackgroundImg from "../../assets/BackgroundImg.png";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
}) => {
  const progress = totalSteps > 0 ? ((currentStep + 1) / totalSteps) * 100 : 0;

  return (
    <div className="w-full flex justify-center py-3">
      <div className="w-4/5 h-1 overflow-hidden border border-primary rounded-full">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

interface OnboardingLayoutProps {
  currentStep: number;
  totalSteps: number;
  children: React.ReactNode;
}

export default function OnboardingLayout({
  currentStep,
  totalSteps,
  children,
}: OnboardingLayoutProps) {
  return (
    <div className="relative min-h-screen font-sans">
      {/* Background — visible on sm+ */}
      <img
        src={BackgroundImg}
        alt=""
        className="hidden sm:block absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Outer wrapper: full-screen on mobile, centered on sm+, locked height on lg */}
      <div className="relative z-10 flex flex-col min-h-screen sm:items-center sm:justify-center sm:p-6 lg:px-16 lg:py-10 lg:h-screen lg:overflow-hidden">
        {/* Card: full-screen on mobile, floating card on sm+, two-panel on lg */}
        <div className="flex-1 sm:flex-none w-full sm:max-w-[580px] lg:max-w-[1280px] flex flex-col lg:flex-row sm:rounded-2xl overflow-hidden sm:shadow-[0_20px_60px_rgba(0,0,0,0.12)] lg:h-full">
          {/* Left panel — desktop only */}
          <div className="hidden lg:flex flex-col justify-between flex-1 p-10 bg-[#edeef2]">
            <div>
              <p className="text-2xl text-muted-foreground mb-2">
                Let's get started
              </p>
              <h1 className="text-5xl font-bold text-foreground leading-tight">
                Create your account
              </h1>
              <p className="text-base text-muted-foreground mt-3">
                Follow the steps to create your account
              </p>
            </div>

            <div className="flex justify-center mt-10">
              <img
                src={ArtboardImg}
                alt="Onboarding illustration"
                className="w-full max-w-[600px]"
                style={{
                  height: "380px",
                  objectFit: "contain",
                  objectPosition: "bottom",
                }}
              />
            </div>
          </div>

          {/* Right panel */}
          <div className="flex-1 lg:flex-none lg:w-[708px] flex flex-col bg-white">
            <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

            <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-8 sm:py-6 lg:px-10 lg:py-10 flex flex-col">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="flex-1 flex flex-col"
                >
                  {children}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
