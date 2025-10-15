import { Grid, Typography } from "@mui/material";

function About() {
  return (
    <Grid>
      <Typography
        style={{
          fontSize: 22,
          fontWeight: "bold",
        }}
      >
        About Screen
      </Typography>
      <Typography>Welcome to the About.</Typography>
    </Grid>
  );
}

export default About;
