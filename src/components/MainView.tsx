import { Container, Grid } from "@mui/material";
import FormView from "./FormView";
import StatusView from "./StatusView";

function MainView() {
  return (
    <Container
      className="main-container"
      sx={{
        width: "100vw",
        margin: "20px 0px",
      }}
    >
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        width="95vw"
        margin="20px 1vw"
      >
        <Grid item lg={6} display={{ lg: "block", xs: "none" }} width="100%">
          <Container
            sx={{
              margin: "40px 0px",
            }}
          >
            <StatusView />
          </Container>
        </Grid>
        <Grid item lg={6} width="70%">
          <main>
            <Container
              sx={{
                margin: "40px 0px",
              }}
            >
              <FormView />
            </Container>
          </main>
        </Grid>
      </Grid>
    </Container>
  );
}

export default MainView;
