import { Grid } from "@mui/material";
import "./resume.css";
import { memo } from "react";

function ResumeComponent(props) {
  return (
    <Grid container className="resumeContainer">
      <iframe
        allowFullScreen={true}
        style={{
          height: "70vh",
          width: "100%",
          borderRadius: 15,
          border: 0,
        }}
        src="./Files/Deepak-Sulakhe-Resume.pdf"
      />
    </Grid>
  );
}

export default memo(ResumeComponent);
