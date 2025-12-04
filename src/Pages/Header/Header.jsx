import { useEffect, useState, memo, useRef, useMemo } from "react";
import "./header.css";
import { Grid } from "@mui/system";
import { Chip, IconButton, Popover, Tooltip, Typography } from "@mui/material";
import {
  Call,
  GitHub,
  LinkedIn,
  LocationOn,
  Mail,
  Notes,
  Refresh,
} from "@mui/icons-material";
import HeaderImageDialog from "./HeaderImageDialog";
import { getFormattedTimePeriod } from "../../Utils/formatTimePeriod";
import MailDialog from "./MailDialog/MailDialog";
import { withAttachmentToggle } from "./MailDialog/attachmentContext";
import { useThemeContext } from "../../Hooks/ThemeContext";
import { useSecretContext } from "../../Hooks/SecretContext";
import { useNavigate } from "react-router-dom";
import { useNavigationMenusContext } from "../../Hooks/NavMenuContext";
import { useHotkeyAndPlatform } from "../../Utils/useHotkeyAndPlatform";

let ageInterval;

const AGE_BIRTH_DATE = `22-jun-1999`;
const INIT_CONTACS = [
  {
    name: "Github",
    icon: <GitHub fontSize="medium" />,
    ref: "//github.com/deepaksulakheds",
    toolTip: "Deepak Sulakhe | Github",
  },
  {
    name: "LinkedIn",
    icon: <LinkedIn fontSize="medium" />,
    ref: "//www.linkedin.com/in/deepaksulakheds/",
    toolTip: "Deepak Sulakhe | LinkedIn",
  },
  {
    name: "call",
    icon: <Call fontSize="medium" />,
    ref: null,
    toolTip: "Call",
  },
  {
    name: "location",
    icon: <LocationOn fontSize="medium" />,
    ref: "//www.google.com/maps/place/Gadag-Betageri,+Karnataka",
    toolTip: "Gadag | KA",
  },
];

function Header({ attachmentToggle }) {
  const [mailDialogVisible, setMailDialogVisible] = useState(false);
  const [imageDialogVisible, setImageDialogVisible] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [age, setAge] = useState(
    getFormattedTimePeriod(AGE_BIRTH_DATE, `present`, `YMDhms`)
  );
  const navigate = useNavigate();
  const { setNavigationMenus } = useNavigationMenusContext();
  const secretContext = useSecretContext();
  const { themeContext } = useThemeContext();
  const shrtcutTimer = useRef(false);
  const { userPlatform, getHotkeyStringFromEvent } = useHotkeyAndPlatform();

  // -------------- Memos ----------------
  const contacts = useMemo(() => {
    const BASE_CONTACTS = [...INIT_CONTACS];
    BASE_CONTACTS.splice(3, 0, {
      name: "mail",
      icon: <Mail fontSize="medium" />,
      onclick: () => setMailDialogVisible((prev) => !prev),
      toolTip: "Contact Me",
    });

    if (secretContext.secretEnabled && attachmentToggle.isAttachmentEnabled) {
      return [
        ...BASE_CONTACTS,
        {
          name: "age",
          icon: <Refresh fontSize="medium" />,
          onclick: (e) =>
            setAnchorEl((prev) => (prev ? null : e.currentTarget)),
          toolTip: null,
          style: {
            boxShadow: `inset 0px 0px 10px 2px var(--theme-color)`,
            color: `var(--theme-color)`,
          },
        },
      ];
    }

    return BASE_CONTACTS;
  }, [secretContext.secretEnabled, attachmentToggle.isAttachmentEnabled]);

  // --------------Effect Hooks----------------
  useEffect(() => {
    // Shortcut Key Handler part
    const handleKeyDown = (e) => {
      try {
        const hotkey = getHotkeyStringFromEvent(e);

        // console.log("Hotkey pressed:", hotkey);
        switch (hotkey) {
          case import.meta.env.VITE_APP_HOTKEY1_COMB:
          case import.meta.env.VITE_APP_HOTKEY1:
            if (!shrtcutTimer.current) {
              e.preventDefault();
              if (
                secretContext.secretEnabled &&
                !attachmentToggle.isAttachmentEnabled &&
                location.pathname?.toLowerCase()?.includes(`experience`)
              ) {
                attachmentToggle.toggleAttachment();
              } else if (attachmentToggle.isAttachmentEnabled) {
                attachmentToggle.toggleAttachment();

                if (location.pathname?.toLowerCase()?.includes(`notes`)) {
                  navigate("/", { replace: true });
                }

                shrtcutTimer.current = true;
                setTimeout(() => {
                  shrtcutTimer.current = false;
                }, 3000);
              }
            }
            break;

          case import.meta.env.VITE_APP_HOTKEY2_COMB:
          case import.meta.env.VITE_APP_HOTKEY2:
            if (
              attachmentToggle.isAttachmentEnabled ||
              secretContext.secretEnabled
            ) {
              e.preventDefault();
              if (location.pathname?.toLowerCase()?.includes(`notes`)) {
                navigate("/", { replace: true });
              }
              secretContext.secretEnabled && secretContext.toggleSecret();
              attachmentToggle.toggleAttachment("OFF");
              shrtcutTimer.current = true;

              setTimeout(() => {
                shrtcutTimer.current = false;
              }, 3000);
            }
            break;

          case import.meta.env.VITE_APP_HOTKEY4_COMB:
          case import.meta.env.VITE_APP_HOTKEY4:
            if (!shrtcutTimer.current) {
              e.preventDefault();
              if (
                !secretContext.secretEnabled &&
                location.pathname?.includes(`experience`)
              ) {
                secretContext.toggleSecret();
              } else if (secretContext.secretEnabled) {
                secretContext.toggleSecret();
                if (attachmentToggle.isAttachmentEnabled) {
                  attachmentToggle.toggleAttachment("OFF");
                }
                if (location.pathname?.toLowerCase()?.includes(`notes`)) {
                  navigate("/", { replace: true });
                }

                shrtcutTimer.current = true;

                setTimeout(() => {
                  shrtcutTimer.current = false;
                }, 3000);
              }
            }
            break;

          case import.meta.env.VITE_APP_HOTKEY5:
          case import.meta.env.VITE_APP_HOTKEY5_COMB:
            if (
              attachmentToggle.isAttachmentEnabled ||
              secretContext.secretEnabled
            ) {
              e.preventDefault();
              if (location.pathname?.toLowerCase()?.includes(`notes`)) {
                navigate("/", { replace: true });
              }
              secretContext.secretEnabled && secretContext.toggleSecret();
              attachmentToggle.toggleAttachment("OFF");
              shrtcutTimer.current = true;

              setTimeout(() => {
                shrtcutTimer.current = false;
              }, 3000);
            }
            break;

          case "cmd+1":
          case "ctrl+1":
            e.preventDefault();
            navigate("/", { replace: true });
            break;

          case "cmd+2":
          case "ctrl+2":
            e.preventDefault();
            navigate("/experience", { replace: true });
            break;

          case "cmd+3":
          case "ctrl+3":
            e.preventDefault();
            navigate("/projects", { replace: true });
            break;

          case "cmd+4":
          case "ctrl+4":
            e.preventDefault();
            navigate("/resume", { replace: true });
            break;

          case "cmd+5":
          case "ctrl+5":
            if (
              attachmentToggle.isAttachmentEnabled &&
              secretContext.secretEnabled
            ) {
              e.preventDefault();
              navigate("/notes", { replace: true });
            }
            break;

          default:
            return;
        }
      } catch (err) {
        console.log("Error in shortcut handler", err);
      }
    };

    if (userPlatform) {
      document.addEventListener("keydown", handleKeyDown);
    }

    // Navigation Menu Update part
    setNavigationMenus((prev) => {
      const hasNotes = prev.some((item) => item.label === "Notes");
      const shouldHaveNotes =
        attachmentToggle.isAttachmentEnabled && secretContext.secretEnabled;

      if (shouldHaveNotes && !hasNotes) {
        return [...prev, { label: "Notes", path: "/notes", icon: <Notes /> }];
      } else if (!shouldHaveNotes && hasNotes) {
        return prev.filter((item) => item.label !== "Notes");
      }

      return prev;
    });

    // Age Update part
    if (secretContext.secretEnabled && attachmentToggle.isAttachmentEnabled) {
      ageInterval = setInterval(() => {
        setAge(getFormattedTimePeriod(AGE_BIRTH_DATE, `present`, `YMDhms`));
      }, 1000);
    } else {
      ageInterval && clearInterval(ageInterval);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (ageInterval) clearInterval(ageInterval);
    };
  }, [attachmentToggle.isAttachmentEnabled, secretContext.secretEnabled]);

  const handleSecretToggle = () => {
    if (shrtcutTimer.current) return;

    if (
      !secretContext.secretEnabled &&
      location.pathname?.toLowerCase()?.includes(`experience`)
    ) {
      secretContext.toggleSecret();
    } else if (secretContext.secretEnabled) {
      secretContext.toggleSecret();
      if (attachmentToggle.isAttachmentEnabled) {
        attachmentToggle.toggleAttachment("OFF");
      }
    }
  };

  return (
    <Grid
      className="headerContainer"
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        backgroundColor: themeContext.surface,
        boxShadow: `inset 0px 0px 35px -30px ${themeContext.containerShadowColor}`,
        border: `0.5px solid ${themeContext.borderColor}`,
      }}
    >
      <Grid sx={{ display: "flex" }}>
        <img
          title="View more images"
          onClick={() => setImageDialogVisible(true)}
          loading="lazy"
          src="./Images/deepak.jpg"
          className="image"
        />
        <Grid>
          <Typography
            variant="h5"
            sx={{
              fontSize: "1.8rem",
              fontWeight: "550",
              marginBlock: "5px",
              color: themeContext.titleText,
            }}
          >
            Deepak Sulakhe
          </Typography>
          <Chip
            clickable
            disableRipple
            onDoubleClick={(e) => handleSecretToggle()}
            label="Software Engineer 1"
            sx={{
              color: themeContext.subTitleText,
              cursor: "text",
              fontWeight: secretContext.secretEnabled ? "bolder" : "400",
              boxShadow: `inset 0px 0px 15px 8px ${themeContext.chipShadow}`,
              border: secretContext.secretEnabled
                ? `1px solid ${themeContext.primary}`
                : `0.2px solid ${themeContext.subTitleText}`,
              "&:hover": {
                // backgroundColor: "inherit",
                boxShadow: `inset 0px 0px 15px 8px ${themeContext.chipShadow}`,
                cursor: "text",
              },
            }}
          />
          <Grid
            sx={{
              display: "flex",
              gap: "6px",
              marginTop: "5px",
              flexWrap: "wrap",
            }}
          >
            {contacts.map((contact) => (
              <Tooltip
                arrow
                key={contact.name}
                title={contact.toolTip}
                slotProps={{
                  tooltip: {
                    sx: {
                      // backgroundColor: "transparent",
                      // boxShadow: `inset 0px 0px 30px 0px ${themeContext.primary}`,
                      backgroundColor: themeContext.primary,
                      fontSize: 13,
                      color: themeContext.colorOnPrimary,
                    },
                  },
                  arrow: {
                    sx: {
                      color: themeContext.primary,
                    },
                  },
                }}
              >
                <IconButton
                  target="blank"
                  sx={{
                    padding: "0.5rem",
                    transition: "all ease-in-out 0.15s",
                    color: themeContext.navItemTextColor,
                    ...(anchorEl && contact.style),
                    "&:hover": {
                      boxShadow: `inset 0px 0px 10px 2px ${themeContext.primary}`,
                      color: themeContext.primary,
                    },
                  }}
                  href={contact?.ref}
                  onClick={contact.onclick ? contact.onclick : null}
                >
                  {contact.icon}
                </IconButton>
              </Tooltip>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <MailDialog
        mailDialogVisible={mailDialogVisible}
        onclose={() => setMailDialogVisible(!mailDialogVisible)}
        secretAlert={secretContext.secretEnabled}
      />
      <HeaderImageDialog
        imageDialogVisible={imageDialogVisible}
        onClose={() => setImageDialogVisible(!imageDialogVisible)}
      />
      <Popover
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        slotProps={{
          paper: {
            sx: {
              // boxShadow: `inset 0px 0px 30px 0px ${themeContext.primary}`,
              backgroundColor: themeContext.primary,
              fontSize: 13,
              color: themeContext.colorOnPrimary,
              marginTop: "5px",
              padding: "8px",
            },
          },
        }}
      >
        {age}
      </Popover>
    </Grid>
  );
}

export default memo(withAttachmentToggle(Header));
