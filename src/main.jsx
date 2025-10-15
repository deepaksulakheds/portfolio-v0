import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeContextProvider } from "./Hooks/ThemeContext.jsx";
import { AttachmentProvider } from "./Pages/Header/MailDialog/attachmentContext.jsx";
import { SecretProvider } from "./Hooks/SecretContext.jsx";
import { NotistackSnackbarProvider } from "./Hooks/SharedSnackbar1.jsx";

createRoot(document.getElementById("root")).render(
  <ThemeContextProvider>
    <SecretProvider>
      <AttachmentProvider>
        <NotistackSnackbarProvider>
          <StrictMode>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </StrictMode>
        </NotistackSnackbarProvider>
      </AttachmentProvider>
    </SecretProvider>
  </ThemeContextProvider>
);
