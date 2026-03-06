import { createContext, useContext, useState, ReactNode } from "react";
import { getAptitudeAttempts } from "@/api/aptitudeApi";
import { getTechnicalAttempts } from "@/api/technicalApi";
// Define what a single attempt looks like
interface Attempt {
  id: number;
  userId: number;
  companyName: string;
  totalQuestions: number;
  correctAnswers: number;
  percentage: number;
  passed: boolean;
  attemptedAt: string;
}

// Define what ProgressContext provides to components
interface ProgressContextType {
  aptitudeAttempts: Attempt[];
  technicalAttempts: Attempt[];
  rateLimitedAptitude: string[];
  rateLimitedTechnical: string[];
  isLoading: boolean;
  refreshProgress: (userId: number) => Promise<void>;
  hasPassedAptitude: (companyName: string) => boolean;
  hasPassedTechnical: (companyName: string) => boolean;
}

// Create the context
const ProgressContext = createContext<ProgressContextType | null>(null);

// Helper — calculates which companies are rate limited
const getRateLimited = (data: Attempt[]): string[] => {
  const now = new Date();
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

  const companyCounts: { [key: string]: number } = {};
  data.forEach((attempt) => {
    const attemptTime = new Date(attempt.attemptedAt);
    if (attemptTime >= oneHourAgo) {
      companyCounts[attempt.companyName] =
        (companyCounts[attempt.companyName] || 0) + 1;
    }
  });

  return Object.entries(companyCounts)
    .filter(([_, count]) => count >= 2)
    .map(([company]) => company);
};

// Provider — wraps the app and provides progress state
export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const [aptitudeAttempts, setAptitudeAttempts] = useState<Attempt[]>([]);
  const [technicalAttempts, setTechnicalAttempts] = useState<Attempt[]>([]);
  const [rateLimitedAptitude, setRateLimitedAptitude] = useState<string[]>([]);
  const [rateLimitedTechnical, setRateLimitedTechnical] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetches latest attempts and recalculates rate limits
  const refreshProgress = async (userId: number) => {
    setIsLoading(true);
    try {
      const [aptRes, techRes] = await Promise.all([
        getAptitudeAttempts(userId),
        getTechnicalAttempts(userId),
      ]);

      const aptData: Attempt[] = aptRes.ok ? await aptRes.json() : [];
      const techData: Attempt[] = techRes.ok ? await techRes.json() : [];

      setAptitudeAttempts(aptData);
      setTechnicalAttempts(techData);
      setRateLimitedAptitude(getRateLimited(aptData));
      setRateLimitedTechnical(getRateLimited(techData));
    } catch (err) {
      console.error("Failed to refresh progress:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Check if user passed aptitude for a specific company
  const hasPassedAptitude = (companyName: string): boolean => {
    return aptitudeAttempts.some(
      (a) => a.companyName === companyName && a.passed === true
    );
  };

  // Check if user passed technical for a specific company
  const hasPassedTechnical = (companyName: string): boolean => {
    return technicalAttempts.some(
      (a) => a.companyName === companyName && a.passed === true
    );
  };

  return (
    <ProgressContext.Provider value={{
      aptitudeAttempts,
      technicalAttempts,
      rateLimitedAptitude,
      rateLimitedTechnical,
      isLoading,
      refreshProgress,
      hasPassedAptitude,
      hasPassedTechnical,
    }}>
      {children}
    </ProgressContext.Provider>
  );
};

// Custom hook — components use this to access progress
export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used inside ProgressProvider");
  }
  return context;
};