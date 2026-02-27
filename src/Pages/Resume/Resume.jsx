import { Grid } from "@mui/material";
import "./resume.css";
import { memo } from "react";
import resumePdf from "@src/assets/Files/Deepak_Sulakhe_CV.pdf";

function ResumeComponent(props) {
  return (
    <Grid container className="resumeContainer">
      <iframe
        title="Deepak-Resume"
        allowFullScreen={true}
        style={{
          height: "70vh",
          width: "100%",
          borderRadius: 15,
          border: 0,
        }}
        src={resumePdf}
      />
    </Grid>
  );
}

export default memo(ResumeComponent);
