import { createContext, useContext, useState } from "react";

// Create a context for managing the Snackbar state
const SecretContext = createContext();

// Provider component that wraps your application
export const SecretProvider = ({ children }) => {
  //   console.log("children", children);
  const [secretEnabled, setSecretEnabled] = useState(false);

  // Function to show the Snackbar
  const toggleSecret = () => {
    // console.log("SecretContext", secretEnabled);
    setSecretEnabled(!secretEnabled);
  };

  return (
    <SecretContext.Provider value={{ secretEnabled, toggleSecret }}>
      {children}
    </SecretContext.Provider>
  );
};

// Custom hook to use the Snackbar context
export const useSecretContext = () => {
  const secretToggle = useContext(SecretContext);
  if (!secretToggle) {
    console.log("useSecretContext must be used within a SecretContext");
  }
  return secretToggle;
};

// Higher-Order Component to enhance a component with Snackbar functionality
export const withSecretContext = (Component) => {
  return function WrappedComponent(props) {
    const secretToggle = useSecretContext();
    return <Component {...props} secretToggle={secretToggle} />;
  };
};
