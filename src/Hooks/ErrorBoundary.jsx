import { Component } from "react";
import { Box, Typography, Button } from "@mui/material";
import { LinkedIn } from "@mui/icons-material";
import { withThemeContext } from "./ThemeContext.jsx";

// Pure CSS Robot Illustration Component
const Robot404Illustration = () => (
  <Box
    sx={{
      position: "relative",
      width: 150, // Overall size control for the robot
      height: 150,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      transform: "scale(0.8)", // Scale down slightly to fit the 404
    }}
  >
    {/* Head */}
    <Box
      sx={{
        width: 60,
        height: 50,
        bgcolor: "#4466B3", // Robot blue
        borderRadius: "8px 8px 5px 5px",
        position: "absolute",
        top: 20,
        zIndex: 3,
        border: "2px solid #334f8a",
      }}
    >
      {/* Antennae */}
      <Box
        sx={{
          position: "absolute",
          top: -15,
          left: "10%",
          width: 4,
          height: 15,
          bgcolor: "#96A0AF", // Grey
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            width: 8,
            height: 8,
            bgcolor: "#96A0AF",
            borderRadius: "50%",
            position: "absolute",
            top: -4,
            left: -2,
          }}
        />
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: -10,
          right: "10%",
          width: 4,
          height: 10,
          bgcolor: "#96A0AF", // Grey
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            width: 8,
            height: 8,
            bgcolor: "#96A0AF",
            borderRadius: "50%",
            position: "absolute",
            top: -4,
            left: -2,
          }}
        />
      </Box>

      {/* Eyes */}
      <Box
        sx={{
          position: "absolute",
          top: 15,
          left: 10,
          width: 12,
          height: 12,
          bgcolor: "#5C7BC8", // Lighter blue
          borderRadius: "50%",
          border: "1px solid #334f8a",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 15,
          right: 10,
          width: 12,
          height: 12,
          bgcolor: "#5C7BC8", // Lighter blue
          borderRadius: "50%",
          border: "1px solid #334f8a",
        }}
      />
      {/* Mouth (X) */}
      <Box
        sx={{
          position: "absolute",
          top: 32,
          left: "50%",
          transform: "translateX(-50%)",
          width: 15,
          height: 15,
          color: "#d4d4d4", // Off-white/grey
          fontSize: "1rem",
          fontWeight: "bold",
          lineHeight: 1,
        }}
      >
        &times;
      </Box>
    </Box>

    {/* Body */}
    <Box
      sx={{
        width: 80,
        height: 70,
        bgcolor: "#4466B3", // Robot blue
        borderRadius: 8,
        position: "absolute",
        top: 60,
        zIndex: 2,
        border: "2px solid #334f8a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Inner panel / screen */}
      <Box
        sx={{
          width: 50,
          height: 50,
          bgcolor: "#334f8a", // Darker blue
          borderRadius: 4,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Gears (simplified circles) */}
        <Box
          sx={{
            position: "absolute",
            width: 20,
            height: 20,
            bgcolor: "#E0A84D", // Gold/orange for gears
            borderRadius: "50%",
            left: 5,
            top: 5,
            opacity: 0.8,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            width: 15,
            height: 15,
            bgcolor: "#E0A84D",
            borderRadius: "50%",
            right: 5,
            bottom: 5,
            opacity: 0.8,
          }}
        />
      </Box>
    </Box>

    {/* Arms */}
    <Box
      sx={{
        width: 15,
        height: 40,
        bgcolor: "#96A0AF", // Grey
        borderRadius: 5,
        position: "absolute",
        top: 70,
        left: 20,
        transform: "rotate(20deg)", // Left arm angle
        zIndex: 1,
        border: "1px solid #7d899b",
      }}
    >
      {/* Hand */}
      <Box
        sx={{
          width: 15,
          height: 15,
          bgcolor: "#96A0AF",
          borderRadius: "50%",
          position: "absolute",
          bottom: -5,
          left: 0,
        }}
      />
    </Box>
    <Box
      sx={{
        width: 15,
        height: 40,
        bgcolor: "#96A0AF", // Grey
        borderRadius: 5,
        position: "absolute",
        top: 70,
        right: 20,
        transform: "rotate(-20deg)", // Right arm angle
        zIndex: 1,
        border: "1px solid #7d899b",
      }}
    >
      {/* Hand */}
      <Box
        sx={{
          width: 15,
          height: 15,
          bgcolor: "#96A0AF",
          borderRadius: "50%",
          position: "absolute",
          bottom: -5,
          left: 0,
        }}
      />
    </Box>

    {/* Legs */}
    <Box
      sx={{
        width: 15,
        height: 40,
        bgcolor: "#96A0AF", // Grey
        borderRadius: 5,
        position: "absolute",
        bottom: 10,
        left: 55, // Positioned for a sitting look
        transform: "rotate(-20deg)", // Left leg angle
        zIndex: 1,
        border: "1px solid #7d899b",
      }}
    >
      {/* Foot */}
      <Box
        sx={{
          width: 25,
          height: 10,
          bgcolor: "#96A0AF",
          borderRadius: "0 0 5px 5px",
          position: "absolute",
          bottom: -5,
          left: -5,
        }}
      />
    </Box>
    <Box
      sx={{
        width: 15,
        height: 40,
        bgcolor: "#96A0AF", // Grey
        borderRadius: 5,
        position: "absolute",
        bottom: 10,
        right: 55, // Positioned for a sitting look
        transform: "rotate(20deg)", // Right leg angle
        zIndex: 1,
        border: "1px solid #7d899b",
      }}
    >
      {/* Foot */}
      <Box
        sx={{
          width: 25,
          height: 10,
          bgcolor: "#96A0AF",
          borderRadius: "0 0 5px 5px",
          position: "absolute",
          bottom: -5,
          left: -5,
        }}
      />
    </Box>

    {/* Wrench (simplified) */}
    <Box
      sx={{
        position: "absolute",
        width: 30,
        height: 10,
        bgcolor: "#E0A84D", // Gold/orange
        borderRadius: 2,
        top: 110,
        left: 80,
        transform: "rotate(45deg)",
        zIndex: 4, // Above the robot for visibility
        "&::before": {
          // Wrench head
          content: '""',
          position: "absolute",
          width: 10,
          height: 10,
          bgcolor: "#E0A84D",
          borderRadius: "50%",
          left: -5,
          top: 0,
        },
        "&::after": {
          // Wrench handle end
          content: '""',
          position: "absolute",
          width: 8,
          height: 8,
          bgcolor: "#E0A84D",
          borderRadius: "50%",
          right: -4,
          top: 1,
        },
      }}
    />

    {/* Spark (simplified star/cross) */}
    <Box
      sx={{
        position: "absolute",
        width: 15,
        height: 15,
        bgcolor: "#F3E58C", // Light yellow for spark
        borderRadius: "50%", // Round spark base
        top: 85,
        right: 40,
        zIndex: 4,
        "&::before, &::after": {
          // Cross shape for spark
          content: '""',
          position: "absolute",
          bgcolor: "#F3E58C",
        },
        "&::before": {
          // Horizontal part
          width: "100%",
          height: 3,
          top: "50%",
          left: 0,
          transform: "translateY(-50%)",
        },
        "&::after": {
          // Vertical part
          width: 3,
          height: "100%",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
        },
      }}
    />
  </Box>
);

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error: error };
  }

  componentDidCatch(error, errorInfo) {
    // console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({ errorInfo: errorInfo });
  }

  handleGoBackHome = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    const themeContext = this.props.themeToggle.themeContext;

    if (this.state.hasError) {
      return (
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: themeContext.background,
            textAlign: "center",
          }}
        >
          {/* Main 404 Illustration Block */}
          <Box sx={{ mb: 6, position: "relative", height: 250, width: "100%" }}>
            {/* Faded Large 404 Text Background */}
            <Typography
              variant="h2"
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "15rem",
                color: themeContext.primary,
                fontWeight: 800,
                letterSpacing: 20,
                zIndex: 1,
                userSelect: "none",
                // Adjust for smaller screens
                "@media (max-width:600px)": {
                  fontSize: "10rem",
                  letterSpacing: 10,
                },
              }}
            >
              500
            </Typography>

            {/* Robot Illustration */}
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 2,
              }}
            >
              <Robot404Illustration />
            </Box>
          </Box>

          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              mt: 0,
              mb: 1,
              color: themeContext.subTitleText,
            }}
          >
            uh-oh! Something went wrong here...
          </Typography>
          <Typography
            variant="body2"
            sx={{ mb: 4, color: themeContext.subTitleText }}
          >
            Please contact administrator <br />
            <a
              style={{
                fontWeight: 600,
                color: themeContext.primary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "5px",
              }}
              target="_blank"
              rel="noopener noreferrer"
              href="http://www.linkedin.com/in/deepaksulakheds/"
            >
              <LinkedIn fontSize="small" />
              Deepak Sulakhe
            </a>
          </Typography>

          <Button
            variant="contained"
            onClick={this.handleGoBackHome}
            sx={{
              border: `2px solid ${themeContext.primary}`,
              color: themeContext.primary,
              backgroundColor: "transparent",
              transition: "all 0.3s ease-in-out",
              textTransform: "uppercase",
              fontWeight: 600,
              fontSize: "1rem",
              px: 4,
              py: 1.5,
              borderRadius: 2,
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
              "&:hover": {
                boxShadow: `inset 0px 0px 25px 0px ${themeContext.primary}`,
              },
            }}
          >
            Back
          </Button>

          {this.state.error && (
            <Box
              sx={{
                mt: 5,
                maxWidth: 550,
                textAlign: "left",
                "& *": {
                  color: themeContext.subTitleText,
                },
              }}
            >
              <details
                style={{
                  border: `1px solid ${themeContext.primary}`,
                  borderRadius: "8px",
                  padding: "12px 16px",
                  fontSize: "14px",
                  color: "#333",
                  marginTop: "20px",
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                }}
              >
                <summary
                  style={{
                    fontWeight: 600,
                    color: themeContext.subTitleText,
                    outline: "none",
                    listStyle: "none",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  🛠️ Technical Details (Click to Expand)
                </summary>
                <div style={{ marginTop: "12px", lineHeight: "1.6" }}>
                  <strong style={{ color: "#c00" }}>Error:</strong>
                  <pre
                    style={{
                      backgroundColor: "#fff",
                      padding: "12px",
                      borderRadius: "6px",
                      border: "1px solid #ddd",
                      whiteSpace: "pre-wrap",
                      wordWrap: "break-word",
                      marginTop: "8px",
                      fontFamily: "monospace",
                      fontSize: "13px",
                      color: "#444",
                    }}
                  >
                    {`${this.state.error?.toString()}`}
                  </pre>
                </div>
              </details>
            </Box>
          )}
        </Box>
      );
    }

    // Normally render the child components
    return this.props.children;
  }
}

export default withThemeContext(ErrorBoundary);
