import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
// Import AppProvider
import { AppProvider } from "./context/AppContext";

createRoot(document.getElementById("root")!).render(
  <HashRouter>
    {/* Wrap entire app — now all components can access auth + progress */}
    <AppProvider>
      <App />
    </AppProvider>
  </HashRouter>
);

