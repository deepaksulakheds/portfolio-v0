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
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useMutation } from "@apollo/client/react";
import { useEffect, useState, memo } from "react";
import { ClearOutlined } from "@mui/icons-material";
import { withNotistackSnackbar } from "../../Hooks/SharedSnackbar1";
import { EDIT_NOTE } from "../../queries";
import { useThemeContext } from "../../Hooks/ThemeContext";

function EditNotesDialog({
  editAnchorEl,
  closeEditNote,
  noteEditing,
  allTags,
  fetchNotes,
  setNoteEditing,
  notistackSnackbar,
}) {
  // Contexts
  const { themeContext } = useThemeContext();

  // States
  const [editNote, { data, loading, error }] = useMutation(EDIT_NOTE);
  const [newNote, setNewNote] = useState({
    note: "",
    tag: "",
  });
  const [tagTypeSelection, setTagTypeSelection] = useState(null);

  useEffect(() => {
    if (noteEditing) {
      setNewNote(noteEditing);

      if (noteEditing.tag && noteEditing.tag.length) {
        setTagTypeSelection("select");
      } else {
        setTagTypeSelection("untagged");
      }
    }
    if (!editAnchorEl) {
      setTagTypeSelection(null);
    }
    return () => {
      setNewNote({ note: "", tag: "" });
      setTagTypeSelection(null);
    };
  }, [noteEditing, editAnchorEl]);

  const handleEditNote = async () => {
    try {
      // Validation
      if (!newNote.note || newNote.note == "") {
        notistackSnackbar.showSnackbar("Please enter a Note.", "error");
        return;
      }
      // Validation
      if (tagTypeSelection == "select" && (!newNote.tag || newNote.tag == "")) {
        notistackSnackbar.showSnackbar("Please select a tag.", "error");
        return;
      }
      if (tagTypeSelection == "newTag" && (!newNote.tag || newNote.tag == "")) {
        notistackSnackbar.showSnackbar("Please enter a Tag.", "error");
        return;
      }
      if (!tagTypeSelection || tagTypeSelection == "") {
        notistackSnackbar.showSnackbar("Please select a Tag Type.", "error");
        return;
      }

      const editResp = await editNote({
        variables: {
          id: newNote.id,
          note: newNote.note,
          tag: newNote.tag ? newNote.tag : null,
        },
      });
      // console.log("editResp", editResp.data);
      if (editResp.data.updateNote.status == 200) {
        notistackSnackbar.showSnackbar("Note edited successfully.", "success");
        fetchNotes(true);
        closeEditNote();
      } else {
        notistackSnackbar.showSnackbar(
          editResp.data.updateNote.message,
          "error"
        );
      }
    } catch (err) {
      console.log("err", err);
      notistackSnackbar.showSnackbar("Failed to edit note.", "error");
    }
  };

  const handleRadioChange = async (e) => {
    setTagTypeSelection(e.target.value);
    if (e.target.value == "untagged") {
      setNewNote({ ...newNote, tag: "" });
    }
  };

  const handleTagChange = (e, value) => {
    // console.log("value", value);
    setNewNote({ ...newNote, tag: value });
  };

  return (
    <Dialog
      disableRestoreFocus
      open={editAnchorEl}
      onClose={closeEditNote}
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
        Edit Note
      </DialogTitle>
      <Grid
        style={{
          display: "flex",
          justifyContent: "center",
          color: themeContext.secondary,
        }}
      >
        <Divider
          color={themeContext.secondary}
          sx={{
            color: themeContext.secondary,
            backgroundColor: themeContext.secondary,
            width: "92%",
          }}
          style={{ color: themeContext.secondary }}
          width="92%"
        />
      </Grid>
      <DialogContent
        sx={{
          padding: "20px",
          scrollbarWidth: "thin",
          color: themeContext.secondary,
        }}
      >
        <TextField
          multiline
          autoFocus
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
          value={newNote.note}
          variant="standard"
          name="message"
          onChange={(e) => setNewNote({ ...newNote, note: e.target.value })}
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
            disabled={allTags.length === 0}
            autoComplete
            value={newNote.tag}
            onChange={(e, value) => handleTagChange(e, value)}
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
                sx: {
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
                slotProps={{
                  ...params.slotProps,
                  inputLabel: {
                    color: themeContext.secondary,
                  },
                  input: {
                    ...params.slotProps?.input,
                    readOnly: true,
                    style: {
                      color: themeContext.secondary,
                    },
                  },
                  root: {
                    ...params.slotProps?.root,
                    style: {
                      color: themeContext.secondary,
                    },
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
                endAdornment: (
                  <InputAdornment position="end" title="Clear">
                    <ClearOutlined
                      onClick={() => setNewNote({ ...newNote, tag: "" })}
                      sx={{
                        color: themeContext.secondary,
                        cursor: "pointer",
                        borderRadius: "50%",
                        "&:hover": {
                          boxShadow: `inset 0px 0px 10px 2px ${themeContext.primary}`,
                          color: themeContext.primary,
                        },
                      }}
                    />
                  </InputAdornment>
                ),
              },
              inputLabel: {
                style: {
                  color: themeContext.helperText,
                },
              },
            }}
            fullWidth
            value={newNote.tag}
            variant="standard"
            name="message"
            onChange={(e) => setNewNote({ ...newNote, tag: e.target.value })}
            label="Enter Tag "
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
              border: `1px solid ${themeContext.primary}`,
              "&:hover": {
                boxShadow: `inset 0px 0px 22px 0px ${themeContext.primary}`,
              },
              "&:disabled": {
                pointerEvents: "unset",
                cursor: "not-allowed",
                boxShadow: "none",
                color: themeContext.textDisabled,
                border: `1px solid ${themeContext.textDisabled}`,
              },
            }}
            disabled={
              !newNote.note ||
              loading ||
              (newNote.note === noteEditing.note &&
                newNote.tag === noteEditing.tag)
            }
            onClick={() => handleEditNote()}
          >
            {loading ? (
              <CircularProgress
                color={themeContext.textDisabled}
                sx={{ color: themeContext.textDisabled }}
                size={20}
              />
            ) : (
              "Save"
            )}
          </Button>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default memo(withNotistackSnackbar(EditNotesDialog));
