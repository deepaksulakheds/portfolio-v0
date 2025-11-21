import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeContextProvider } from "./Hooks/ThemeContext.jsx";
import { AttachmentProvider } from "./Pages/Header/MailDialog/attachmentContext.jsx";
import { SecretProvider } from "./Hooks/SecretContext.jsx";
import { NotistackSnackbarProvider } from "./Hooks/SharedSnackbar1.jsx";
import ErrorBoundary from "./Hooks/ErrorBoundary.jsx";
import { NavContextProvider } from "./Hooks/NavMenuContext.jsx";
import { ApolloProvider } from "@apollo/client/react";
import { client } from "./Utils/clients.js";

createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <NavContextProvider>
      <ThemeContextProvider>
        <ErrorBoundary>
          <SecretProvider>
            <AttachmentProvider>
              <NotistackSnackbarProvider>
                <StrictMode>
                  <App />
                </StrictMode>
              </NotistackSnackbarProvider>
            </AttachmentProvider>
          </SecretProvider>
        </ErrorBoundary>
      </ThemeContextProvider>
    </NavContextProvider>
  </ApolloProvider>
);
