import Job from "../model/Job";
import Repository from "./Repository";

const instance = new Repository();

const attendanceUrl = `https://kulms.korea.ac.kr/webapps/bbgs-AttendantManagementSystem-BB5d3914f35b4ad/onlineAttendance`;

function attendance_job(data: Job) {
  console.log(data);
}

export function scheduler(fireDate: Date) {
  console.log(`Job started at ${fireDate}`);

  const jobs = instance.getAll();
  for (const job of jobs) {
    attendance_job(job);
  }
}

export default instance;
