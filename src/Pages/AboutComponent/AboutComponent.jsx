import { Grid, Typography } from "@mui/material";
import "./aboutComponent.css";
import { getFormattedTimePeriod } from "../../Utils/formatTimePeriod.js";
import { useThemeContext } from "../../Hooks/ThemeContext.jsx";
import { useSearchParams } from "react-router-dom";
import { useMemo, memo } from "react";
import { ICONS } from "@src/assets/icons/icons.js";

const skills = [
  {
    title: "Frontend",
    list: [
      { content: "React JS", icon: ICONS.ReactIcon },
      { content: "React Native", icon: ICONS.ReactNativeIcon },
      { content: "Vite", icon: ICONS.ViteIcon },
      { content: "Material UI", icon: ICONS.MuiIcon },
      { content: "Expo", icon: ICONS.ExpoIcon },
      { content: "Bootstrap", icon: ICONS.BootstrapIcon },
      { content: "HTML", icon: ICONS.HtmlIcon },
      { content: "CSS", icon: ICONS.CssIcon },
    ],
  },
  {
    title: "Backend",
    list: [
      { content: "Node JS", icon: ICONS.NodeJsIcon },
      { content: "Express JS", icon: ICONS.ExpressJsIcon },
      { content: "JavaScript", icon: ICONS.JavascriptIcon },
      { content: "GraphQL", icon: ICONS.GraphqlIcon },
      { content: "REST APIs", icon: ICONS.RestApiIcon },
      { content: "JWT / JWE", icon: ICONS.JwtIcon },
      { content: "Kafka", icon: ICONS.KafkaIcon },
      { content: "C / C++", icon: ICONS.CppIcon },
      { content: "Python", icon: ICONS.PythonIcon },
      { content: "Microservices", icon: ICONS.MicroservicesIcon },
      { content: "Java", icon: ICONS.JavaIcon },
    ],
  },
  {
    title: "Database",
    list: [
      { content: "SQL", icon: ICONS.SqlIcon },
      { content: "No SQL", icon: ICONS.NoSqlIcon },
      { content: "MongoDB", icon: ICONS.MongoDbIcon },
      { content: "PostgresSQL", icon: ICONS.PgSqlIcon },
      { content: "Redis", icon: ICONS.RedisIcon },
      { content: "DragonflyDB", icon: ICONS.DragonflyIcon },
      { content: "Clickhouse", icon: ICONS.ClickhouseIcon },
      { content: "ORM / ODM", icon: ICONS.OrmIcon },
    ],
  },
  {
    title: "Other Techs",
    list: [
      { content: "Linux", icon: ICONS.LinuxIcon },
      { content: "Docker", icon: ICONS.DockerIcon },
      { content: "Kubernetes", icon: ICONS.KubernetesIcon },
      { content: "Git", icon: ICONS.GitIcon },
      { content: "GitHub", icon: ICONS.GitHubIcon },
      { content: "GitLab", icon: ICONS.GitLabIcon },
      { content: "Bitbucket", icon: ICONS.BitbucketIcon },
      { content: "Postman", icon: ICONS.PostmanIcon },
      { content: "ApolloServer", icon: ICONS.ApolloServerIcon },
      { content: "Jira", icon: ICONS.JiraIcon },
      { content: "Figma", icon: ICONS.FigmaIcon },
      { content: "Canva", icon: ICONS.CanvaIcon },
    ],
  },
];

function AboutComponent(props) {
  // Contexts
  const { themeContext } = useThemeContext();

  const [searchParams] = useSearchParams();
  const searchParamsJson = useMemo(
    () => Object.fromEntries(searchParams),
    [searchParams]
  );

  return (
    <Grid className="aboutContainer">
      <Grid>
        <Typography
          variant="p"
          sx={{ fontSize: "1.1rem", color: themeContext.bodyText }}
        >
          {`Results-driven Software Engineer with ${getFormattedTimePeriod(
            `1-jun-2023`,
            `present`,
            `YM`,
            true
          )}+ years of professional experience in full-stack development using React,
          Node.js, REST and GraphQL APIs, and SQL/NoSQL databases. Skilled in
          building responsive, component-based user interfaces (UI) using React,
          modern frameworks, and custom components. Experienced in developing
          backend services, Data Pipelines, and delivering end-to-end
          high-performance features. Collaborated with cross-teams to develop
          user-focused systems.`}
        </Typography>
      </Grid>
      <Grid className="skillsList">
        <Grid>
          <h3
            style={{
              marginTop: "25px",
              textDecoration: "underline",
              textUnderlineOffset: "5px",
              textDecorationThickness: "0.1px",
              fontSize: 22,
              transition: "all ease-in-out 0.5s",
              color: themeContext.titleText,
            }}
            // variant="h6"
          >
            Skills
          </h3>
        </Grid>
        <Grid className="skillContainer">
          {skills.map((skill, index) => (
            <Grid key={index} className="subSkill">
              <h3
                style={{
                  margin: "0 0 8px 0",
                  textDecoration: "underline",
                  textUnderlineOffset: "5px",
                  textDecorationThickness: "0.1px",
                  color: themeContext.subTitleText,
                }}
              >
                {skill.title}
              </h3>
              <Grid className="skillList">
                {skill.list.map((s) => (
                  <Grid
                    key={s.content}
                    className="skill"
                    sx={{
                      "&:hover": {
                        filter: `drop-shadow(0px 0px 5px ${themeContext.primary})`,
                        transform: `scale(1.2)`,
                      },
                    }}
                  >
                    <img
                      src={s.icon}
                      className="skillIcon"
                      alt={s.content}
                      style={{
                        width: "32",
                        height: "32",
                      }}
                      height="32"
                      width="32"
                    />
                    <p
                      className="skillContent"
                      style={{ color: themeContext.bodyText }}
                    >
                      {s.content}
                    </p>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
      {Object.entries(searchParamsJson).length > 0 && (
        <pre
          style={{
            backgroundColor: themeContext.surface,
            color: themeContext.bodyText,
            padding: "16px",
            borderRadius: "8px",
            fontSize: "14px",
            lineHeight: "1.5",
            border: `1px solid ${themeContext.primary}`,
            width: "fit-content",
            fontWeight: "bold",
          }}
        >
          {JSON.stringify(searchParamsJson, null, 2)}
        </pre>
      )}
    </Grid>
  );
}

export default memo(AboutComponent);
