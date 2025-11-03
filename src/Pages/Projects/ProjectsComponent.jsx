import { GitHub } from "@mui/icons-material";
import { Chip, Grid, IconButton, Typography } from "@mui/material";
import { useState, memo } from "react";
import "./projectComponent.css";
import { ViewSnapshotsDialog } from "./ViewSnapshots.jsx";
import { useThemeContext } from "../../Hooks/ThemeContext.jsx";

const projData = [
  {
    title: "Due Finder (Mobile App)",
    techUsed: [
      "React Native",
      "React Native Paper",
      "Expo",
      "JavaScript",
      "Expo Notifications",
    ],
    description:
      "React Native and Expo-based Android app designed to help Policy Agents to track and manage upcoming due dates for multiple insurance policies.",
    image: "./Images/DueFinder.png",
    path: "#",
    snapList: [
      "./Images/snapshots/DueFinder/DueFinder-1.jpg",
      "./Images/snapshots/DueFinder/DueFinder-2.jpg",
      "./Images/snapshots/DueFinder/DueFinder-3.jpg",
      "./Images/snapshots/DueFinder/DueFinder-4.jpg",
      "./Images/snapshots/DueFinder/DueFinder-5.jpg",
      "./Images/snapshots/DueFinder/DueFinder-6.jpg",
      "./Images/snapshots/DueFinder/DueFinder-7.jpg",
      "./Images/snapshots/DueFinder/DueFinder-8.jpg",
      "./Images/snapshots/DueFinder/DueFinder-9.jpg",
      "./Images/snapshots/DueFinder/DueFinder-10.jpg",
    ],
  },
  {
    title: "Telematic Analytics - Zeliot",
    techUsed: [
      "JavaScript",
      "Node JS",
      "React JS",
      `MUI`,
      "GraphQL",
      "Apollo Server",
    ],
    description: `An interactive dashboard for vehicle data insights. Developed using React and Apollo Server.`,
    image: "./Images/fleet.jpg",
    path: "https://github.com/deepaksulakheds/Zeliot_Telematic_Project",
    snapList: ["./Images/fleet.jpg"],
  },
  {
    title: "Dashboard - Zeliot Analytics",
    techUsed: [
      "JavaScript",
      "Node JS",
      "React JS",
      `MUI`,
      "GraphQL",
      "Apollo Server",
    ],
    description: `A telematics data visualization system for fleet analytics & KPIs of Zeliot. Built with React and GraphQL.`,
    image: "./Images/Dashboard-Zeliot_Analytics.png",
    path: "https://github.com/deepaksulakheds/Zeliot-Analytics-Dashboard",
    snapList: ["./Images/Dashboard-Zeliot_Analytics.png"],
  },
  {
    title: "Fruits Classification using CNN",
    techUsed: [
      `Python`,
      `Deep Learning`,
      `CNN`,
      `Kaggle`,
      `Numpy`,
      `Matplotlib`,
      `Seaborn`,
    ],
    description: `Identifies different types of fruits using a Convolutional Neural Network(CNN). Implemented using Python and visualized with Matplotlib.`,
    image: "./Images/fruits.jpg",
    path: "https://github.com/deepaksulakheds/fruits-classification-cnn",
    snapList: [
      "./Images/snapshots/FruitsCNN/FruitsCNN-1.png",
      "./Images/snapshots/FruitsCNN/FruitsCNN-2.png",
      "./Images/snapshots/FruitsCNN/FruitsCNN-3.png",
      "./Images/snapshots/FruitsCNN/FruitsCNN-4.png",
    ],
  },
  {
    title: "Face Recognition using LBPH",
    techUsed: [
      "Python",
      " OpenCV",
      " Nympy",
      " Pandas",
      " Haar-Cascade Classifier",
      " LBPH Algorithm",
    ],
    description: `A face recognition system using the LBPH algorithm. Utilizes OpenCV and Haar cascades for detection.`,
    image: "./Images/face-rec.jpg",
    path: "https://github.com/deepaksulakheds/Face-Recognition-using-LBPH",
    snapList: ["./Images/face-rec.jpg"],
  },
  {
    title: "Rice Mill Management System",
    techUsed: ["HTML", " CSS", " PHP", " Bootstrap 5", " WAMP"],
    description: `A web-based management system for rice mills. Handles customer data, inventory, sales efficiently.`,
    image: "./Images/riceMill.jpeg",
    path: "#",
    snapList: ["./Images/riceMill.jpeg"],
  },
];

function ProjectsComponent(props) {
  // Contexts
  const { themeContext } = useThemeContext();

  const [viewSnapshotVisible, setViewSnapshotVisible] = useState(false);

  return (
    <Grid className="projectContainer">
      {projData.map((project) => (
        <Grid key={project.title} width={300}>
          <Grid
            onClick={() => {
              setViewSnapshotVisible(project);
            }}
            sx={{
              // marginBottom: 1,
              borderRadius: 3,
              height: 150,
              width: 300,
              overflow: "hidden",
              transition: "all 0.3s ease-in-out",
              border: `1px solid transparent`,
              ":hover": {
                cursor: "pointer",
                borderColor: themeContext.primary,
                filter: `drop-shadow(0px 0px 9px ${themeContext.primary})`,
                transform: "scale(1.08)",
                // ":hover > img": { transform: "scale(1.1)" },
              },
            }}
          >
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              style={{
                borderRadius: 3,
                height: "100%",
                width: "100%",
                objectFit: "cover",
                transition: "all 0.3s ease-in-out",
              }}
            />
          </Grid>
          <Grid sx={{ padding: "0.2rem" }}>
            <Grid
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "0.3rem 0",
              }}
            >
              <Typography
                sx={{ fontWeight: "500", color: themeContext.primary }}
              >
                {project.title}
              </Typography>
              <IconButton
                target="blank"
                href={project.path}
                title="View on GitHub"
                sx={{
                  padding: "4px",
                  color: themeContext.secondary,
                  transition: "all ease-in-out 0.15s",
                  "&:hover": {
                    color: themeContext.primary,
                    // filter: `drop-shadow(0px 0px 3px ${themeContext.primary})`,
                    boxShadow: `inset 0px 0px 10px 2px ${themeContext.primary}`,
                  },
                }}
              >
                <GitHub />
              </IconButton>
            </Grid>
            <Typography
              sx={{
                fontSize: 14,
                marginBottom: "0.6rem",
                marginLeft: ".5rem",
                fontWeight: "400",
                color: themeContext.bodyText,
              }}
            >
              {project.description}
            </Typography>
            <Grid>
              {project.techUsed.map((tech, index) => (
                <Chip
                  key={index}
                  label={tech}
                  size="small"
                  style={{
                    userSelect: "none",
                    color: themeContext.bodyText,
                    cursor: "text",
                    margin: "2px",
                    fontWeight: "400",
                    border: `1px solid ${themeContext.lightPrimary}`,
                  }}
                />
              ))}
            </Grid>
          </Grid>{" "}
        </Grid>
      ))}
      {viewSnapshotVisible && (
        <ViewSnapshotsDialog
          snapsList={viewSnapshotVisible.snapList}
          onClose={() => setViewSnapshotVisible(false)}
          viewSnapshotVisible={viewSnapshotVisible}
        />
      )}
    </Grid>
  );
}

export default memo(ProjectsComponent);
