import { Grid, Typography } from "@mui/material";

function Settings() {
  return (
    <Grid>
      <Typography
        style={{
          fontSize: 22,
          fontWeight: "bold",
        }}
      >
        Settings Screen
      </Typography>
      <Typography>Welcome to the Settings.</Typography>
    </Grid>
  );
}

export default Settings;
