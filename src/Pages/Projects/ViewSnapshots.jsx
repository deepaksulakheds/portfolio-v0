import { Dialog, Grid, IconButton, Typography } from "@mui/material";
import { useEffect, useRef, useState, useMemo } from "react";
import "./projectComponent.css";
import { ArrowCircleLeft, ArrowCircleRight } from "@mui/icons-material";
import { useThemeContext } from "../../Hooks/ThemeContext";
import { useHotkeyAndPlatform } from "../../Utils/useHotkeyAndPlatform";

const FOLDER_MAP = {
  DueFinder: import.meta.glob(
    "@src/assets/Images/snapshots/DueFinder/*.{jpg,jpeg,png,gif,webp}",
    {
      eager: true,
      as: "url",
    }
  ),
  FruitsCNN: import.meta.glob(
    "@src/assets/Images/snapshots/FruitsCNN/*.{jpg,jpeg,png,gif,webp}",
    {
      eager: true,
      as: "url",
    }
  ),
};

export function ViewSnapshotsDialog({
  viewSnapshotVisible,
  onClose,
  snapsList,
}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const { themeContext } = useThemeContext();
  const { userPlatform, getHotkeyStringFromEvent } = useHotkeyAndPlatform();

  const thumbnailsContainerRef = useRef(null);
  const thumbnailRefs = useRef([]);

  const loadedSnaps = useMemo(() => {
    if (!snapsList) return [];

    const folderGlob = FOLDER_MAP[snapsList];
    if (!folderGlob) return [];

    return Object.entries(folderGlob)
      .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
      .map(([key, url]) => ({
        key,
        url,
      }));
  }, [snapsList]);

  useEffect(() => {
    if (!viewSnapshotVisible || !selectedImage) return;

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

  useEffect(() => {
    if (viewSnapshotVisible && loadedSnaps.length > 0) {
      setSelectedImage(loadedSnaps[0].url);
    }
  }, [viewSnapshotVisible, loadedSnaps]);

  const handleThumbnailClick = (url) => {
    setSelectedImage(url);
  };

  const getCurrentIndex = () =>
    loadedSnaps.findIndex((s) => s.url === selectedImage);

  const handlePrevClick = () => {
    if (!loadedSnaps.length || !selectedImage) return;

    const currentIndex = getCurrentIndex();

    const prevIndex =
      (currentIndex - 1 + loadedSnaps.length) % loadedSnaps.length;

    setSelectedImage(loadedSnaps[prevIndex].url);
  };

  const handleNextClick = () => {
    if (!loadedSnaps.length || !selectedImage) return;

    const currentIndex = getCurrentIndex();

    const nextIndex = (currentIndex + 1) % loadedSnaps.length;

    setSelectedImage(loadedSnaps[nextIndex].url);
  };

  const handleKeyDown = (e) => {
    try {
      if (!userPlatform) return;
      const key = getHotkeyStringFromEvent(e);

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
      {loadedSnaps.length > 0 ? (
        <>
          {selectedImage && (
            <img
              src={selectedImage}
              loading="lazy"
              alt="Preview"
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
          )}

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
                {loadedSnaps.map((snap) => (
                  <img
                    onClick={() => handleThumbnailClick(snap.url)}
                    key={snap.key}
                    src={snap.url}
                    className="imageList"
                    loading="lazy"
                    ref={(el) => (thumbnailRefs.current[snap.key] = el)}
                    style={{
                      borderRadius: 4,
                      ...(snap.key.includes(selectedImage) && {
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
