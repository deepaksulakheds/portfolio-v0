import { Dialog, Grid, IconButton, Typography } from "@mui/material";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import "./projectComponent.css";
import {
  ArrowCircleLeft,
  ArrowCircleRight,
  DisabledByDefaultRounded,
} from "@mui/icons-material";
import { useThemeContext } from "../../Hooks/ThemeContext";
import { useHotkeyAndPlatform } from "../../Utils/useHotkeyAndPlatform";
import { useSearchParams } from "react-router-dom";

const FOLDER_MAP = {
  DueFinder: import.meta.glob(
    "@src/assets/Images/snapshots/DueFinder/*.{jpg,jpeg,png,gif,webp,avif}",
    {
      eager: true,
      query: "?url",
      import: "default",
    }
  ),
  FruitsCNN: import.meta.glob(
    "@src/assets/Images/snapshots/FruitsCNN/*.{jpg,jpeg,png,gif,webp,avif}",
    {
      eager: true,
      query: "?url",
      import: "default",
    }
  ),
  Vcaddemy: import.meta.glob(
    "@src/assets/Images/snapshots/Vcaddemy/*.{jpg,jpeg,png,gif,webp,avif}",
    {
      eager: true,
      query: "?url",
      import: "default",
    }
  ),
};

export function ViewSnapshotsDialog() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { themeContext } = useThemeContext();
  const { userPlatform, getHotkeyStringFromEvent } = useHotkeyAndPlatform();

  const [selectedIndex, setSelectedIndex] = useState(0);

  const thumbnailRefs = useRef({});
  const snapsList = searchParams.get("preview");

  const loadedSnaps = useMemo(() => {
    if (!snapsList || !Object.hasOwn(FOLDER_MAP, snapsList)) {
      return [];
    }

    const folderGlob = FOLDER_MAP[snapsList];

    return Object.entries(folderGlob)
      .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
      .map(([key, url]) => ({
        key,
        url,
      }));
  }, [snapsList]);

  const selectedImage = loadedSnaps[selectedIndex]?.url;

  // Keep selected thumbnail visible
  useEffect(() => {
    if (!selectedImage) return;

    thumbnailRefs.current[selectedImage]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [selectedImage]);

  // Reset selected image whenever preview parameter changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [snapsList]);

  // Handlers
  const handleThumbnailClick = useCallback((index) => {
    setSelectedIndex(index);
  }, []);

  const handleClose = useCallback(() => {
    setSearchParams((params) => {
      params.delete("preview");
      return params;
    });
  }, [setSearchParams]);

  const handlePrevClick = useCallback(() => {
    if (!loadedSnaps.length) return;

    setSelectedIndex(
      (prev) => (prev - 1 + loadedSnaps.length) % loadedSnaps.length
    );
  }, [loadedSnaps.length]);

  const handleNextClick = useCallback(() => {
    if (!loadedSnaps.length) return;

    setSelectedIndex((prev) => (prev + 1) % loadedSnaps.length);
  }, [loadedSnaps.length]);

  const handleKeyDown = useCallback(
    (e) => {
      if (!userPlatform || !loadedSnaps?.length) return;

      const key = getHotkeyStringFromEvent(e);

      if (key === "arrowright") {
        e.preventDefault();
        handleNextClick();
      } else if (key === "arrowleft") {
        e.preventDefault();
        handlePrevClick();
      }
    },
    [
      userPlatform,
      getHotkeyStringFromEvent,
      handleNextClick,
      handlePrevClick,
      loadedSnaps.length,
    ]
  );

  return (
    <Dialog
      open={Boolean(snapsList)}
      onClose={handleClose}
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
      <DisabledByDefaultRounded
        sx={{
          alignSelf: "flex-end",
          borderRadius: "5px",
          cursor: "pointer",
          color: themeContext.secondary,
          marginBottom: "4px",
          "&:hover": {
            boxShadow: `inset 0px 0px 10px 2px ${themeContext.primary}`,
            color: themeContext.primary,
          },
        }}
        onClick={handleClose}
      />
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
                maxWidth: "100%",
                maxHeight: "80vh",
                objectFit: "contain",
                borderRadius: "10px",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                display: "block",
                margin: "0 auto",
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
                sx={{
                  display: "flex",
                  gap: "5px",
                  overflowX: "auto",
                }}
              >
                {loadedSnaps.map((snap, index) => (
                  <img
                    key={snap.key}
                    src={snap.url}
                    loading="lazy"
                    className="imageList"
                    alt={`Preview ${index + 1}`}
                    onClick={() => handleThumbnailClick(index)}
                    ref={(el) => {
                      if (el) {
                        thumbnailRefs.current[snap.url] = el;
                      }
                    }}
                    style={{
                      borderRadius: 4,
                      height: "25px",
                      width: "25px",
                      objectFit: "contain",
                      flexShrink: 0,
                      ...(index === selectedIndex && {
                        boxShadow: `inset 0px 0px 220px 0px ${themeContext.primary}`,
                      }),
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
          component="div"
        >
          No Snapshots Available
        </Typography>
      )}
    </Dialog>
  );
}
