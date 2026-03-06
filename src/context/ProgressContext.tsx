import { createContext, useContext, useState, ReactNode } from "react";
import { getAptitudeAttempts } from "@/api/aptitudeApi";
import { getTechnicalAttempts } from "@/api/technicalApi";
import { Attempt } from "@/types";

interface ProgressContextType {
  aptitudeAttempts: Attempt[];
  technicalAttempts: Attempt[];
  rateLimitedAptitude: string[];
  rateLimitedTechnical: string[];
  isLoading: boolean;
  refreshProgress: (userId: number) => Promise<void>;
  hasPassedAptitude: (companyName: string) => boolean;
  hasPassedTechnical: (companyName: string) => boolean;
  // ✅ Practice time
  practiceSeconds: number;
  formattedPracticeTime: string;
  addPracticeTime: (seconds: number, userId: number) => void;
}

const ProgressContext = createContext<ProgressContextType | null>(null);

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

// ✅ Load saved practice time from localStorage for this user
const loadPracticeTime = (userId: number): number => {
  const saved = localStorage.getItem(`practiceTime_${userId}`);
  return saved ? parseInt(saved, 10) : 0;
};

// ✅ Format seconds into "1h 23m" or "45m" or "30s"
export const formatPracticeTime = (totalSeconds: number): string => {
  if (totalSeconds === 0) return "0m";

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0 && minutes > 0) return `${hours}h ${minutes}m`;
  if (hours > 0) return `${hours}h`;
  if (minutes > 0 && seconds > 0) return `${minutes}m ${seconds}s`;
  if (minutes > 0) return `${minutes}m`;
  return `${seconds}s`;
};

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const [aptitudeAttempts, setAptitudeAttempts] = useState<Attempt[]>([]);
  const [technicalAttempts, setTechnicalAttempts] = useState<Attempt[]>([]);
  const [rateLimitedAptitude, setRateLimitedAptitude] = useState<string[]>([]);
  const [rateLimitedTechnical, setRateLimitedTechnical] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  // ✅ Practice time state — starts at 0, loads from localStorage when user logs in
  const [practiceSeconds, setPracticeSeconds] = useState<number>(0);

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

      // ✅ Load this user's practice time when progress refreshes
      setPracticeSeconds(loadPracticeTime(userId));
    } catch (err) {
      console.error("Failed to refresh progress:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Called when a test is submitted — adds time spent to total
  const addPracticeTime = (seconds: number, userId: number) => {
    setPracticeSeconds(prev => {
      const newTotal = prev + seconds;
      // Save to localStorage so it persists across sessions
      localStorage.setItem(`practiceTime_${userId}`, newTotal.toString());
      return newTotal;
    });
  };

  const hasPassedAptitude = (companyName: string): boolean => {
    return aptitudeAttempts.some(
      (a) => a.companyName === companyName && a.passed === true
    );
  };

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
      practiceSeconds,
      formattedPracticeTime: formatPracticeTime(practiceSeconds),
      addPracticeTime,
    }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used inside ProgressProvider");
  }
  return context;
};