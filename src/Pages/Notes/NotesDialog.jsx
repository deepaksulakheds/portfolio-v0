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
        Notes
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
          autoFocus
          multiline
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
            autoComplete
            value={note.tag}
            onChange={(e, value) => handleTagChange(e, value)}
            disabled={allTags.length === 0}
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
              },
              inputLabel: {
                style: {
                  color: themeContext.dullOppositeTheme,
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
                borderBottomColor: themeContext.dullOppositeTheme,
              },
              "& .MuiInput-underline:hover": {
                borderBottomColor: themeContext.oppositeTheme,
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
              border: `0.2px solid ${themeContext.oppositeTheme}`,
              "&:hover": {
                boxShadow: `inset 0px 0px 22px 0px ${themeContext.themeColor}`,
              },
              "&:disabled": {
                pointerEvents: "unset",
                cursor: "not-allowed",
                boxShadow: "none",
                color: themeContext.disabledColor,
                border: `0.2px solid ${themeContext.disabledColor}
                }`,
              },
            }}
            disabled={!note.note || loading}
            onClick={handleAddNote}
          >
            {loading ? (
              <CircularProgress
                color={themeContext.disabledColor}
                sx={{ color: themeContext.disabledColor }}
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
