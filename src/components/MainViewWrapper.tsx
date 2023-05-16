import { Container, Grid } from "@mui/material";

interface MainViewProps {
  children: React.ReactNode;
}
function MainViewWrapper(props: MainViewProps) {
  const { children } = props;

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
            여기에 소개글 입력
          </Container>
        </Grid>
        <Grid item lg={6} width="70%">
          <main>
            <Container
              sx={{
                margin: "40px 0px",
              }}
            >
              {children}
            </Container>
          </main>
        </Grid>
      </Grid>
    </Container>
  );
}

export default MainViewWrapper;
