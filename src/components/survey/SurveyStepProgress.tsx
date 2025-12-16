import { CheckCircle, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SurveyStep {
  id: string;
  label: string;
  shortLabel: string;
}

const SURVEY_STEPS: SurveyStep[] = [
  { id: 'customer', label: 'Customer Info', shortLabel: 'Info' },
  { id: 'roof', label: 'Roof Details', shortLabel: 'Roof' },
  { id: 'environmental', label: 'Environmental', shortLabel: 'Env' },
  { id: 'electrical', label: 'Electrical', shortLabel: 'Elec' },
  { id: 'recommendations', label: 'Recommendations', shortLabel: 'Rec' },
  { id: 'logistics', label: 'Installation', shortLabel: 'Install' },
  { id: 'photos', label: 'Photos', shortLabel: 'Photos' },
];

interface SurveyStepProgressProps {
  currentStep: number;
  completedSteps: string[];
  className?: string;
}

export default function SurveyStepProgress({ 
  currentStep, 
  completedSteps,
  className 
}: SurveyStepProgressProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {/* Step Counter */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">
          Survey Progress
        </span>
        <span className="text-sm font-bold text-primary">
          Step {currentStep} of {SURVEY_STEPS.length}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${(currentStep / SURVEY_STEPS.length) * 100}%` }}
        />
      </div>

      {/* Step Labels - Hidden on mobile, shown on larger screens */}
      <div className="hidden sm:flex items-center justify-between gap-1">
        {SURVEY_STEPS.map((step, index) => {
          const stepNum = index + 1;
          const isCompleted = completedSteps.includes(step.id) || stepNum < currentStep;
          const isCurrent = stepNum === currentStep;

          return (
            <div 
              key={step.id}
              className={cn(
                "flex flex-col items-center gap-1 flex-1",
                isCurrent && "text-primary",
                isCompleted && !isCurrent && "text-green-600",
                !isCompleted && !isCurrent && "text-muted-foreground"
              )}
            >
              <div className={cn(
                "h-6 w-6 rounded-full flex items-center justify-center text-xs font-medium border-2 transition-colors",
                isCurrent && "border-primary bg-primary text-primary-foreground",
                isCompleted && !isCurrent && "border-green-600 bg-green-600 text-white",
                !isCompleted && !isCurrent && "border-muted-foreground/30 bg-background"
              )}>
                {isCompleted && !isCurrent ? (
                  <CheckCircle size={14} />
                ) : (
                  stepNum
                )}
              </div>
              <span className="text-[10px] font-medium truncate max-w-full">
                {step.shortLabel}
              </span>
            </div>
          );
        })}
      </div>

      {/* Current Step Label - Mobile */}
      <div className="sm:hidden text-center">
        <span className="text-sm font-medium">
          {SURVEY_STEPS[currentStep - 1]?.label || 'Survey'}
        </span>
      </div>
    </div>
  );
}

export { SURVEY_STEPS };
