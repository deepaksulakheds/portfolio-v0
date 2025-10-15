import { Grid, Typography } from "@mui/material";
import "./aboutComponent.css";
import { getFormattedTimePeriod } from "../../Utils/formatTimePeriod.js";
import { useThemeContext } from "../../Hooks/ThemeContext.jsx";

const skills = [
  {
    title: "Frontend",
    list: [
      { content: "React JS", icon: "./public/icons/react.svg" },
      { content: "React Native", icon: "./public/icons/react-native.svg" },
      { content: "Vite", icon: "./public/icons/vite.svg" },
      { content: "Material UI", icon: "./public/icons/mui.svg" },
      { content: "Expo", icon: "./public/icons/expo.svg" },
      { content: "Bootstrap", icon: "./public/icons/bootstrap.svg" },
      { content: "HTML", icon: "./public/icons/html.svg" },
      { content: "CSS", icon: "./public/icons/css.svg" },
    ],
  },
  {
    title: "Backend",
    list: [
      { content: "Node JS", icon: "./public/icons/nodejs.svg" },
      { content: "Express JS", icon: "./public/icons/expressjs.svg" },
      { content: "JavaScript", icon: "./public/icons/javascript.svg" },
      { content: "GraphQL", icon: "./public/icons/graphql.svg" },
      { content: "REST APIs", icon: "./public/icons/rest-api1.svg" },
      { content: "JWT / JWE", icon: "./public/icons/JWT.svg" },
      { content: "C / C++", icon: "./public/icons/cpp.svg" },
      { content: "Python", icon: "./public/icons/python.svg" },
      { content: "Microservices", icon: "./public/icons/microservices.svg" },
      { content: "Java", icon: "./public/icons/java.svg" },
    ],
  },
  {
    title: "Database",
    list: [
      { content: "SQL", icon: "./public/icons/sql.svg" },
      { content: "No SQL", icon: "./public/icons/no-sql.svg" },
      { content: "MongoDB", icon: "./public/icons/mongodb.svg" },
      { content: "PostgresSQL", icon: "./public/icons/pgsql.svg" },
      { content: "Redis", icon: "./public/icons/redis.svg" },
      { content: "Clickhouse", icon: "./public/icons/clickhouse.svg" },
      { content: "ORM / ODM", icon: "./public/icons/orm.svg" },
    ],
  },
  {
    title: "Other Techs",
    list: [
      { content: "Linux", icon: "./public/icons/linux.svg" },
      { content: "Docker", icon: "./public/icons/docker.svg" },
      { content: "Kubernetes", icon: "./public/icons/kubernetes.svg" },
      { content: "Git", icon: "./public/icons/git.svg" },
      { content: "GitHub", icon: "./public/icons/github.svg" },
      { content: "GitLab", icon: "./public/icons/gitlab.svg" },
      { content: "Bitbucket", icon: "./public/icons/bitbucket.svg" },
      { content: "Postman", icon: "./public/icons/postman.svg" },
      { content: "ApolloServer", icon: "./public/icons/apollo-server.svg" },
      { content: "Jira", icon: "./public/icons/jira.svg" },
      { content: "Figma", icon: "./public/icons/figma.svg" },
      { content: "Canva", icon: "./public/icons/canva.svg" },
    ],
  },
];

function AboutComponent(props) {
  // Contexts
  const { themeContext } = useThemeContext();

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
    </Grid>
  );
}

export default AboutComponent;
