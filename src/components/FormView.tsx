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
import { useFormik } from "formik";

const API_JOB = "/api/job";

function FormView() {
  const formik = useFormik({
    initialValues: {
      weekdays: "",
      start_time: "",
      end_time: "",
      end_date: "",
      course_id: "",
      user_id: "",
      webhook_url: "",
      course_pk: "",
      firstname: "",
      course_name: "",
      campus_nm: "",
      faculty: "",
      department: "",
    },
    onSubmit: (values) => {
      fetch(API_JOB, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then(async (response) => {
          if (!response.ok) throw new Error(await response.text());
        })
        .catch((err) => alert(err));
    },
  });

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
              <Input
                placeholder="학번이 어떻게 되세요?"
                id="user_id"
                name="user_id"
                onChange={formik.handleChange}
                value={formik.values.user_id}
              />
              <Input
                placeholder="수업 고유 ID가 어떻게 되나요?"
                id="course_id"
                name="course_id"
                onChange={formik.handleChange}
                value={formik.values.course_id}
              />
              <Input
                placeholder="수업이 무슨 요일에 있나요?"
                id="weekdays"
                name="weekdays"
                onChange={formik.handleChange}
                value={formik.values.weekdays}
              />
              <InputLabel
                sx={{
                  display: "inline-flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                수업이 몇 시에 시작하나요?
                <Input
                  type="time"
                  id="start_time"
                  name="start_time"
                  onChange={formik.handleChange}
                  value={formik.values.start_time}
                />
              </InputLabel>

              <InputLabel
                sx={{
                  display: "inline-flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                수업이 몇 시에 끝나나요?
                <Input
                  type="time"
                  id="end_time"
                  name="end_time"
                  onChange={formik.handleChange}
                  value={formik.values.end_time}
                />
              </InputLabel>

              <InputLabel
                sx={{
                  display: "inline-flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                수업 종강일이 언제인가요?
                <Input
                  type="date"
                  id="end_date"
                  name="end_date"
                  onChange={formik.handleChange}
                  value={formik.values.end_date}
                />
              </InputLabel>
              <Input
                placeholder="알림 받을 discord webhook 주소가 뭔가요?"
                type="url"
                id="webhook_url"
                name="webhook_url"
                onChange={formik.handleChange}
                value={formik.values.webhook_url}
              />
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
              <Input
                placeholder="블랙보드에서 수업 고유값이 뭔가요?"
                id="course_pk"
                name="course_pk"
                onChange={formik.handleChange}
                value={formik.values.course_pk}
              />
              <Input
                placeholder="당신의 이름이 어떻게 되세요? (성이름)"
                id="firstname"
                name="firstname"
                onChange={formik.handleChange}
                value={formik.values.firstname}
              />
              <Input
                placeholder="블랙보드에 등록된 수업 이름이 뭔가요?"
                id="course_name"
                name="course_name"
                onChange={formik.handleChange}
                value={formik.values.course_name}
              />
              <Input
                placeholder="수업이 어느 캠퍼스 소속인가요?"
                id="campus_nm"
                name="campus_nm"
                onChange={formik.handleChange}
                value={formik.values.campus_nm}
              />
              <Input
                placeholder="수업이 학부/대학원 중 어느 소속인가요?"
                id="faculty"
                name="faculty"
                onChange={formik.handleChange}
                value={formik.values.faculty}
              />
              <Input
                placeholder="어느 학과의 수업인가요?"
                id="department"
                name="department"
                onChange={formik.handleChange}
                value={formik.values.department}
              />
            </FormGroup>
          </Container>
        </Container>
        <Container sx={{ padding: "10px", textAlign: "end" }}>
          <ButtonGroup>
            <Button onClick={() => formik.handleSubmit()}>추가</Button>
          </ButtonGroup>
        </Container>
      </Stack>
    </Container>
  );
}

export default FormView;
