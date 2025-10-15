import React, { useEffect, useState } from "react";
import "./header.css";
import { Grid } from "@mui/system";
import { Chip, IconButton, Popover, Tooltip, Typography } from "@mui/material";
import {
  Call,
  GitHub,
  LinkedIn,
  LocationOn,
  Mail,
  Refresh,
} from "@mui/icons-material";

import HeaderImageDialog from "./HeaderImageDialog";

import { getFormattedTimePeriod } from "../../Utils/formatTimePeriod";
import MailDialog from "./MailDialog/MailDialog";
import { withAttachmentToggle } from "./MailDialog/attachmentContext";
import { useThemeContext } from "../../Hooks/ThemeContext";
import { useSecretContext } from "../../Hooks/SecretContext";

function Header({ attachmentToggle }) {
  const [mailDialogVisible, setMailDialogVisible] = useState(false);
  const [imageDialogVisible, setImageDialogVisible] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [age, setAge] = useState(
    getFormattedTimePeriod(`22-jun-1999`, `present`, `YMDhms`)
  );
  const [contacts, setContacts] = useState([
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
      name: "mail",
      icon: <Mail fontSize="medium" />,
      // ref: "mailto:deepaksulakheds@gmail.com",
      onclick: (e) => setMailDialogVisible(!mailDialogVisible),
      toolTip: "Contact Me",
    },
    {
      name: "location",
      icon: <LocationOn fontSize="medium" />,
      ref: "//www.google.com/maps/place/Gadag-Betageri,+Karnataka",
      toolTip: "Gadag | KA",
    },
  ]);

  const secretContext = useSecretContext();
  const { themeContext, toggleTheme } = useThemeContext();

  useEffect(() => {
    let ageInterval;
    const isAgeExists = contacts.some((contact) => contact.name === "age");

    if (
      secretContext.secretEnabled &&
      attachmentToggle.isAttachmentEnabled &&
      !isAgeExists
    ) {
      setContacts((prevContacts) => [
        ...prevContacts,
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
      ]);

      ageInterval = setInterval(() => {
        setAge(getFormattedTimePeriod(`22-jun-1999`, `present`, `YMDhms`));
      }, 1000);
    } else if (
      (!secretContext.secretEnabled || !attachmentToggle.isAttachmentEnabled) &&
      isAgeExists
    ) {
      setContacts((prevContacts) =>
        prevContacts.filter((contact) => contact.name !== "age")
      );

      clearInterval(ageInterval);
    }

    return () => {
      if (ageInterval) clearInterval(ageInterval);
    };
  }, [attachmentToggle.isAttachmentEnabled, secretContext.secretEnabled]);

  const handleSecretToggle = () => {
    if (attachmentToggle.isAttachmentEnabled) {
      attachmentToggle.toggleAttachment();
    }
    secretContext.toggleSecret();
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
          src="src/assets/Images/deepak.jpg"
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
              fontWeight: secretContext.secretEnabled ? "bold" : "400",
              border: secretContext.secretEnabled
                ? `1px solid ${themeContext.primary}`
                : `1px solid ${themeContext.dullThemeColor}`,
              boxShadow: `inset 0px 0px 15px 8px ${themeContext.chipShadow}`,
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
                      color: themeContext.noThemeColor,
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
                    color: themeContext.themeIcons,
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
              color: themeContext.noThemeColor,
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

export default React.memo(withAttachmentToggle(Header));
