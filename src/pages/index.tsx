import MainViewWrapper from "@/components/MainViewWrapper";
import {
  Button,
  ButtonGroup,
  Container,
  Divider,
  FormGroup,
  Input,
  InputLabel,
  Stack,
} from "@mui/material";

function MainView() {
  const onAddClickHandler = () => {
    console.log(111);
  };

  return (
    <Container
      sx={{
        border: "2px solid white",
        borderRadius: "10px",
        backgroundColor: "white",
        boxShadow: "6px 8px rgb(130, 143, 138)",
      }}
    >
      <Stack spacing={0}>
        <Container sx={{ padding: "5px" }}>블랙보드 자동출석 서비스</Container>
        <Divider />
        <Container sx={{ padding: "10px" }}>
          필수 항목
          <Container>
            <FormGroup
              sx={{
                gap: "5px",
              }}
            >
              <Input placeholder="학번이 어떻게 되세요?" />
              <Input placeholder="수업 고유 ID가 어떻게 되나요?" />
              <Input placeholder="수업이 무슨 요일에 있나요?" />
              <Input placeholder="수업이 몇 시에 시작하나요?" />
              <Input placeholder="수업이 몇 시에 끝나나요?" />
              <InputLabel
                sx={{
                  display: "inline-flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                수업 종강일이 언제인가요?
                <Input type="date" />
              </InputLabel>
              <Input placeholder="알림 받을 discord webhool 주소가 뭔가요?" />
            </FormGroup>
          </Container>
        </Container>
        <Container sx={{ padding: "10px" }}>
          선택 항목
          <Container>
            <FormGroup
              sx={{
                gap: "5px",
              }}
            >
              <Input placeholder="블랙보드에서 수업 고유값이 뭔가요?" />
              <Input placeholder="당신의 이름이 어떻게 되세요? (성이름)" />
              <Input placeholder="블랙보드에 등록된 수업 이름이 뭔가요?" />
              <Input placeholder="수업이 어느 캠퍼스 소속인가요?" />
              <Input placeholder="어느 학과의 수업인가요?" />
            </FormGroup>
          </Container>
        </Container>
        <Container sx={{ padding: "10px", textAlign: "end" }}>
          <ButtonGroup>
            <Button onClick={onAddClickHandler}>추가</Button>
          </ButtonGroup>
        </Container>
      </Stack>
    </Container>
  );
}

export default function Home() {
  return (
    <MainViewWrapper>
      <MainView />
    </MainViewWrapper>
  );
}
