import "./ExperienceComponent.css";
import {
  Timeline,
  TimelineItem,
  timelineItemClasses,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
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

const experienceData = [
  {
    company: "Zeliot Connected Services Pvt. Ltd.",
    totalTimePeriod: getFormattedTimePeriod("1-jun-2023", "present"),
    logoPath: "./Images/zeliot-1.png",
    companyUrl: "https://www.zeliot.in/",
    titlesList: [
      {
        designation: "Software Engineer 1",
        duration: "Sep 2023 - Present", // present.diff(start)
        timePeriod: getFormattedTimePeriod("1-sep-2023", "present"),
        location: `Bengaluru | KA | IN`,
        descriptions: [
          `Led the POC and production migration from Redis to DragonflyDB, resulting in improved cache performance, higher Queries Per Second (QPS), and lower latency.`,
          `Developing responsive, high-performance web apps using React and Node.js. Skilled in component-based architecture, REST/GraphQL APIs integration, and MUI.`,
          `Led the migration of the codebase from MySQL to PostgreSQL, ensuring data integrity and optimizing performance.`,
          `Identified and resolved security vulnerabilities through VAPT, implementing fixes and security best practices to ensure robust and secure backend services and APIs.`,
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
const icons = [
  <SchoolRounded fontSize="medium" />,
  <WorkspacePremium fontSize="medium" />,
];

const educationData = [
  {
    course: "Master of Computer Application",
    institute: "KLE Technological University.",
    place: "Hubballi | KA | IN",
    timePeriod: "Feb 2022 - Sep 2023",
    siteUrl: `https://www.kletech.ac.in/`,
  },
  {
    course: "Bachelor of Computer Application",
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
      {/* Experience Timeline */}
      <Timeline
        sx={{
          padding: 0,
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
      >
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot
              sx={{
                margin: 0,
                color: themeContext.secondary,
                borderColor: attachmentToggle.isAttachmentEnabled
                  ? themeContext.primary
                  : themeContext.secondary,
              }}
              variant="outlined"
            >
              <BusinessCenter
                onDoubleClick={() => {
                  if (secretContext.secretEnabled) {
                    attachmentToggle.toggleAttachment();
                  }
                }}
                sx={{ color: themeContext.secondary }}
              />
            </TimelineDot>
          </TimelineSeparator>
          <TimelineContent>
            <Typography
              sx={{
                fontSize: 18,
                fontWeight: "bold",
                textDecoration: "underline",
                textUnderlineOffset: "5px",
                textDecorationThickness: "0.1px",
                color: themeContext.subTitleText,
              }}
            >
              Experience
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <Grid style={{ marginLeft: 0 }}>
          {experienceData.map((experience, companyIndex) => (
            <CustomExperienceTimeLineItem
              company={experience.company}
              key={companyIndex}
              titlesList={experience.titlesList}
              totalTimePeriod={experience.totalTimePeriod}
              companyIndex={companyIndex}
              logoPath={experience.logoPath}
              companyUrl={experience.companyUrl}
              themeContext={themeContext}
            />
          ))}
        </Grid>
      </Timeline>

      {/* Education Timeline */}
      <Timeline
        sx={{
          padding: 0,
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
      >
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot
              sx={{
                margin: 0,
                color: themeContext.secondary,
                borderColor: themeContext.secondary,
              }}
              variant="outlined"
            >
              <AutoStories
                sx={{ margin: 0, color: themeContext.themeIcons }}
                color={themeContext.themeIcons}
              />
            </TimelineDot>
            {/* <TimelineConnector /> */}
          </TimelineSeparator>
          <TimelineContent>
            <Typography
              sx={{
                fontSize: 18,
                fontWeight: "bold",
                textDecoration: "underline",
                textUnderlineOffset: "5px",
                textDecorationThickness: "0.1px",
                color: themeContext.subTitleText,
              }}
            >
              Education
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <Grid style={{ marginTop: "-25px", marginLeft: "0px" }}>
          {educationData.map((education, index) => (
            <CustomEducationTimeLineItem
              key={index}
              index={index}
              institute={education.institute}
              course={education.course}
              place={education.place}
              timePeriod={education.timePeriod}
              siteUrl={education.siteUrl}
              themeContext={themeContext}
            />
          ))}
        </Grid>
      </Timeline>
    </Grid>
  );
}

function CustomEducationTimeLineItem({
  course,
  place,
  institute,
  index,
  timePeriod,
  siteUrl,
  themeContext,
}) {
  // Contexts

  return (
    <TimelineItem>
      <TimelineContent
        sx={{
          marginBottom: index == educationData.length - 1 ? null : "10px",
        }}
      >
        <Grid
          title={course}
          sx={{
            maxWidth: 500,
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
              border: `0.2px solid ${themeContext.subTitleText}`,
              color: themeContext.themeIcons,
              borderRadius: "50%",
              position: "absolute",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              top: "20px",
              backgroundColor: themeContext.background,
            }}
          >
            {icons[index]}
          </Grid>

          <Grid
            sx={{
              marginTop: "10px",
              marginLeft: "10px",
              backgroundColor: themeContext.surface,
              borderRadius: "10px",
            }}
          >
            <Grid
              sx={{ marginLeft: "30px", marginTop: "20px", padding: "10px" }}
            >
              <Typography
                component="p"
                sx={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: themeContext.primary,
                }}
              >
                {course}
              </Typography>
              <Typography sx={{ fontSize: 15, color: themeContext.primary }}>
                -&nbsp;{institute}
              </Typography>
              <Typography
                sx={{
                  fontSize: 13,
                  marginTop: "5px",
                  color: themeContext.bodyText,
                }}
              >
                &nbsp;&nbsp; {place}
              </Typography>
              <Typography
                sx={{
                  fontSize: 13,
                  marginBottom: "5px",
                  color: themeContext.bodyText,
                }}
              >
                &nbsp;&nbsp; {timePeriod}
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
                  window.open(siteUrl, "_blank");
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </TimelineContent>
    </TimelineItem>
  );
}

function CustomExperienceTimeLineItem({
  company,
  titlesList,
  totalTimePeriod,
  logoPath,
  companyUrl,
  companyIndex,
  themeContext,
}) {
  // Contexts

  return (
    <TimelineItem title={company}>
      <TimelineContent
        sx={{
          maxWidth: `700px`,
          paddingTop: 0,
          marginTop: "-10px",
          marginBottom:
            companyIndex == educationData.length - 1 ? null : "20px",
        }}
      >
        <Grid
          sx={{
            border: `1px solid ${themeContext.bodyText}`,
            borderRadius: 2,
            width: "fit-content",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "5px",
            }}
          >
            <img
              src={logoPath}
              alt={company}
              title={company}
              height="28px"
              width="28px"
            />
          </Grid>
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
              {company}
            </Typography>
            <Typography
              component="p"
              sx={{
                fontSize: 12,
                color: themeContext.subTitleText,
                fontWeight: "bold",
              }}
            >
              - {totalTimePeriod}
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
            onClick={(e) => window.open(companyUrl, "_blank")}
          />
        </Grid>
        <Grid sx={{ marginTop: "5px", marginLeft: "5px" }}>
          <Timeline
            sx={{
              padding: 0,
              [`& .${timelineItemClasses.root}:before`]: {
                flex: 0,
                padding: 0,
              },
            }}
          >
            {titlesList.map((title, titleIndex) => (
              <TimelineItem key={title.designation}>
                <TimelineSeparator>
                  <TimelineDot
                    style={{
                      opacity: "0.6",
                      backgroundColor: themeContext.secondary,
                      color: themeContext.secondary,
                    }}
                  />
                  {titleIndex == titlesList.length - 1 ? null : (
                    <TimelineConnector
                      style={{
                        opacity: "0.6",
                        backgroundColor: themeContext.secondary,
                        color: themeContext.secondary,
                      }}
                    />
                  )}
                </TimelineSeparator>
                <TimelineContent>
                  <Grid key={title.designation} sx={{ marginBottom: "5px" }}>
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
                        marginLeft: "5px",
                      }}
                    >
                      {title.duration}, ( {title.timePeriod} )<br />
                      {title.location}
                    </Typography>
                    <Grid sx={{ marginTop: "6px" }}>
                      {title.descriptions.map((desc) => (
                        <Grid
                          key={desc}
                          sx={{
                            fontSize: 14,
                            display: "flex",
                            color: themeContext.bodyText,
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
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Grid>
        {/* {companyIndex == experienceData.length - 1 ? null : (
          <Divider
            orientation="horizontal"
            sx={{
              borderColor: "unset",
              marginTop: "15px",
              width: "80%",
              opacity: "0.5",
            }}
          />
        )} */}
      </TimelineContent>
    </TimelineItem>
  );
}

export default memo(withAttachmentToggle(ExperienceComponent));
