import { Grid, Typography } from "@mui/material";
import "./aboutComponent.css";
import { getFormattedTimePeriod } from "../../Utils/formatTimePeriod.js";
import { useThemeContext } from "../../Hooks/ThemeContext.jsx";

const skills = [
  {
    title: "Frontend",
    list: [
      { content: "React JS", icon: "./src/assets/icons/react.svg" },
      { content: "React Native", icon: "./src/assets/icons/react-native.svg" },
      { content: "Vite", icon: "./src/assets/icons/vite.svg" },
      { content: "Material UI", icon: "./src/assets/icons/mui.svg" },
      { content: "Expo", icon: "./src/assets/icons/expo.svg" },
      { content: "Bootstrap", icon: "./src/assets/icons/bootstrap.svg" },
      { content: "HTML", icon: "./src/assets/icons/html.svg" },
      { content: "CSS", icon: "./src/assets/icons/css.svg" },
    ],
  },
  {
    title: "Backend",
    list: [
      { content: "Node JS", icon: "./src/assets/icons/nodejs.svg" },
      { content: "Express JS", icon: "./src/assets/icons/expressjs.svg" },
      { content: "JavaScript", icon: "./src/assets/icons/javascript.svg" },
      { content: "GraphQL", icon: "./src/assets/icons/graphql.svg" },
      { content: "REST APIs", icon: "./src/assets/icons/rest-api1.svg" },
      { content: "JWT / JWE", icon: "./src/assets/icons/JWT.svg" },
      { content: "C / C++", icon: "./src/assets/icons/cpp.svg" },
      { content: "Python", icon: "./src/assets/icons/python.svg" },
      { content: "Microservices", icon: "./src/assets/icons/microservices.svg" },
      { content: "Java", icon: "./src/assets/icons/java.svg" },
    ],
  },
  {
    title: "Database",
    list: [
      { content: "SQL", icon: "./src/assets/icons/sql.svg" },
      { content: "No SQL", icon: "./src/assets/icons/no-sql.svg" },
      { content: "MongoDB", icon: "./src/assets/icons/mongodb.svg" },
      { content: "PostgresSQL", icon: "./src/assets/icons/pgsql.svg" },
      { content: "Redis", icon: "./src/assets/icons/redis.svg" },
      { content: "Clickhouse", icon: "./src/assets/icons/clickhouse.svg" },
      { content: "ORM / ODM", icon: "./src/assets/icons/orm.svg" },
    ],
  },
  {
    title: "Other Techs",
    list: [
      { content: "Linux", icon: "./src/assets/icons/linux.svg" },
      { content: "Docker", icon: "./src/assets/icons/docker.svg" },
      { content: "Kubernetes", icon: "./src/assets/icons/kubernetes.svg" },
      { content: "Git", icon: "./src/assets/icons/git.svg" },
      { content: "GitHub", icon: "./src/assets/icons/github.svg" },
      { content: "GitLab", icon: "./src/assets/icons/gitlab.svg" },
      { content: "Bitbucket", icon: "./src/assets/icons/bitbucket.svg" },
      { content: "Postman", icon: "./src/assets/icons/postman.svg" },
      { content: "ApolloServer", icon: "./src/assets/icons/apollo-server.svg" },
      { content: "Jira", icon: "./src/assets/icons/jira.svg" },
      { content: "Figma", icon: "./src/assets/icons/figma.svg" },
      { content: "Canva", icon: "./src/assets/icons/canva.svg" },
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
