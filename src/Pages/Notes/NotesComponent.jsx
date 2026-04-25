import {
  Autocomplete,
  Checkbox,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import "./NotesComponent.css";
import { useLazyQuery, useMutation } from "@apollo/client/react";
import {
  DELETE_MULTIPLE_NOTES,
  GET_NOTES,
  RESTORE_DELETED_NOTES,
} from "../../queries.js";
import {
  AddBox,
  DisabledByDefault,
  Delete,
  CopyAllRounded,
  CheckCircle,
  EditNote,
  ClearOutlined,
  Refresh,
  FilterListOff,
} from "@mui/icons-material";
import NotesDialog from "./NotesDialog.jsx";
import moment from "moment-timezone";
import { Masonry } from "@mui/lab";
import EditNotesDialog from "./EditNotesDialog.jsx";
import Linkify from "linkify-react";
import { useThemeContext } from "../../Hooks/ThemeContext.jsx";
import { withNotistackSnackbar } from "../../Hooks/SharedSnackbar1.jsx";
import { useHotkeyAndPlatform } from "../../Utils/useHotkeyAndPlatform.js";

var tagColorMap = {};
let timer = null;

const tagColors = [
  "springgreen",
  "cyan",
  "mediumslateblue",
  "yellow",
  "orange",
  "darkgray",
  "peachpuff",
  "lightseagreen",
  "lightgreen",
  "chocolate",
  "coral",
  "lightcoral",
  "purple",
  "indigo",
  "blueviolet",
  "white",
];

const NoteItem = memo(
  ({
    note,
    themeContext,
    checkedNotes,
    handleCheck,
    copied,
    handleCopy,
    handleEdit,
    tagColorMap,
  }) => {
    return (
      <Grid
        sx={{
          border: `2px solid ${
            checkedNotes.includes(note.id)
              ? themeContext.primary
              : themeContext.lightPrimary
          }`,
          wordBreak: "break-word",
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        <Grid
          sx={{
            width: "95%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Linkify
            options={{
              target: "_blank",
              rel: "noopener noreferrer",
              render: ({ tagName, attributes, content }) => {
                const { href, ...props } = attributes;
                return (
                  <a
                    href={href}
                    {...props}
                    style={{
                      textDecorationColor: themeContext.primary,
                      color: themeContext.primary,
                      wordBreak: "break-all",
                      wordWrap: "break-word",
                    }}
                  >
                    {content}
                  </a>
                );
              },
            }}
          >
            <Typography
              sx={{
                fontWeight: "500",
                whiteSpace: "pre-line",
                color: themeContext.secondary,
              }}
            >
              {note.note}
            </Typography>
          </Linkify>

          <Typography
            sx={{
              fontSize: "12.5px",
              fontWeight: "400",
              color: themeContext.primary,
              userSelect: "none",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              marginTop: "20px",
            }}
            component={"div"}
          >
            {note.tag && (
              <Chip
                sx={{
                  backgroundColor: tagColorMap[note.tag],
                  border: `1px solid ${themeContext.primary}`,
                  width: "fit-content",
                  fontWeight: "bold",
                  padding: 0,
                  height: "fit-content",
                  color: "#000",
                }}
                label={note.tag}
              />
            )}
            {note.createdAt}
          </Typography>
        </Grid>

        <Grid sx={{ display: "flex", gap: "10px", flexDirection: "column" }}>
          <Checkbox
            sx={{
              alignSelf: "flex-start",
              color: `inherit`,
              margin: 0,
              padding: "0.2rem",
              ":hover": {
                boxShadow: `inset 0px 0px 10px 2px ${themeContext.primary}`,
                color: themeContext.primary,
              },
              "&.Mui-checked": {
                color: themeContext.primary,
              },
            }}
            checked={checkedNotes.includes(note.id)}
            onClick={() => handleCheck(note.id)}
          />

          {copied && copied === note.id ? (
            <CheckCircle
              sx={{
                padding: "0.2rem",
                color: themeContext.themeIcons,
              }}
            />
          ) : (
            <CopyAllRounded
              sx={{
                padding: "0.2rem",
                cursor: "pointer",
                color: themeContext.themeIcons,
                borderRadius: "50%",
                ":hover": {
                  color: themeContext.primary,
                  boxShadow: `inset 0px 0px 10px 2px ${themeContext.primary}`,
                },
              }}
              onClick={() => handleCopy(note)}
            />
          )}

          <EditNote
            sx={{
              padding: "0.2rem",
              cursor: "pointer",
              color: themeContext.themeIcons,
              borderRadius: "50%",
              ":hover": {
                color: themeContext.primary,
                boxShadow: `inset 0px 0px 10px 2px ${themeContext.primary}`,
              },
            }}
            onClick={(e) => handleEdit(note, e)}
          />
        </Grid>
      </Grid>
    );
  }
);

const DeletedNoteItem = memo(
  ({ note, width, themeContext, selectedTrash, handleTrashCheck }) => {
    return (
      <Grid
        sx={{
          border: `1px solid ${themeContext.disabled}`,
          wordBreak: "break-word",
          display: "flex",
          justifyContent: "space-between",
          padding: "12px",
          borderRadius: "10px",
          backgroundColor: themeContext.disabledBackground,
          width: width, // use the width provided by Masonic
        }}
      >
        <Grid
          sx={{
            width: `95%`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Linkify
            options={{
              target: "_blank",
              rel: "noopener noreferrer",
              render: ({ tagName, attributes, content }) => {
                const { href, ...props } = attributes;
                return (
                  <a
                    href={href}
                    {...props}
                    style={{
                      textDecorationColor: themeContext.disabled,
                      color: themeContext.disabled,
                      wordBreak: "break-all",
                      wordWrap: "break-word",
                    }}
                  >
                    {content}
                  </a>
                );
              },
            }}
          >
            <Typography
              sx={{
                fontWeight: "500",
                whiteSpace: "pre-line",
                color: themeContext.disabled,
              }}
            >
              {note.note}
            </Typography>
          </Linkify>
          <Typography
            sx={{
              fontSize: "12.5px",
              fontWeight: "400",
              color: themeContext.disabled,
              userSelect: "none",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              marginTop: "20px",
            }}
            component={"div"}
          >
            {note.tag && (
              <Chip
                sx={{
                  backgroundColor: "lightgray",
                  border: `1px solid ${themeContext.primary}`,
                  width: "fit-content",
                  fontWeight: "bold",
                  padding: 0,
                  height: "fit-content",
                  color: "black",
                }}
                label={note.tag}
              />
            )}
            {note?.updatedAt}
          </Typography>
        </Grid>
        <Grid
          sx={{
            display: "flex",
            gap: "10px",
            flexDirection: "column",
          }}
        >
          <Checkbox
            sx={{
              alignSelf: "flex-start",
              color: themeContext.disabled,
              margin: 0,
              padding: "0.2rem",
              ":hover": {
                boxShadow: `inset 0px 0px 10px 2px ${themeContext.disabled}`,
              },
              "&.Mui-checked": {
                color: themeContext.disabled,
              },
            }}
            checked={selectedTrash.includes(note.id)}
            onClick={() => handleTrashCheck(note.id)}
          />
        </Grid>
      </Grid>
    );
  }
);

function NotesComponent({ notistackSnackbar }) {
  // Contexts
  const { themeContext } = useThemeContext();
  const { userPlatform, getHotkeyStringFromEvent } = useHotkeyAndPlatform();

  // States
  const [noteAnchorEl, setNoteAnchorEl] = useState(null);
  const [editNoteAnchorEl, setEditNoteAnchorEl] = useState(null);
  const [noteEditing, setNoteEditing] = useState(null);
  const [checkedNotes, setCheckedNotes] = useState([]);
  const [copied, setCopied] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [allRespNotes, setAllRespNotes] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [internalSearch, setInternalSearch] = useState("");
  const [filtersUsed, setFiltersUsed] = useState({
    tags: [],
    search: "",
    showOnlySelected: false,
  });
  const [selectedTrash, setSelectedTrash] = useState([]);
  const [restoreLoading, setRestoreLoading] = useState(false);

  const shrtcutTimer = useRef(false);

  const [getNotes, { data, loading, error }] = useLazyQuery(GET_NOTES, {
    onError: (err) => {
      notistackSnackbar.showSnackbar("Failed to fetch notes.", "error");
    },
    fetchPolicy: "network-only",
  });
  const [restoreDeletedNotes] = useMutation(RESTORE_DELETED_NOTES);
  const [deleteMultipleNotes] = useMutation(DELETE_MULTIPLE_NOTES);

  useEffect(() => {
    fetchNotes();
    if (!userPlatform) return;

    const handleKeyDown = (e) => {
      try {
        if (shrtcutTimer.current) return;
        const hotkey = getHotkeyStringFromEvent(e);
        switch (hotkey) {
          case import.meta.env.VITE_APP_HOTKEY3_COMB:
          case import.meta.env.VITE_APP_HOTKEY3:
            e.preventDefault();
            // console.log("Add new note");
            setNoteAnchorEl(e.currentTarget);
            break;

          default:
            return;
        }
        shrtcutTimer.current = true;

        setTimeout(() => {
          shrtcutTimer.current = false;
        }, 3000);
      } catch (err) {
        console.log("Error in shortcut", err);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const fetchNotes = async () => {
    try {
      const resp = await getNotes();
      // console.log("respNotes", resp.data.getAllNotes.response);
      const notesResponse = resp?.data?.getAllNotes?.response || [];
      if (notesResponse.length > 0) {
        let respNotes = notesResponse.map((note) => ({
          ...note,
          createdAt: moment.unix(note.createdAt).format("hh:mm A - DD/MMM/YY"),
          updatedAt: note.updatedAt
            ? moment.unix(note?.updatedAt).format("hh:mm A - DD/MMM/YY")
            : null,
        }));
        setAllRespNotes(respNotes);
        respNotes = respNotes.filter((note) => !note.isDeleted);

        const tags = [
          ...new Set(
            respNotes
              ?.map((note) => note.tag)
              .filter((tag) => tag)
              .flat()
              .sort()
          ),
        ];

        const tempTags = {};
        for (const { tag } of respNotes || []) {
          const key = tag?.trim() || "- Untagged -";
          tempTags[key] = (tempTags[key] || 0) + 1;
        }

        const tagWitCountArr = Object.entries(tempTags)?.map(
          ([tag, count]) => ({
            tag,
            count,
          })
        );
        tagWitCountArr.sort((a, b) => {
          if (a.tag === "- Untagged -") return -1;
          if (b.tag === "- Untagged -") return 1;
          return a.tag.localeCompare(b.tag);
        });

        tagColorMap = await tags.reduce((acc, currTag, index) => {
          const color = tagColors[index % tagColors.length];
          acc[currTag] = color;
          return acc;
        }, {});

        setAllTags(tagWitCountArr);
      }
    } catch (err) {
      console.log("err", err);
      notistackSnackbar.showSnackbar("Failed to fetch notes.", "error");
    }
  };

  // Memos
  const notesToDisplay = useMemo(() => {
    const { tags, search, showOnlySelected } = filtersUsed;

    let baseNotes = allRespNotes.filter((note) => !note.isDeleted);

    if (showOnlySelected && checkedNotes.length > 0) {
      baseNotes = baseNotes.filter((note) => checkedNotes.includes(note.id));
    }

    if (tags.length > 0) {
      const selectedTagNames = tags.map((t) => t.tag);

      baseNotes = baseNotes.filter((note) => {
        if (selectedTagNames.includes("- Untagged -")) {
          return selectedTagNames.includes(note.tag) || !note.tag;
        }
        return selectedTagNames.includes(note.tag);
      });
    }

    if (search) {
      baseNotes = baseNotes.filter((note) =>
        note.note.toLowerCase().includes(search)
      );
    }

    return baseNotes.length > 0 ? baseNotes : [];
  }, [filtersUsed, allRespNotes, checkedNotes]);

  const deletedNotes = useMemo(() => {
    return allRespNotes && allRespNotes?.length > 0
      ? allRespNotes.filter((note) => note.isDeleted)
      : [];
  }, [allRespNotes]);

  // Handlers
  const handleTagChange = (newTags) => {
    setFiltersUsed((prev) => ({
      ...prev,
      tags: newTags,
    }));
  };

  const handleSearch = (e) => {
    const query = e.target.value?.toLowerCase()?.trim() || "";
    setInternalSearch(query);

    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      setFiltersUsed((prev) => ({
        ...prev,
        search: query,
      }));
    }, 600);
  };

  const toggleDisplaySelected = () => {
    setFiltersUsed((prev) => ({
      ...prev,
      showOnlySelected: !prev.showOnlySelected,
    }));
  };

  const handleCheck = (id) => {
    setCheckedNotes((prev) =>
      prev.includes(id) ? prev.filter((note) => note !== id) : [...prev, id]
    );
  };

  const handleTrashCheck = (id) => {
    setSelectedTrash((prev) =>
      prev.includes(id) ? prev.filter((note) => note !== id) : [...prev, id]
    );
  };

  const handleClearSelection = () => {
    setCheckedNotes([]);
    setFiltersUsed((prev) => ({
      ...prev,
      showOnlySelected: false,
    }));
    notistackSnackbar.showSnackbar("Selection cleared.", "info");
  };

  const handleTrashClearSelection = () => {
    setSelectedTrash([]);
    notistackSnackbar.showSnackbar("Trash selection cleared.", "info");
  };

  const handleCopy = async (note) => {
    try {
      navigator.clipboard.writeText(note.note);
      setCopied(note.id);
      setTimeout(() => {
        setCopied(false);
      }, 4000);
    } catch (error) {
      notistackSnackbar.showSnackbar("Failed to copy note.", "error");
    }
  };

  const handleEdit = async (note, e) => {
    setNoteEditing(note);
    setEditNoteAnchorEl(e.currentTarget);
  };

  const handleMultipleDelete = async () => {
    try {
      if (checkedNotes.length > 0) {
        setDeleteLoading(true);
        const delResp = await deleteMultipleNotes({
          variables: { ids: checkedNotes },
        });
        // console.log("delResp", delResp);
        if (delResp.data.deleteMultipleNotes.status == 200) {
          notistackSnackbar.showSnackbar(
            delResp.data.deleteMultipleNotes.message,
            "success"
          );
          fetchNotes();
        } else {
          notistackSnackbar.showSnackbar(
            delResp.data.deleteMultipleNotes.message,
            "error"
          );
        }
        setCheckedNotes([]);
      } else {
        notistackSnackbar.showSnackbar("Please select note.", "error");
      }
    } catch (err) {
      // console.log("err", err);
      notistackSnackbar.showSnackbar("Failed to delete note(s).", "error");
    }
    setDeleteLoading(false);
  };

  const handleRestoreMultiple = async () => {
    try {
      if (selectedTrash.length > 0) {
        setRestoreLoading(true);
        const restResp = await restoreDeletedNotes({
          variables: { ids: selectedTrash },
        });
        // console.log("restResp", restResp);
        if (restResp.data.restoreDeletedNotes.status == 200) {
          notistackSnackbar.showSnackbar(
            restResp.data.restoreDeletedNotes.message,
            "success"
          );
          fetchNotes();
        } else {
          notistackSnackbar.showSnackbar(
            restResp.data.restoreDeletedNotes.message,
            "error"
          );
        }
        setSelectedTrash([]);
      } else {
        notistackSnackbar.showSnackbar(
          "Please select note from Recycle Bin.",
          "error"
        );
      }
    } catch (err) {
      // console.log("err", err);
      notistackSnackbar.showSnackbar("Failed to restore note(s).", "error");
    }
    setRestoreLoading(false);
  };

  const handleClearAllFilters = () => {
    setFiltersUsed({
      tags: [],
      search: "",
      showOnlySelected: false,
    });
    setInternalSearch("");
  };

  return (
    <>
      <Grid
        sx={{
          display: "flex",
          alignItems: "flex-end",
          marginBottom: "12px",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <Autocomplete
          value={filtersUsed.tags || []}
          options={allTags}
          getOptionLabel={(option) => `${option.tag} (${option.count})`}
          multiple
          // autoComplete
          disabled={allTags.length == 0}
          onChange={(e, value) => handleTagChange(value)}
          disableCloseOnSelect
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
            paper: {
              sx: {
                backgroundColor: themeContext.background,
                color: themeContext.secondary,
                border: `1px solid ${themeContext.primary}`,
                borderRadius: "10px",
                "& .MuiAutocomplete-noOptions": {
                  color: themeContext.secondary,
                },
              },
            },

            listbox: {
              sx: {
                color: themeContext.secondary, // base color
                "& *": {
                  color: themeContext.secondary,
                },
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
            chip: {
              sx: {
                height: "fit-content",
                color: themeContext.bodyText,
                border: `1px solid ${themeContext.lightPrimary}`,
                fontWeight: "bold",
                // display: "flex",
                // justifyContent: "space-between",
                "& .MuiChip-deleteIcon": {
                  color: themeContext.lightSecondary,
                  "&:hover": {
                    color: themeContext.secondary,
                  },
                },
              },
            },
            root: {
              "& .MuiInputLabel-root": {
                color: themeContext.lightSecondary,
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: themeContext.lightSecondary,
              },
              "& .MuiInput-underline:before": {
                borderBottomColor: themeContext.secondary,
              },
              "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                borderBottomColor: themeContext.lightSecondary,
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: themeContext.lightSecondary,
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
              label={allTags.length === 0 ? "No tags available" : "Filter Tags"}
              sx={{
                "& .MuiInput-underline:before": {
                  borderBottomColor: themeContext.helperText,
                },
                "& .MuiInput-underline:hover:before": {
                  borderBottomColor: themeContext.secondary,
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: themeContext.primary,
                },
              }}
              slotProps={{
                ...params.slotProps,
                inputLabel: {
                  color: themeContext.secondary,
                },
                input: {
                  ...params.slotProps?.input,
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
        <TextField
          variant="standard"
          id="search-notes"
          label={allTags.length === 0 ? "No notes available" : "Search Notes"}
          disabled={allTags.length == 0}
          onChange={(e) => handleSearch(e)}
          value={internalSearch}
          sx={{
            flexGrow: 1,
            maxWidth: "200px",
            "& .MuiInputLabel-root": {
              color: themeContext.lightSecondary,
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: themeContext.lightSecondary,
            },
            "& .MuiInput-underline:before": {
              borderBottomColor: themeContext.lightSecondary,
            },
            "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
              borderBottomColor: themeContext.lightSecondary,
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: themeContext.lightSecondary,
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
            input: {
              style: {
                color: themeContext.secondary,
              },
              endAdornment: (
                <InputAdornment position="end" title="Clear">
                  <ClearOutlined
                    onClick={(e) => handleSearch(e)}
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
                color: themeContext.lightSecondary,
              },
            },
          }}
        />
        <Chip
          sx={{
            color: themeContext.noThemeColor,
            backgroundColor: filtersUsed.showOnlySelected
              ? themeContext.secondary
              : themeContext.lightSecondary,
            fontWeight: "bold",
            transition: "all ease-in-out .2s",
            ":hover": {
              // backgroundColor: themeContext.chipShadow,
              boxShadow: `inset 0px 0px 30px 10px ${themeContext.primary}`,
            },
          }}
          disabled={checkedNotes.length === 0}
          label={`${checkedNotes.length} Selected / ${notesToDisplay.length} Dispalyed / ${allRespNotes.length}`}
          onClick={toggleDisplaySelected}
        />
        <Chip
          label={<FilterListOff />}
          onClick={handleClearAllFilters}
          title="Clear All Filters"
          sx={{
            borderRadius: "5px",
            cursor: "pointer",
            padding: "2px",
            color: themeContext.secondary,
            ">*": {
              color: themeContext.secondary,
            },
            "& .MuiChip-label": {
              padding: "2px",
            },
            "&:hover": {
              boxShadow: `inset 0px 0px 10px 2px ${themeContext.primary}`,
              color: themeContext.primary,
              ">*": {
                color: themeContext.primary,
              },
            },
            "&.Mui-disabled": {
              cursor: "not-allowed",
              color: themeContext.lightSecondary,
              boxShadow: "none",
              ">*": {
                color: themeContext.lightSecondary,
              },
            },
          }}
          disabled={
            !filtersUsed.showOnlySelected &&
            filtersUsed.search === "" &&
            filtersUsed.tags.length === 0
          }
        />
      </Grid>
      <Grid
        sx={{
          display: "flex",
          gap: "10px",
          justifyContent: "space-between",
          transition: "all ease-in-out .2s",
        }}
      >
        {loading ? (
          <CircularProgress
            sx={{ color: themeContext.primary }}
            color={themeContext.primary}
          />
        ) : (filtersUsed.showOnlySelected ||
            filtersUsed.search != "" ||
            filtersUsed.tags.length > 0) &&
          notesToDisplay.length === 0 ? (
          <Typography
            sx={{ fontWeight: "500", color: themeContext.subTitleText }}
          >
            Match Not Found.
          </Typography>
        ) : notesToDisplay.length === 0 ? (
          <Typography
            sx={{ fontWeight: "500", color: themeContext.subTitleText }}
          >
            No Data Found.
          </Typography>
        ) : (
          <Masonry
            // sequential
            columns={{ xs: 1, sm: 2, md: 2, lg: 3 }}
            spacing={2}
          >
            {notesToDisplay.map((note, index) => (
              <NoteItem
                key={note.id}
                note={note}
                themeContext={themeContext}
                checkedNotes={checkedNotes}
                handleCheck={handleCheck}
                copied={copied}
                handleCopy={handleCopy}
                handleEdit={handleEdit}
                tagColorMap={tagColorMap}
              />
            ))}
          </Masonry>
        )}
        <Grid sx={{ display: "flex", gap: "25px", flexDirection: "column" }}>
          <AddBox
            titleAccess="Add new note"
            sx={{
              cursor: "pointer",
              borderRadius: "5px",
              color: themeContext.themeIcons,
              "&:hover": {
                boxShadow: `inset 0px 0px 10px 2px ${themeContext.primary}`,
                color: themeContext.primary,
              },
            }}
            onClick={(e) =>
              setNoteAnchorEl((prev) => (prev ? null : e.currentTarget))
            }
          />
          {deleteLoading ? (
            <CircularProgress
              sx={{ color: themeContext.primary }}
              color={themeContext.themeIcons}
              size={23}
            />
          ) : (
            <Delete
              titleAccess="Delete Selected"
              sx={{
                borderRadius: "5px",
                cursor: "pointer",
                color: themeContext.themeIcons,
                "&:hover": {
                  boxShadow: `inset 0px 0px 10px 2px ${themeContext.primary}`,
                  color: themeContext.primary,
                },
              }}
              onClick={handleMultipleDelete}
              disabled={checkedNotes.length === 0 || deleteLoading}
            />
          )}

          <DisabledByDefault
            titleAccess="Clear Selection"
            sx={{
              borderRadius: "5px",
              cursor: "pointer",
              color: themeContext.themeIcons,
              "&:hover": {
                boxShadow: `inset 0px 0px 10px 2px ${themeContext.primary}`,
                color: themeContext.primary,
              },
            }}
            onClick={handleClearSelection}
          />
        </Grid>
      </Grid>
      <Grid
        style={{
          display: "flex",
          justifyContent: "center",
          color: themeContext.secondary,
          marginTop: "10px",
          marginBottom: "20px",
        }}
      >
        <Divider
          color={themeContext.lightSecondary}
          sx={{
            color: themeContext.lightSecondary,
            backgroundColor: themeContext.lightSecondary,
            opacity: 0.6,
            width: `100%`,
          }}
          style={{ color: themeContext.lightSecondary }}
          width="100%"
        />
      </Grid>
      {loading ? null : deletedNotes.length === 0 ? (
        <>
          <Typography
            sx={{
              fontWeight: "500",
              color: themeContext.subTitleText,
            }}
          >
            Trash is empty.
          </Typography>
        </>
      ) : (
        <Grid
          sx={{
            display: "flex",
            gap: "10px",
            justifyContent: "space-between",
            transition: "all ease-in-out .2s",
          }}
        >
          <Grid sx={{ width: "100%" }}>
            <Typography
              title="Permanently deleted After 1 day."
              sx={{
                fontWeight: "500",
                color: themeContext.subTitleText,
                marginBottom: "12px",
                textDecoration: "underline",
                textUnderlineOffset: "5px",
                textDecorationThickness: "0.1px",
              }}
            >
              Trash ({deletedNotes.length})
            </Typography>
            <Masonry
              // sequential
              columns={{ xs: 1, sm: 2, md: 2, lg: 3 }}
              spacing={2}
            >
              {deletedNotes.map((note, index) => (
                <DeletedNoteItem
                  key={note.id}
                  note={note}
                  themeContext={themeContext}
                  selectedTrash={selectedTrash}
                  handleTrashCheck={handleTrashCheck}
                />
              ))}
            </Masonry>
          </Grid>
          <Grid sx={{ display: "flex", gap: "25px", flexDirection: "column" }}>
            {restoreLoading ? (
              <CircularProgress
                sx={{ color: themeContext.primary }}
                color={themeContext.themeIcons}
                size={23}
              />
            ) : (
              <Refresh
                titleAccess="Restore Deleted Notes"
                sx={{
                  borderRadius: "5px",
                  cursor: "pointer",
                  color: themeContext.themeIcons,
                  "&:hover": {
                    boxShadow: `inset 0px 0px 10px 2px ${themeContext.primary}`,
                    color: themeContext.primary,
                  },
                }}
                onClick={handleRestoreMultiple}
                disabled={selectedTrash.length === 0 || restoreLoading}
              />
            )}
            <DisabledByDefault
              titleAccess="Clear trash selection"
              sx={{
                borderRadius: "5px",
                cursor: "pointer",
                color: themeContext.themeIcons,
                "&:hover": {
                  boxShadow: `inset 0px 0px 10px 2px ${themeContext.primary}`,
                  color: themeContext.primary,
                },
              }}
              onClick={handleTrashClearSelection}
            />
          </Grid>
        </Grid>
      )}
      {noteEditing && (
        <EditNotesDialog
          editAnchorEl={editNoteAnchorEl}
          closeEditNote={() => setEditNoteAnchorEl(null)}
          noteEditing={noteEditing}
          allTags={allTags}
          fetchNotes={fetchNotes}
        />
      )}
      <NotesDialog
        noteAnchorEl={noteAnchorEl}
        onClose={() => setNoteAnchorEl(null)}
        fetchNotes={fetchNotes}
        allTags={allTags}
      />
    </>
  );
}

export default memo(withNotistackSnackbar(NotesComponent));
