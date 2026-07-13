import { useSnackbar, SnackbarProvider } from "notistack";
import { createContext } from "react";

// Create a context for managing the Snackbar state
const SnackbarContext = createContext();

// Provider component that wraps your application
export const NotistackSnackbarProvider = ({ children }) => {
  return (
    <SnackbarProvider
      autoHideDuration={5000}
      style={{
        borderRadius: 10,
        fontWeight: "bold",
        width: "auto",
        minWidth: "20px",
        wordBreak: "break-word",
      }}
      SnackbarProps={{
        style: { width: "fit-content", minWidth: "20px" },
      }}
      maxSnack={3}
      width="auto"
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      {children}
    </SnackbarProvider>
  );
};

export const useNotistackSnackbar = () => {
  const { enqueueSnackbar } = useSnackbar();

  const showSnackbar = (message, severity = "info") => {
    enqueueSnackbar(message, { variant: severity });
  };
  return { showSnackbar };
};

export const withNotistackSnackbar = (Component) => {
  return function WrappedComponent(props) {
    const snackbar = useNotistackSnackbar();
    return <Component {...props} notistackSnackbar={snackbar} />;
  };
};
