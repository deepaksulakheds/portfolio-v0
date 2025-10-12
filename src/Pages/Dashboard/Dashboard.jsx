import { Grid, Typography } from "@mui/material";

function Dashboard() {
  return (
    <Grid>
      <Typography
        style={{
          fontSize: 22,
          fontWeight: "bold",
        }}
      >
        Dashboard Screen
      </Typography>
      <Typography>Welcome to the dashboard.</Typography>
    </Grid>
  );
}

export default Dashboard;
