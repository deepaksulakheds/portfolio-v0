import "./ExperienceComponent.css";
import { TimelineConnector, TimelineDot } from "@mui/lab";
import {
  AutoStories,
  BusinessCenter,
  Launch,
  SchoolRounded,
  WorkspacePremium,
} from "@mui/icons-material";
import { Chip, Grid, Typography } from "@mui/material";
import { withAttachmentToggle } from "../Header/MailDialog/attachmentContext";
import { getFormattedTimePeriod } from "../../Utils/formatTimePeriod";
import { useSecretContext } from "../../Hooks/SecretContext";
import { useEffect, useRef, memo } from "react";
import { useThemeContext } from "../../Hooks/ThemeContext";
import { useHotkeyAndPlatform } from "../../Utils/useHotkeyAndPlatform";

import ZeliotLogo from "@src/assets/Images/zeliot-1.png";

const EXPERIENCE_DATA = [
  {
    company: "Zeliot Connected Services Pvt. Ltd.",
    totalTimePeriod: getFormattedTimePeriod("1-jun-2023", "present"),
    logoPath: ZeliotLogo,
    companyUrl: "https://www.zeliot.in/",
    titlesList: [
      {
        designation: "Software Engineer - 2",
        duration: "May 2026 - Present", // present.diff(start)
        timePeriod: getFormattedTimePeriod("1-may-2026", "present"),
        location: `Bengaluru | KA | IN`,
        descriptions: [
          `Contributing to the development and enhancement of scalable backend services and high-performance web applications while supporting system reliability and performance improvements.`,
        ],
      },
      {
        designation: "Software Engineer - 1",
        duration: "Sep 2023 - Apr 2026", // present.diff(start)
        timePeriod: getFormattedTimePeriod("1-sep-2023", "1-may-2026"),
        location: `Bengaluru | KA | IN`,
        descriptions: [
          `Implemented an automated database migration and schema management process across multiple environments, eliminating manual effort and improving data consistency, efficiency, and reliability.`,
          `Led the POC and production migration from Redis to DragonflyDB, resulting in improved cache performance, higher Queries Per Second (QPS), and lower latency.`,
          `Developing responsive, high-performance web apps using React and Node.js. Skilled in component-based architecture, REST/GraphQL APIs integration, and MUI.`,
          `Led migration from MySQL to PostgreSQL, updating codebase and database schema, ensuring data integrity, managing data migration processes, and optimizing database performance.`,
          `Identified and resolved SCA and SAST security vulnerabilities through VAPT, implementing fixes and security best practices to ensure robust and secure backend services and APIs.`,
          `Developed Data-Pipelines for data processing and ingestion, implemented backend services, REST and GraphQL APIs with Node.js, and automated report delivery using cron jobs. contributing to core functionality.`,
          `Redesigned and optimized database schemas and queries for performance, scalability, and efficient data handling. Implemented Redis-based caching in backend systems to boost performance and reduce response times.`,
          `Contributed to multiple projects by implementing end-to-end features and creating a rich dashboard with React and Material-UI for data visualization and consistent UI.`,
          `Proven ability to translate designs and prototypes into fully functional, end-to-end modules using React.js, Node.js, REST, GraphQL, and various SQL & NoSQL databases.`,
        ],
      },
      {
        designation: "Full Stack Developer - Intern",
        duration: "June 2023 - Aug 2023", // end.diff(start)
        timePeriod: getFormattedTimePeriod("1-jun-2023", "1-sep-2023"),
        location: `Bengaluru | KA | IN`,
        descriptions: [
          `Developed <span style="font-weight: bold; text-decoration: underline; font-size: 15px">Telematic Analytics - Zeliot</span> as a mini-project during my Full-Stack Development Internship, focusing on creating a platform to collect, process, analyze, and visualize telematic device data, providing actionable insights and KPIs.`,
          `Implemented frontend components using React to create intuitive and responsive user interfaces.`,
          `Integrated third-party APIs in backend systems, making sure data flowed smoothly with external systems while maintaining the performance and reliability.`,
          `Participated in code reviews, debugging, and testing to ensure high-quality software deliverables.`,
        ],
      },
    ],
  },
];
const ICONS = [
  <SchoolRounded fontSize="medium" />,
  <WorkspacePremium fontSize="medium" />,
];

const EDUCATION_DATA = [
  {
    course: "Master of Computer Application (MCA)",
    institute: "KLE Technological University.",
    place: "Hubballi | KA | IN",
    timePeriod: "Feb 2022 - Sep 2023",
    siteUrl: `https://www.kletech.ac.in/`,
  },
  {
    course: "Bachelor of Computer Application (BCA)",
    institute: "JSS SMI UG & PG Studies.",
    place: "Dharwad | KA | IN",
    timePeriod: "Jun 2018 - Sep 2021",
    siteUrl: `http://jsssmiugpg.com/`,
  },
];
function ExperienceComponent({ attachmentToggle }) {
  // Contexts
  const secretContext = useSecretContext();
  const { themeContext } = useThemeContext();
  const shrtcutTimer = useRef(false);
  const { userPlatform, getHotkeyStringFromEvent } = useHotkeyAndPlatform();

  useEffect(() => {
    if (!userPlatform) return;

    const handleKeyDown = (e) => {
      try {
        if (shrtcutTimer.current) return;
        if (!secretContext.secretEnabled) return;

        const hotkey = getHotkeyStringFromEvent(e);

        switch (hotkey) {
          case import.meta.env.VITE_APP_HOTKEY1_COMB:
          case import.meta.env.VITE_APP_HOTKEY1:
            e.preventDefault();
            if (secretContext.secretEnabled) {
              attachmentToggle.toggleAttachment();
            }

            break;

          default:
            return;
        }

        if (attachmentToggle.isAttachmentEnabled) {
          shrtcutTimer.current = true;
          setTimeout(() => {
            shrtcutTimer.current = false;
          }, 3000);
        }
      } catch (err) {
        console.log("Error in shortcut", err);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [secretContext.secretEnabled, attachmentToggle]);

  return (
    <Grid className="experienceContainer">
      {/* Experience Section */}
      <Grid>
        <Grid
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <BusinessCenter
            onDoubleClick={() => {
              if (secretContext.secretEnabled) {
                attachmentToggle.toggleAttachment();
              }
            }}
            sx={{
              border: `2px solid ${
                attachmentToggle.isAttachmentEnabled
                  ? themeContext.primary
                  : themeContext.secondary
              }`,
              padding: "3px",
              borderRadius: "50%",
            }}
          />
          <Typography
            sx={{
              marginLeft: "10px",
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: themeContext.bodyText,
              textDecoration: "underline",
              textUnderlineOffset: "5px",
              textDecorationThickness: "0.1px",
            }}
          >
            Experience
          </Typography>
        </Grid>

        <Grid sx={{ marginLeft: "15px" }}>
          {EXPERIENCE_DATA.map((experience, index) => {
            return (
              <ExperienceItem
                key={index}
                experienceObj={experience}
                companyIndex={index}
                themeContext={themeContext}
              />
            );
          })}
        </Grid>
      </Grid>

      {/* Education Section */}
      <Grid sx={{ flexGrow: 1 }}>
        <Grid
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <AutoStories
            sx={{
              border: `2px solid ${themeContext.secondary}`,
              padding: "3px",
              borderRadius: "50%",
            }}
          />
          <Typography
            sx={{
              marginLeft: "10px",
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: themeContext.bodyText,
              textDecoration: "underline",
            }}
          >
            Education
          </Typography>
        </Grid>

        <Grid
          sx={{
            marginLeft: "15px",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          {EDUCATION_DATA.map((education, index) => {
            return (
              <EducationItem
                key={index}
                index={index}
                educationObj={education}
                themeContext={themeContext}
              />
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
}

function ExperienceItem({ experienceObj, themeContext }) {
  return (
    <Grid>
      {/* Company Title */}
      <Grid
        sx={{
          border: `1px solid ${themeContext.bodyText}`,
          borderRadius: 2,
          width: "fit-content",
          display: "flex",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <img
          src={experienceObj.logoPath}
          alt={experienceObj.company}
          title={experienceObj.company}
          height="28px"
          width="28px"
          style={{
            height: "28px",
            width: "28px",
            padding: "5px",
          }}
        />
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "8px",
          }}
        >
          <Typography
            component="p"
            sx={{
              fontSize: 16,
              paddingBottom: "0",
              width: "fit-content",
              fontWeight: "bold",
              color: themeContext.subTitleText,
            }}
          >
            {experienceObj.company}
          </Typography>
          <Typography
            component="p"
            sx={{
              fontSize: 12,
              color: themeContext.subTitleText,
              fontWeight: "bold",
            }}
          >
            - {experienceObj.totalTimePeriod}
          </Typography>
        </Grid>
        <Launch
          titleAccess="Open URL"
          fontSize="small"
          sx={{
            padding: "5px",
            borderRadius: "50%",
            cursor: "pointer",
            "&:hover": {
              boxShadow: `inset 0px 0px 10px 2px ${themeContext.primary}`,
              color: themeContext.primary,
            },
          }}
          onClick={() => window.open(experienceObj.companyUrl, "_blank")}
        />
      </Grid>

      {/* Experience List */}
      <Grid sx={{ marginTop: "5px", marginLeft: "5px" }}>
        {experienceObj.titlesList.map((title, titleIndex) => (
          <Grid
            key={titleIndex}
            title={title.designation}
            sx={{ display: "flex" }}
          >
            <Grid
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <TimelineDot
                sx={{
                  marginTop: "8px",
                  opacity: "0.6",
                  backgroundColor: themeContext.secondary,
                  color: themeContext.secondary,
                  alignSelf: "center",
                }}
              />
              {/* Add connector if not the last title */}
              {titleIndex !== experienceObj.titlesList.length - 1 && (
                <TimelineConnector />
              )}
            </Grid>
            <Grid
              key={title.designation}
              sx={{ marginBottom: "5px", marginLeft: "10px" }}
            >
              <Typography
                sx={{
                  fontSize: 15.5,
                  fontWeight: "bold",
                  color: themeContext.primary,
                }}
              >
                {title.designation}
              </Typography>

              <Typography
                sx={{
                  fontSize: 14,
                  color: themeContext.primary,
                  marginLeft: "2px",
                }}
              >
                {title.duration}, ( {title.timePeriod} )<br />
                {title.location}
              </Typography>
              <Grid
                sx={{
                  marginTop: "6px",
                  marginLeft: "5px",
                  marginBottom: "20px",
                }}
              >
                {title.descriptions.map((desc) => (
                  <Grid
                    key={desc}
                    sx={{
                      fontSize: 14,
                      display: "flex",
                      color: themeContext.bodyText,
                      maxWidth: "700px",
                    }}
                  >
                    ➛
                    {desc.includes("</") ? (
                      <Typography
                        key={desc}
                        sx={{
                          fontSize: 14,
                          marginLeft: 0.7,
                        }}
                        dangerouslySetInnerHTML={{ __html: desc }}
                      ></Typography>
                    ) : (
                      <Typography
                        key={desc}
                        sx={{
                          fontSize: 14,
                          marginLeft: 0.7,
                        }}
                      >
                        {desc}
                      </Typography>
                    )}
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

function EducationItem({ educationObj, index, themeContext }) {
  return (
    <Grid
      title={educationObj.course}
      sx={{
        margin: "10px",
        borderRadius: "10px",
        border: `0.5px solid ${themeContext.borderColor}`,
        backgroundColor: themeContext.surface,
        ":hover > .educationIcon": {
          animation: "pulse 1s infinite ease-in-out",
        },
      }}
    >
      <Grid
        className="educationIcon"
        sx={{
          height: "40px",
          width: "40px",
          alignSelf: "flex-start",
          border: `0.2px solid ${themeContext.borderColor}`,
          color: themeContext.themeIcons,
          borderRadius: "50%",
          // position: "absolute",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: themeContext.background,
        }}
      >
        {ICONS[index]}
      </Grid>

      <Grid sx={{ padding: "10px" }}>
        <Typography
          component="p"
          sx={{
            fontSize: 16,
            fontWeight: 600,
            color: themeContext.primary,
          }}
        >
          {educationObj.course}
        </Typography>
        <Typography sx={{ fontSize: 15, color: themeContext.primary }}>
          -&nbsp;{educationObj.institute}
        </Typography>
        <Typography
          sx={{
            fontSize: 13,
            marginTop: "5px",
            color: themeContext.bodyText,
          }}
        >
          &nbsp;&nbsp; {educationObj.place}
        </Typography>
        <Typography
          sx={{
            fontSize: 13,
            marginBottom: "5px",
            color: themeContext.bodyText,
          }}
        >
          &nbsp;&nbsp; {educationObj.timePeriod}
        </Typography>
        <Chip
          label={`Visit Site`}
          size="small"
          sx={{
            fontWeight: "500",
            border: `1px solid ${themeContext.primary}`,
            color: themeContext.primary,
            "&:hover": {
              boxShadow: `inset 0px 0px 10px 2px ${themeContext.primary}`,
            },
          }}
          onClick={() => {
            window.open(educationObj.siteUrl, "_blank");
          }}
        />
      </Grid>
    </Grid>
  );
}

export default memo(withAttachmentToggle(ExperienceComponent));
