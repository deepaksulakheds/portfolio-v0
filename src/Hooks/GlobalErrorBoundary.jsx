import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function GlobalErrorBoundary() {
  const error = useRouteError();

  console.error("🔥 Global React Router Error:", error);

  if (isRouteErrorResponse(error)) {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>Error {error.status}</h1>
        <p style={styles.subtitle}>{error.statusText}</p>

        {error.data && (
          <pre style={styles.details}>
            {typeof error.data === "string"
              ? error.data
              : JSON.stringify(error.data, null, 2)}
          </pre>
        )}

        <button
          style={styles.button}
          onClick={() => (window.location.href = "/")}
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Something went wrong</h1>

      {error?.message && <p style={styles.subtitle}>{error.message}</p>}

      {error?.stack && <pre style={styles.details}>{error.stack}</pre>}

      <button style={styles.button} onClick={() => window.location.reload()}>
        Reload Page
      </button>
    </div>
  );
}

const styles = {
  container: {
    padding: "2rem",
    margin: "auto",
    maxWidth: "600px",
    fontFamily: "system-ui, sans-serif",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "1rem",
  },
  subtitle: {
    opacity: 0.8,
    marginBottom: "1rem",
  },
  details: {
    background: "#f4f4f4",
    padding: "1rem",
    borderRadius: "8px",
    whiteSpace: "pre-wrap",
    marginBottom: "1rem",
    overflowX: "auto",
  },
  button: {
    padding: "0.7rem 1.2rem",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
