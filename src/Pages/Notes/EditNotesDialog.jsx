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
import React, { useEffect, useState } from "react";
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
        fetchNotes();
        closeEditNote();
      } else {
        notistackSnackbar.showSnackbar(
          editResp.data.updateNote.message,
          "error"
        );
      }
    } catch (err) {
      console.log("err", err);
      notistackSnackbar.showSnackbar(err.message, "error");
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
            background: themeContext.themeBackground,
            border: `0.5px solid ${themeContext.dullThemeColor}`,
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
          color: themeContext.oppositeTheme,
        }}
      >
        <Divider
          color={themeContext.oppositeTheme}
          sx={{
            color: themeContext.oppositeTheme,
            backgroundColor: themeContext.oppositeTheme,
          }}
          style={{ color: themeContext.oppositeTheme }}
          width="92%"
        />
      </Grid>
      <DialogContent
        sx={{
          padding: "20px",
          scrollbarWidth: "thin",
          color: themeContext.oppositeTheme,
        }}
      >
        <TextField
          multiline
          autoFocus
          slotProps={{
            input: {
              style: {
                color: themeContext.oppositeTheme,
              },
            },
            inputLabel: {
              style: {
                color: themeContext.dullOppositeTheme,
              },
            },
          }}
          sx={{
            "& .MuiInput-underline:before": {
              borderBottom: "1px solid",
              borderBottomColor: themeContext.dullOppositeTheme,
            },
            "& .MuiInput-underline:hover": {
              borderBottomColor: themeContext.dullOppositeTheme,
            },
            "& .MuiInput-underline:hover:before": {
              borderBottom: "2px solid",
              borderBottomColor: themeContext.dullOppositeTheme,
            },
            "& .MuiInput-underline:after": {
              borderBottom: "2px solid",
              borderBottomColor: themeContext.dullOppositeTheme,
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
                    color: themeContext.oppositeTheme,
                    "&.Mui-checked": {
                      color: themeContext.oppositeTheme,
                    },
                  }}
                />
              }
              label="Select"
              sx={{
                color: themeContext.oppositeTheme,
                "& .Mui-disabled": {
                  color: themeContext.disabledColor,
                  WebkitTextFillColor: themeContext.disabledColor,
                },
                "& .MuiInput-underline.Mui-disabled:before": {
                  borderBottomColor: themeContext.disabledColor,
                },
                "& .Mui-disabled .MuiSvgIcon-root": {
                  color: themeContext.disabledColor,
                },
              }}
            />
            <FormControlLabel
              value="newTag"
              control={
                <Radio
                  sx={{
                    color: themeContext.oppositeTheme,
                    "&.Mui-checked": {
                      color: themeContext.oppositeTheme,
                    },
                  }}
                />
              }
              label="New Tag"
              sx={{ color: themeContext.oppositeTheme }}
            />
            <FormControlLabel
              value="untagged"
              control={
                <Radio
                  sx={{
                    color: themeContext.oppositeTheme,
                    "&.Mui-checked": {
                      color: themeContext.oppositeTheme,
                    },
                  }}
                />
              }
              label="- Untagged -"
              sx={{ color: themeContext.oppositeTheme }}
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
              //   color: themeContext.oppositeTheme,
              // },
              "& .MuiInputLabel-root": {
                color: themeContext.dullOppositeTheme,
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: themeContext.dullOppositeTheme,
              },
              "& .MuiInput-underline:before": {
                borderBottomColor: themeContext.dullOppositeTheme,
              },
              "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                borderBottomColor: themeContext.dullOppositeTheme,
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: themeContext.dullOppositeTheme,
              },
              "& .Mui-disabled": {
                color: themeContext.disabledColor,
                WebkitTextFillColor: themeContext.disabledColor,
              },
              "& .MuiInput-underline.Mui-disabled:before": {
                borderBottomColor: themeContext.disabledColor,
              },
              "& .Mui-disabled .MuiSvgIcon-root": {
                color: themeContext.disabledColor,
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
                  backgroundColor: themeContext.themeBackground,
                  background: themeContext.themeBackground,
                  color: themeContext.oppositeTheme,
                  border: `1px solid ${themeContext.oppositeTheme}`,
                  borderRadius: "10px",
                },
              },
              listbox: {
                sx: {
                  "& .MuiAutocomplete-option": {
                    "&:hover": {
                      color: themeContext.themeColor,
                      filter: `drop-shadow(0px 0px 0.9px ${themeContext.themeColor})`,
                    },
                    '&[aria-selected="true"]': {
                      color: themeContext.themeColor,
                      filter: `drop-shadow(0px 0px 0.9px ${themeContext.themeColor})`,
                    },
                  },
                },
              },

              root: {
                "& .MuiInputLabel-root": {
                  color: themeContext.dullOppositeTheme,
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: themeContext.dullOppositeTheme,
                },
                "& .MuiInput-underline:before": {
                  borderBottomColor: themeContext.oppositeTheme,
                },
                "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                  borderBottomColor: themeContext.dullOppositeTheme,
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: themeContext.dullOppositeTheme,
                },
              },
              clearIndicator: {
                sx: {
                  visibility: "visible",
                  opacity: 1,
                  color: themeContext.oppositeTheme,
                  "&:hover": {
                    color: themeContext.themeColor, // color on hover
                    boxShadow: `inset 0px 0px 10px 2px ${themeContext.themeColor}`,
                  },
                },
              },
              popupIndicator: {
                sx: {
                  color: themeContext.oppositeTheme,
                  "&:hover": {
                    color: themeContext.themeColor, // color on hover
                    boxShadow: `inset 0px 0px 10px 2px ${themeContext.themeColor}`,
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
                  style: { color: themeContext.oppositeTheme },
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
                  color: themeContext.oppositeTheme,
                },
                endAdornment: (
                  <InputAdornment position="end" title="Clear">
                    <ClearOutlined
                      onClick={() => setNewNote({ ...newNote, tag: "" })}
                      sx={{
                        color: themeContext.oppositeTheme,
                        cursor: "pointer",
                        borderRadius: "50%",
                        "&:hover": {
                          boxShadow: `inset 0px 0px 10px 2px ${themeContext.themeColor}`,
                          color: themeContext.themeColor,
                        },
                      }}
                    />
                  </InputAdornment>
                ),
              },
              inputLabel: {
                style: {
                  color: themeContext.dullOppositeTheme,
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
                borderBottomColor: themeContext.dullOppositeTheme,
              },
              "& .MuiInput-underline:hover": {
                borderBottomColor: themeContext.dullOppositeTheme,
              },
              "& .MuiInput-underline:hover:before": {
                borderBottom: "2px solid",
                borderBottomColor: themeContext.dullOppositeTheme,
              },
              "& .MuiInput-underline:after": {
                borderBottom: "2px solid",
                borderBottomColor: themeContext.dullOppositeTheme,
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
              color: themeContext.oppositeTheme,
              height: 40,
              width: 90,
              borderRadius: "7px",
              fontWeight: "bold",
              textTransform: "none",
              border: `1px solid ${themeContext.oppositeTheme}`,
              "&:hover": {
                boxShadow: `inset 0px 0px 22px 0px ${themeContext.themeColor}`,
              },
              "&:disabled": {
                pointerEvents: "unset",
                cursor: "not-allowed",
                boxShadow: "none",
                color: themeContext.disabledColor,
                border: `1px solid ${themeContext.disabledColor}`,
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
                color={themeContext.disabledColor}
                sx={{ color: themeContext.disabledColor }}
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

export default React.memo(withNotistackSnackbar(EditNotesDialog));
