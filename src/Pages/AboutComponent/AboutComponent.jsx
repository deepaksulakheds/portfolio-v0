import { Grid, Typography } from "@mui/material";
import "./aboutComponent.css";
import { getFormattedTimePeriod } from "../../Utils/formatTimePeriod.js";
import { useThemeContext } from "../../Hooks/ThemeContext.jsx";
import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";

const skills = [
  {
    title: "Frontend",
    list: [
      { content: "React JS", icon: "./icons/react.svg" },
      { content: "React Native", icon: "./icons/react-native.svg" },
      { content: "Vite", icon: "./icons/vite.svg" },
      { content: "Material UI", icon: "./icons/mui.svg" },
      { content: "Expo", icon: "./icons/expo.svg" },
      { content: "Bootstrap", icon: "./icons/bootstrap.svg" },
      { content: "HTML", icon: "./icons/html.svg" },
      { content: "CSS", icon: "./icons/css.svg" },
    ],
  },
  {
    title: "Backend",
    list: [
      { content: "Node JS", icon: "./icons/nodejs.svg" },
      { content: "Express JS", icon: "./icons/expressjs.svg" },
      { content: "JavaScript", icon: "./icons/javascript.svg" },
      { content: "GraphQL", icon: "./icons/graphql.svg" },
      { content: "REST APIs", icon: "./icons/rest-api1.svg" },
      { content: "JWT / JWE", icon: "./icons/JWT.svg" },
      { content: "C / C++", icon: "./icons/cpp.svg" },
      { content: "Python", icon: "./icons/python.svg" },
      { content: "Microservices", icon: "./icons/microservices.svg" },
      { content: "Java", icon: "./icons/java.svg" },
    ],
  },
  {
    title: "Database",
    list: [
      { content: "SQL", icon: "./icons/sql.svg" },
      { content: "No SQL", icon: "./icons/no-sql.svg" },
      { content: "MongoDB", icon: "./icons/mongodb.svg" },
      { content: "PostgresSQL", icon: "./icons/pgsql.svg" },
      { content: "Redis", icon: "./icons/redis.svg" },
      { content: "Clickhouse", icon: "./icons/clickhouse.svg" },
      { content: "ORM / ODM", icon: "./icons/orm.svg" },
    ],
  },
  {
    title: "Other Techs",
    list: [
      { content: "Linux", icon: "./icons/linux.svg" },
      { content: "Docker", icon: "./icons/docker.svg" },
      { content: "Kubernetes", icon: "./icons/kubernetes.svg" },
      { content: "Git", icon: "./icons/git.svg" },
      { content: "GitHub", icon: "./icons/github.svg" },
      { content: "GitLab", icon: "./icons/gitlab.svg" },
      { content: "Bitbucket", icon: "./icons/bitbucket.svg" },
      { content: "Postman", icon: "./icons/postman.svg" },
      { content: "ApolloServer", icon: "./icons/apollo-server.svg" },
      { content: "Jira", icon: "./icons/jira.svg" },
      { content: "Figma", icon: "./icons/figma.svg" },
      { content: "Canva", icon: "./icons/canva.svg" },
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
          )} of professional experience in full-stack development, including Node.js, 
          React, and various databases. Dedicated to creating high-quality software solutions and improving
          user experiences. Eager to apply my skills and knowledge in a dynamic
          environment.`}
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

export default AboutComponent;
