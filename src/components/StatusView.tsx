import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import Job from "../server/model/Job";

const API_JOB = "/api/job";
const API_TEST = "/api/test";

const COLUMNS = [
  { displayName: "학번", keyName: "user_id" },
  { displayName: "ID", keyName: "id" },
  { displayName: "과목", keyName: "course_id" },
  { displayName: "시작 시간", keyName: "start_time" },
  { displayName: "요일", keyName: "weekdays" },
  { displayName: "종강일", keyName: "end_date" },
];

interface StatusProps {
  job: Job;
  forceRefresh: () => void;
}

function weekdaysToString(weekdays: string) {
  const weekdayMap: Record<0 | 1 | 2 | 3 | 4 | 5 | 6, string> = {
    0: "일",
    1: "월",
    2: "화",
    3: "수",
    4: "목",
    5: "금",
    6: "토",
  };

  const weekdaysList = weekdays
    .split(",")
    .map((weekday) => Number(weekday))
    .filter(
      (weekday) => !Number.isNaN(weekday) && weekday >= 0 && weekday <= 6
    );

  if (weekdaysList.length === 0) return "정보 없음";

  return weekdaysList
    .sort((a, b) => a - b)
    .map((weekday) => weekdayMap[weekday as keyof typeof weekdayMap])
    .join(",");
}

function Status({ job, forceRefresh }: StatusProps) {
  const handleDelete = () => {
    fetch(`${API_JOB}?id=${job.id}`, {
      method: "DELETE",
    })
      .then(() => {
        forceRefresh();
      })
      .catch((err) => alert(err));
  };

  const handleTest = () => {
    fetch(`${API_TEST}?id=${job.id}`)
      .then(() => {
        forceRefresh();
      })
      .catch((err) => alert(err));
  };

  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
      <TableCell>
        <ButtonGroup>
          <Button
            sx={{ boxShadow: "1px gray", border: "1px solid lightgray" }}
            onClick={handleTest}
          >
            테스트
          </Button>
          <Button
            sx={{ boxShadow: "1px gray", border: "1px solid lightgray" }}
            onClick={handleDelete}
          >
            삭제
          </Button>
        </ButtonGroup>
      </TableCell>
      {COLUMNS.map((column) => {
        const value = job[column.keyName as keyof Job];
        return (
          <TableCell key={`${job.id}.${column.keyName}`} align="center">
            {column.keyName === "weekdays"
              ? weekdaysToString(value as string)
              : value}
          </TableCell>
        );
      })}
    </TableRow>
  );
}

function StatusView() {
  const [stats, setStats] = useState<Job[]>([]);
  const [refreshValue, forceRefresh] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    fetch(API_JOB)
      .then((response) => response.json())
      .then((data) => setStats(data.result))
      .catch((error) => console.error(error));

    const itv = setInterval(() => {
      fetch(API_JOB)
        .then((response) => response.json())
        .then((data) => setStats(data.result))
        .catch((error) => console.error(error));
    }, 1000);

    return () => {
      clearInterval(itv);
    };
  }, [setStats, refreshValue]);

  if (stats.length === 0) return null;
  return (
    <Container
      sx={{
        border: "2px solid white",
        borderRadius: "10px",
        backgroundColor: "white",
        boxShadow: "6px 8px rgb(130, 143, 138)",
      }}
    >
      <Paper sx={{ width: "100%", overflow: "hidden", height: "100%" }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                {COLUMNS.map((column) => (
                  <TableCell key={column.keyName} align="center">
                    {column.displayName}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {stats.map((job) => (
                <Status key={job.id} job={job} forceRefresh={forceRefresh} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
}

export default StatusView;
