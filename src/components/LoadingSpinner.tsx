import { Brain } from "lucide-react";

interface LoadingSpinnerProps {
  text?: string;
  size?: "sm" | "md" | "lg";
}

const LoadingSpinner = ({ text = "AI Analyzing...", size = "md" }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8", 
    lg: "h-12 w-12"
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg"
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-8">
      <div className="relative">
        <div className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-primary/20 border-t-primary`}></div>
        <Brain className={`absolute inset-0 m-auto ${sizeClasses[size]} text-primary animate-pulse`} />
      </div>
      <div className={`${textSizeClasses[size]} font-medium text-primary animate-pulse`}>
        {text}
      </div>
      <div className="flex space-x-1">
        <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
        <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
        <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;