import {
  Grid,
  Dialog,
  DialogTitle,
  Divider,
  DialogContent,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import "./MailDialog.css";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import CancelIcon from "@mui/icons-material/Cancel";
import { withAttachmentToggle } from "./attachmentContext";
import { useMutation } from "@apollo/client/react";
import { withNotistackSnackbar } from "../../../Hooks/SharedSnackbar1";
import { useThemeContext } from "../../../Hooks/ThemeContext";
import { SEND_MAIL_QUERY } from "../../../queries";

function MailDialog({
  mailDialogVisible,
  onclose,
  notistackSnackbar,
  secretAlert,
  attachmentToggle,
}) {
  // Contexts
  const { themeContext } = useThemeContext();

  // States
  const [sendMail] = useMutation(SEND_MAIL_QUERY);
  const [contactDetails, setContactDetails] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [filesUploaded, setFilesUploaded] = useState([]);
  const [secretMailAlert, setSecretMailAlert] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  // Effects
  useEffect(() => {
    // console.log("cleared");
    setContactDetails({ name: "", email: "", subject: "", message: "" });
    setErrors({ name: "", email: "" });
    setSecretMailAlert(false);
    setFilesUploaded([]);
  }, [mailDialogVisible]);

  // Functions and Handlers
  const handleChange = async (event) => {
    setContactDetails({
      ...contactDetails,
      [event.target.name]: event.target.value,
    });

    handleValidity(event);
  };

  const handleFilesUpload = async (event) => {
    // const files = [];
    // for (const file of Array.from(event.target.files)) {
    //   const buffer = await file.arrayBuffer();
    //   // console.log("buffer", buffer);
    //   // const bytes = new Uint8Array(buffer);
    //   // files.push({
    //   //   fileName: file.name,
    //   //   Uint8Array: file.text(),
    //   // });
    //   const encrypted = CryptoJS.AES.encrypt(
    //     JSON.stringify(buffer),
    //     import.meta.env.VITE_APP_AES_SECRET
    //   ).toString();
    //   console.log("encrypted", encrypted);

    //   const resp = await axios.request({
    //     method: "post",
    //     maxBodyLength: Infinity,
    //     url: import.meta.env.VITE_APP_BACKEND_URL,
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     data: JSON.stringify({ payload: encrypted }),
    //   });
    // }
    if (event.target.files.length) {
      if (
        Array.from(event.target.files).length > 5 ||
        Array.from(event.target.files).length + filesUploaded.length > 5
      ) {
        notistackSnackbar.showSnackbar("Max 5 files allowed.", "error");
      } else {
        for (const file of Array.from(event.target.files)) {
          const existsIndex = filesUploaded.findIndex(
            (f) => f.name === file.name
          );
          if (existsIndex >= 0) {
            notistackSnackbar.showSnackbar(
              `File: "${
                file.name.length > 7 ? `${file.name.slice(0, 7)}...` : file.name
              }" already uploaded at position ${existsIndex + 1}.`,
              "error"
            );
          } else {
            setFilesUploaded((prevFiles) => [...prevFiles, file]);
          }
        }
      }
    }
  };

  const handleRemoveFile = async (removedFile) => {
    setFilesUploaded(
      filesUploaded.filter((file) => file.name !== removedFile.name)
    );
  };

  const handleValidity = (event) => {
    if (event.target.name === "name") {
      const nameRegex = /^[A-Za-z ]{3,30}$/;
      if (!nameRegex.test(event.target.value)) {
        setErrors({ ...errors, name: "Only alphabets and spaces are allowed" });
      } else {
        setErrors({ ...errors, name: "" });
      }
    } else if (event.target.name === "email") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(event.target.value)) {
        setErrors({ ...errors, email: "Enter a valid email address" });
      } else {
        setErrors({ ...errors, email: "" });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        contactDetails.email &&
        contactDetails.message &&
        contactDetails.name &&
        contactDetails.subject
      ) {
        setLoading(true);
        const resp = await sendMail({
          variables: { ...contactDetails, isSecretAlert: secretMailAlert },
        });
        if (resp.data && resp.data.sendMail.status == 200) {
          notistackSnackbar.showSnackbar(
            "Message sent. I'll get back soon.",
            "success"
          );
          onclose();
        } else {
          notistackSnackbar.showSnackbar(resp.data.sendMail.message, "error");
        }
        setLoading(false);
      } else {
        notistackSnackbar.showSnackbar("Please fill all the fields.", "error");
      }
    } catch (err) {
      setLoading(false);
      // console.log("dialog error", JSON.stringify(err, null, 2));
      notistackSnackbar.showSnackbar(
        "Failed to send mail. Please contact on LinkedIn.",
        "error"
      );
    }
  };

  const secretMailAlertHandler = async () => {
    if (secretAlert) {
      setSecretMailAlert(!secretMailAlert);
    }
  };

  return (
    <Dialog
      disableRestoreFocus
      open={mailDialogVisible}
      onClose={onclose}
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
        onClick={secretMailAlertHandler}
      >
        Contact Me
      </DialogTitle>
      <Grid
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Divider
          color={themeContext.secondary}
          sx={{
            color: themeContext.secondary,
            backgroundColor: themeContext.secondary,
          }}
          style={{ color: themeContext.secondary }}
          width="92%"
        />
      </Grid>
      <DialogContent
        sx={{
          padding: "20px",
          scrollbarWidth: "thin",
        }}
      >
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
          }}
        >
          <Grid>
            <TextField
              autoFocus
              slotProps={{
                input: {
                  style: {
                    color: errors.name
                      ? themeContext.errorColor
                      : themeContext.bodyText,
                  },
                },
                inputLabel: {
                  style: {
                    color: errors.name
                      ? themeContext.errorColor
                      : themeContext.helperText,
                  },
                },
              }}
              sx={{
                "& .MuiInput-root": {
                  caretColor: themeContext.helperText,
                },
                "& .MuiInput-underline:before": {
                  borderBottom: "1px solid",
                  borderBottomColor: errors.name
                    ? themeContext.errorColor
                    : themeContext.helperText,
                },
                "& .MuiInput-underline:hover": {
                  borderBottomColor: themeContext.helperText,
                },
                "& .MuiInput-underline:hover:before": {
                  borderBottom: "2px solid",
                  borderBottomColor: errors.name
                    ? themeContext.errorColor
                    : themeContext.helperText,
                },
                "& .MuiInput-underline:after": {
                  borderBottom: "2px solid",
                  borderBottomColor: errors.name
                    ? themeContext.errorColor
                    : themeContext.helperText,
                },
              }}
              variant="standard"
              fullWidth
              value={contactDetails.name}
              name="name"
              onChange={handleChange}
              label={errors.name ? "Enter valid name." : "Enter Name *"}
              error={!!errors.name}
              // onBlur={handleValidity}
            />
            <TextField
              slotProps={{
                input: {
                  style: {
                    color: errors.email
                      ? themeContext.errorColor
                      : themeContext.bodyText,
                  },
                },
                inputLabel: {
                  style: {
                    color: errors.email
                      ? themeContext.errorColor
                      : themeContext.helperText,
                  },
                },
              }}
              sx={{
                "& .MuiInput-root": {
                  caretColor: themeContext.helperText,
                },
                "& .MuiInput-underline:before": {
                  borderBottom: "1px solid",
                  borderBottomColor: errors.email
                    ? themeContext.errorColor
                    : themeContext.helperText,
                },
                "& .MuiInput-underline:hover": {
                  borderBottomColor: themeContext.helperText,
                },
                "& .MuiInput-underline:hover:before": {
                  borderBottom: "2px solid",
                  borderBottomColor: errors.email
                    ? themeContext.errorColor
                    : themeContext.helperText,
                },
                "& .MuiInput-underline:after": {
                  borderBottom: "2px solid",
                  borderBottomColor: errors.email
                    ? themeContext.errorColor
                    : themeContext.helperText,
                },
              }}
              fullWidth
              variant="standard"
              value={contactDetails.email}
              name="email"
              onChange={handleChange}
              label={errors.email ? "Enter valid E-Mail." : "Enter E-Mail *"}
              error={!!errors.email}
              // onBlur={handleValidity}
            />
            <TextField
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
                "& .MuiInput-root": {
                  caretColor: themeContext.helperText,
                },
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
              value={contactDetails.subject}
              variant="standard"
              name="subject"
              onChange={handleChange}
              label="Enter Subject *"
            />
            <TextField
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
                "& .MuiInput-root": {
                  caretColor: themeContext.helperText,
                },
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
              value={contactDetails.message}
              variant="standard"
              name="message"
              onChange={handleChange}
              label="Enter Message *"
            />
          </Grid>
          <Grid
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "auto",
            }}
          >
            <Button
              sx={{
                height: 40,
                width: 90,
                border: `0.2px solid ${themeContext.primary}`,
                borderRadius: "7px",
                textTransform: "none",
                color: themeContext.primary,
                fontWeight: "bold",
                ...(secretMailAlert && {
                  textTransform: "uppercase",
                }),
                "&:hover": {
                  boxShadow: `inset 0px 0px 25px 0px ${themeContext.primary}`,
                },
              }}
              onClick={onclose}
            >
              Cancel
            </Button>
            <Button
              sx={{
                height: 40,
                width: 90,
                textTransform: secretMailAlert ? "uppercase" : "none",
                borderRadius: "7px",
                fontWeight: "bold",
                border: !!(errors.name || errors.email)
                  ? `0.2px solid ${themeContext.errorColor}`
                  : `0.2px solid ${themeContext.primary}`,
                color: !!(errors.name || errors.email)
                  ? `${themeContext.errorColor} !important`
                  : `${themeContext.primary} !important`,
                "&:hover": {
                  boxShadow: `inset 0px 0px 25px 0px ${themeContext.primary}`,
                },
                "&:disabled": {
                  pointerEvents: "unset",
                  cursor: "not-allowed",
                  boxShadow: "none",
                },
              }}
              onClick={(e) => handleSubmit(e)}
              disabled={!!(errors.name || errors.email || loading)}
            >
              {loading ? (
                <CircularProgress
                  size={25}
                  color="inherit"
                  sx={{ color: themeContext.primary }}
                />
              ) : (
                "Send"
              )}
            </Button>
          </Grid>
          {attachmentToggle.isAttachmentEnabled && (
            <Grid>
              <input
                type="file"
                multiple
                accept="*.jpg"
                name="files"
                style={{ display: "none" }}
                id="files"
                onChange={handleFilesUpload}
                label={"Select files."}
              />
              <Grid sx={{ display: "flex", alignItems: "center" }}>
                <label htmlFor="files">
                  <Tooltip
                    arrow
                    placement="left"
                    title="Attach files."
                    slotProps={{
                      tooltip: {
                        sx: {
                          backgroundColor: "rgba(170, 137, 242, 0.7)",
                          fontSize: 12,
                          fontWeight: "bold",
                        },
                      },
                      arrow: {
                        sx: {
                          color: "rgba(170, 137, 242, 0.7)",
                        },
                      },
                    }}
                  >
                    <FileUploadRoundedIcon
                      sx={{
                        height: 30,
                        width: 30,
                        padding: 0.5,
                        border: "1px solid rgba(255, 255, 255)",
                        borderRadius: "7px",
                        transition: "all 0.2s ease-in-out",
                        color: themeContext.white,
                        cursor: "pointer",
                        "&:hover": {
                          boxShadow: `inset 0px 0px 28px ${themeContext.primaryColor}`,
                        },
                      }}
                    />
                  </Tooltip>
                </label>
                <Grid
                  // item
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    margin: 2,
                    gap: 2,
                  }}
                >
                  {filesUploaded.length > 0 ? (
                    filesUploaded.map((file, index) => (
                      <Tooltip
                        arrow
                        key={file.name}
                        title={file.name}
                        slotProps={{
                          tooltip: {
                            sx: {
                              backgroundColor: "rgba(170, 137, 242, 0.7)",
                              fontSize: 12,
                              fontWeight: "bold",
                            },
                          },
                          arrow: { sx: { color: "rgba(170, 137, 242, 0.7)" } },
                        }}
                      >
                        <Grid
                          sx={{
                            padding: 1,
                            color: themeContext.white,
                            display: "flex",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            "&:hover": {
                              outline: `1.5px solid ${themeContext.white}`,
                              borderRadius: "7px",
                            },
                          }}
                        >
                          {/* Increase index just to display (not affected to actual index*/}
                          {index + 1}
                          <CancelIcon
                            onClick={() => handleRemoveFile(file)}
                            sx={{
                              color: "#ff6865",
                              cursor: "pointer",
                              alignSelf: "flex-start",
                              marginTop: -1,
                              height: "1.1rem",
                              width: "1.1rem",
                              marginRight: -1,
                              transition: "all 0.2s ease-in-out",
                              "&:hover": {
                                color: themeContext.errorColor,
                              },
                            }}
                          />
                        </Grid>
                      </Tooltip>
                    ))
                  ) : (
                    <Typography
                      sx={{
                        fontSize: 17,
                        fontWeight: "bold",
                        color: themeContext.white,
                      }}
                    >
                      No files attached.
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default withAttachmentToggle(withNotistackSnackbar(MailDialog));
