import {
  Autocomplete,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client/react";
import { withNotistackSnackbar } from "../../Hooks/SharedSnackbar1";
import { ADD_NOTE } from "../../queries";
import { useThemeContext } from "../../Hooks/ThemeContext";

function NotesDialog({
  noteAnchorEl,
  onClose,
  notistackSnackbar,
  fetchNotes,
  allTags,
}) {
  // Contexts
  const { themeContext } = useThemeContext();

  // States
  const [tagTypeSelection, setTagTypeSelection] = useState(null);
  const [addNote, { data, loading, error }] = useMutation(ADD_NOTE);
  const [note, setNote] = useState({
    note: "",
    tag: "",
  });

  useEffect(() => {
    if (noteAnchorEl) {
      setNote({ ...note, tag: "" });
    } else {
      setTagTypeSelection(null);
    }

    return () => {
      setNote({
        note: "",
        tag: "",
      });
    };
  }, [noteAnchorEl, tagTypeSelection]);

  const handleAddNote = async () => {
    try {
      // Validation
      if (tagTypeSelection == "select" && (!note.tag || note.tag == "")) {
        notistackSnackbar.showSnackbar("Please select a tag.", "error");
        return;
      }
      if (tagTypeSelection == "newTag" && (!note.tag || note.tag == "")) {
        notistackSnackbar.showSnackbar("Please enter a Tag.", "error");
        return;
      }
      if (!tagTypeSelection || tagTypeSelection == "") {
        notistackSnackbar.showSnackbar("Please select a Tag Type.", "error");
        return;
      }
      if (!note.note || note.note == "") {
        notistackSnackbar.showSnackbar("Please enter a Note.", "error");
        return;
      }

      const addResp = await addNote({
        variables: { note: note.note, tag: note.tag ? note.tag : null },
      });
      // console.log("addResp", addResp.data.addNote.status);
      if (addResp.data.addNote.status == 200) {
        notistackSnackbar.showSnackbar("Note added successfully.", "success");
        fetchNotes();
        onClose();
      } else {
        notistackSnackbar.showSnackbar(addResp.data.addNote.message, "error");
      }
    } catch (err) {
      console.log("err", err);
      notistackSnackbar.showSnackbar(err.message, "error");
    }
  };

  const handleTagChange = async (e, newTag) => {
    setNote({ ...note, tag: newTag });
  };

  const handleRadioChange = async (e) => {
    setTagTypeSelection(e.target.value);
  };

  return (
    <Dialog
      disableRestoreFocus
      open={noteAnchorEl}
      onClose={onClose}
      fullWidth
      sx={{ backdropFilter: "blur(10px)" }}
      slotProps={{
        paper: {
          style: {
            borderRadius: "10px",
            background: themeContext.background,
            border: `0.1px solid ${themeContext.primary}`,
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          color: themeContext.titleText,
          fontWeight: "bold",
          padding: "18px 20px",
        }}
      >
        Notes
      </DialogTitle>
      <Grid
        style={{
          display: "flex",
          justifyContent: "center",
          color: themeContext.secondary,
        }}
      >
        <Divider
          color={themeContext.navItemTextColor}
          sx={{
            color: themeContext.navItemTextColor,
            backgroundColor: themeContext.navItemTextColor,
          }}
          style={{ color: themeContext.navItemTextColor }}
          width="92%"
        />
      </Grid>
      <DialogContent
        sx={{
          padding: "20px",
          scrollbarWidth: "thin",
          color: themeContext.bodyText,
        }}
      >
        <TextField
          autoFocus
          multiline
          slotProps={{
            input: {
              style: {
                color: themeContext.bodyText,
              },
            },
            inputLabel: {
              style: {
                color: themeContext.helperText,
              },
            },
          }}
          sx={{
            "& .MuiInput-underline:before": {
              borderBottom: "1px solid",
              borderBottomColor: themeContext.helperText,
            },
            "& .MuiInput-underline:hover": {
              borderBottomColor: themeContext.helperText,
            },
            "& .MuiInput-underline:hover:before": {
              borderBottom: "2px solid",
              borderBottomColor: themeContext.helperText,
            },
            "& .MuiInput-underline:after": {
              borderBottom: "2px solid",
              borderBottomColor: themeContext.helperText,
            },
          }}
          fullWidth
          value={note.note}
          variant="standard"
          name="message"
          onChange={(e) => setNote({ ...note, note: e.target.value })}
          label="Enter Note *"
        />

        <FormControl>
          <RadioGroup
            name="tagTypeOptions"
            value={tagTypeSelection}
            onChange={handleRadioChange}
            sx={{ display: "flex", flexDirection: "row" }}
          >
            <FormControlLabel
              value="select"
              disabled={allTags.length == 0}
              control={
                <Radio
                  sx={{
                    color: themeContext.secondary,
                    "&.Mui-checked": {
                      color: themeContext.secondary,
                    },
                  }}
                />
              }
              label="Select"
              sx={{
                color: themeContext.secondary,
                "& .Mui-disabled": {
                  color: themeContext.textDisabled,
                  WebkitTextFillColor: themeContext.textDisabled,
                },
                "& .MuiInput-underline.Mui-disabled:before": {
                  borderBottomColor: themeContext.textDisabled,
                },
                "& .Mui-disabled .MuiSvgIcon-root": {
                  color: themeContext.textDisabled,
                },
              }}
            />
            <FormControlLabel
              value="newTag"
              control={
                <Radio
                  sx={{
                    color: themeContext.secondary,
                    "&.Mui-checked": {
                      color: themeContext.secondary,
                    },
                  }}
                />
              }
              label="New Tag"
              sx={{ color: themeContext.secondary }}
            />
            <FormControlLabel
              value="untagged"
              control={
                <Radio
                  sx={{
                    color: themeContext.secondary,
                    "&.Mui-checked": {
                      color: themeContext.secondary,
                    },
                  }}
                />
              }
              label="- Untagged -"
              sx={{ color: themeContext.secondary }}
            />
          </RadioGroup>
        </FormControl>
        {tagTypeSelection && tagTypeSelection === "select" ? (
          <Autocomplete
            options={allTags
              .map((t) => t.tag)
              .filter((tag) => !tag?.toLowerCase()?.includes("untagged"))}
            autoComplete
            value={note.tag}
            onChange={(e, value) => handleTagChange(e, value)}
            disabled={allTags.length === 0}
            sx={{
              minWidth: "200px",
              // "& .MuiSvgIcon-root": {
              //   color: themeContext.secondary,
              // },
              "& .MuiInputLabel-root": {
                color: themeContext.helperText,
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: themeContext.helperText,
              },
              "& .MuiInput-underline:before": {
                borderBottomColor: themeContext.helperText,
              },
              "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                borderBottomColor: themeContext.helperText,
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: themeContext.helperText,
              },
              "& .Mui-disabled": {
                color: themeContext.errorColor,
                WebkitTextFillColor: themeContext.errorColor,
              },
              "& .MuiInput-underline.Mui-disabled:before": {
                borderBottomColor: themeContext.errorColor,
              },
              "& .Mui-disabled .MuiSvgIcon-root": {
                color: themeContext.errorColor,
              },
            }}
            slotProps={{
              popper: {
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, 8],
                    },
                  },
                ],
              },
              paper: {
                sx: {
                  backgroundColor: themeContext.surface,
                  background: themeContext.surface,
                  color: themeContext.secondary,
                  border: `1px solid ${themeContext.secondary}`,
                  borderRadius: "10px",
                },
              },
              listbox: {
                sx: {
                  "& .MuiAutocomplete-option": {
                    "&:hover": {
                      color: themeContext.primary,
                      filter: `drop-shadow(0px 0px 0.9px ${themeContext.primary})`,
                    },
                    '&[aria-selected="true"]': {
                      color: themeContext.primary,
                      filter: `drop-shadow(0px 0px 0.9px ${themeContext.primary})`,
                    },
                  },
                },
              },

              root: {
                "& .MuiInputLabel-root": {
                  color: themeContext.helperText,
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: themeContext.helperText,
                },
                "& .MuiInput-underline:before": {
                  borderBottomColor: themeContext.secondary,
                },
                "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                  borderBottomColor: themeContext.helperText,
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: themeContext.helperText,
                },
              },
              clearIndicator: {
                sx: {
                  visibility: "visible",
                  opacity: 1,
                  color: themeContext.secondary,
                  "&:hover": {
                    color: themeContext.primary, // color on hover
                    boxShadow: `inset 0px 0px 10px 2px ${themeContext.primary}`,
                  },
                },
              },
              popupIndicator: {
                sx: {
                  color: themeContext.secondary,
                  "&:hover": {
                    color: themeContext.primary, // color on hover
                    boxShadow: `inset 0px 0px 10px 2px ${themeContext.primary}`,
                  },
                },
              },
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label={allTags.length > 0 ? "Select Tag" : "No Tags, Crate Tag"}
                InputProps={{
                  ...params.InputProps,
                  style: { color: themeContext.secondary },
                  inputProps: {
                    ...params.inputProps,
                    readOnly: true,
                  },
                }}
              />
            )}
          />
        ) : tagTypeSelection && tagTypeSelection === "newTag" ? (
          <TextField
            autoFocus
            multiline
            slotProps={{
              input: {
                style: {
                  color: themeContext.secondary,
                },
              },
              inputLabel: {
                style: {
                  color: themeContext.helperText,
                },
              },
            }}
            fullWidth
            value={note.tag}
            variant="standard"
            name="message"
            onChange={(e) => setNote({ ...note, tag: e.target.value })}
            label="Enter Tag "
            sx={{
              "& .MuiInput-underline:before": {
                borderBottom: "1px solid",
                borderBottomColor: themeContext.helperText,
              },
              "& .MuiInput-underline:hover": {
                borderBottomColor: themeContext.secondary,
              },
              "& .MuiInput-underline:hover:before": {
                borderBottom: "2px solid",
                borderBottomColor: themeContext.helperText,
              },
              "& .MuiInput-underline:after": {
                borderBottom: "2px solid",
                borderBottomColor: themeContext.helperText,
              },
            }}
          />
        ) : null}
        <Grid
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "10px",
          }}
        >
          <Button
            sx={{
              color: themeContext.primary,
              height: 40,
              width: 90,
              borderRadius: "7px",
              fontWeight: "bold",
              textTransform: "none",
              border: `0.2px solid ${themeContext.primary}`,
              "&:hover": {
                boxShadow: `inset 0px 0px 22px 0px ${themeContext.primary}`,
              },
              "&:disabled": {
                pointerEvents: "unset",
                cursor: "not-allowed",
                boxShadow: "none",
                color: themeContext.textDisabled,
                border: `0.2px solid ${themeContext.textDisabled}`,
              },
            }}
            disabled={!note.note || loading}
            onClick={handleAddNote}
          >
            {loading ? (
              <CircularProgress
                color={themeContext.textDisabled}
                sx={{ color: themeContext.textDisabled }}
                size={20}
              />
            ) : (
              "Add"
            )}
          </Button>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default React.memo(withNotistackSnackbar(NotesDialog));
