import { Dialog, Grid, IconButton, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import "./projectComponent.css";
import { ArrowCircleLeft, ArrowCircleRight } from "@mui/icons-material";
import { useThemeContext } from "../../Hooks/ThemeContext";

export function ViewSnapshotsDialog({
  viewSnapshotVisible,
  onClose,
  snapsList,
}) {
  const [selectedImage, setSelectedImage] = useState(snapsList[0]);

  const { themeContext } = useThemeContext();

  const thumbnailsContainerRef = useRef(null);
  const thumbnailRefs = useRef([]);

  useEffect(() => {
    if (!viewSnapshotVisible) return;

    const container = thumbnailsContainerRef.current;
    const selectedThumbnail = thumbnailRefs.current[selectedImage];

    if (container && selectedThumbnail) {
      const containerRect = container.getBoundingClientRect();
      const thumbRect = selectedThumbnail.getBoundingClientRect();

      if (thumbRect.left < containerRect.left) {
        container.scrollBy({
          left: thumbRect.left - containerRect.left - 5,
          behavior: "smooth",
        });
      } else if (thumbRect.right > containerRect.right) {
        container.scrollBy({
          left: thumbRect.right - containerRect.right + 5,
          behavior: "smooth",
        });
      }
    }
  }, [viewSnapshotVisible, selectedImage]);

  const handleImageClick = (index) => {
    setSelectedImage(snapsList[index]);
  };

  const handlePrevClick = () => {
    const currentIndex = snapsList.indexOf(selectedImage);
    const prevIndex = (currentIndex - 1 + snapsList.length) % snapsList.length;
    setSelectedImage(snapsList[prevIndex]);
  };

  const handleNextClick = () => {
    const currentIndex = snapsList.indexOf(selectedImage);
    const nextIndex = (currentIndex + 1) % snapsList.length;
    setSelectedImage(snapsList[nextIndex]);
  };

  // Keyboard Shortcuts handler for dialog only
  const userAgent = navigator?.userAgent?.toLowerCase() || "";
  const platform = userAgent.includes("mac")
    ? "mac"
    : userAgent.includes("win")
    ? "win"
    : userAgent.includes("lin") || userAgent.includes("ubu")
    ? "lin"
    : false;
  const handleKeyDown = (e) => {
    try {
      if (!platform) return;

      const key = e.key.toLowerCase();
      if (key === "arrowright") {
        e.preventDefault();
        handleNextClick();
      } else if (key === "arrowleft") {
        e.preventDefault();
        handlePrevClick();
      }
    } catch (err) {
      console.log("Error in shortcut", err);
    }
  };

  return (
    <Dialog
      open={viewSnapshotVisible}
      onClose={onClose}
      onKeyDown={handleKeyDown}
      fullWidth
      maxWidth="md"
      sx={{ backdropFilter: "blur(12px)", boxShadow: "none" }}
      slotProps={{
        paper: {
          sx: {
            boxShadow: "none",
            background: "none",
            height: "auto",
            width: "auto",
            maxHeight: "90vh",
            padding: "10px",
            boxSizing: "border-box",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderRadius: 3,
          },
        },
      }}
    >
      {snapsList && snapsList.length > 0 ? (
        <>
          <img
            src={selectedImage}
            loading="lazy"
            alt="Image Preview"
            style={{
              minHeight: "200px",
              minWidth: "250px",
              maxWidth: "100%", // 100% of container width (which includes padding)
              maxHeight: "80vh",
              objectFit: "contain",
              borderRadius: "10px",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              display: "block",
              margin: "0 auto",
              padding: 0, // remove padding here
              boxSizing: "border-box",
            }}
          />

          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <Grid
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: "5px",
                padding: "5px",
                borderRadius: "13px",
              }}
            >
              <IconButton
                onClick={handlePrevClick}
                sx={{
                  padding: "3px",
                  transition: "all ease-in-out 0.15s",
                  color: themeContext.secondary,
                  "&:hover": {
                    boxShadow: `inset 0px 0px 10px 2px ${themeContext.primary}`,
                    color: themeContext.primary,
                  },
                }}
              >
                <ArrowCircleLeft sx={{ fontSize: "30px" }} />
              </IconButton>
              <Grid
                ref={thumbnailsContainerRef} // container ref
                sx={{
                  display: "flex",
                  gap: "5px",
                  overflowX: "auto",
                }}
              >
                {snapsList.map((image, index) => (
                  <img
                    onClick={() => handleImageClick(index)}
                    key={index}
                    src={image}
                    className="imageList"
                    loading="lazy"
                    ref={(el) => (thumbnailRefs.current[image] = el)} // assign ref to each image
                    style={{
                      backgroundColor: themeContext.lightPrimary,
                      ...(image === selectedImage && {
                        boxShadow: `inset 0px 0px 220px 0px ${themeContext.primary}`,
                      }),
                      height: "25px",
                      width: "25px",
                      objectFit: "contain",
                      flexShrink: 0, // prevent shrinking
                    }}
                  />
                ))}
              </Grid>
              <IconButton
                onClick={handleNextClick}
                sx={{
                  padding: "3px",
                  transition: "all ease-in-out 0.15s",
                  color: themeContext.secondary,
                  "&:hover": {
                    boxShadow: `inset 0px 0px 10px 2px ${themeContext.primary}`,
                    color: themeContext.primary,
                  },
                }}
              >
                <ArrowCircleRight sx={{ fontSize: "30px" }} />
              </IconButton>
            </Grid>
          </Grid>
        </>
      ) : (
        <Typography
          sx={{
            color: themeContext.primary,
            padding: "20px",
            textAlign: "center",
            backgroundColor: themeContext.surface,
          }}
          component={"div"}
        >
          No Snapshots Available
        </Typography>
      )}
    </Dialog>
  );
}
