import { ReactNode } from "react";
import { AuthProvider } from "./AuthContext";
import { ProgressProvider } from "./ProgressContext";
// Combines both providers into one
// Instead of wrapping app with two separate providers,
// just wrap with <AppProvider> once!

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <ProgressProvider>
        {children}
      </ProgressProvider>
    </AuthProvider>
  );
};