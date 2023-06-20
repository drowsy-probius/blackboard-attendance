import { sendDiscordWebhook } from "../../utils";
import Job from "../model/Job";
import Repository from "./Repository";

const instance = new Repository();

const ATTENDANCE_API = `https://kulms.korea.ac.kr/webapps/bbgs-AttendantManagementSystem-BB5d3914f35b4ad/onlineAttendance`;

async function attendance_job(data: Job) {
  const sendWebhook = (() => {
    const webhook = data.webhook_url;
    if (webhook && webhook.length > 0) {
      return (msg: string) => sendDiscordWebhook(webhook, msg);
    }
    return (msg: string) => console.debug(Date.now().toLocaleString(), msg);
  })();

  const now = new Date();
  const nowYear = now.getFullYear();
  const nowMonth = `${now.getMonth() + 1}`.padStart(2, "0");
  const nowDate = `${now.getDate()}`.padStart(2, "0");
  const nowDateString = `${nowYear}-${nowMonth}-${nowDate}`;
  const nowWeekday = now.getDay();
  const nowHour = `${now.getHours()}`.padStart(2, "0");
  const nowMinute = `${now.getMinutes()}`.padStart(2, "0");
  const nowTime = `${nowHour}:${nowMinute}`;
  const nowTimeNumber = Number(nowHour) * 60 + Number(nowMinute);

  if (nowDateString > data.end_date) {
    return;
  }

  const weekdays = data.weekdays.split(",").map((weekday) => Number(weekday));
  if (
    weekdays.length === 0 ||
    weekdays.filter((weekday) => weekday < 0 || weekday > 6).length > 0 ||
    !weekdays.includes(nowWeekday)
  ) {
    return;
  }

  const [startHour, startMinute] = data.start_time.split(":");
  const [endHour, endMinute] = data.start_time.split(":");
  const startTimeNumber = Number(startHour) * 60 + Number(startMinute);
  const endTimeNumber = Number(endHour) * 60 + Number(endMinute);
  if (Math.abs(nowTimeNumber - startTimeNumber) >= 5) {
    return;
  }

  const lastRun = data.lastRun;
  if (lastRun) {
    const lastRunDate = new Date(lastRun);
    const courseTimeMS = (endTimeNumber - startTimeNumber + 5) * 60 * 1000;

    if (now.getMilliseconds() - lastRunDate.getMilliseconds() < courseTimeMS) {
      return;
    }
  }

  const payload = {
    course_id: data.course_id,
    course_pk: data.course_pk,
    firstname: data.firstname,
    course_name: data.course_name,
    campus_nm: data.campus_nm,
    class_st: `${nowDateString} ${nowTime}:00`,
    class_en: `${nowDateString} ${data.end_time}:00`,
    faculty: data.faculty,
    user_id: data.user_id,
    department: data.department,
  };

  console.debug(`request post to api with`, JSON.stringify(payload, null, 2));
  // await fetch(ATTENDANCE_API, {
  //   method: "POST",
  //   body: JSON.stringify(payload),
  // });

  instance.touch(data.id);
  await sendWebhook(
    `[성공] ${data.user_id}님의 ${data.course_id} 과목의 출석이 완료되었습니다.`
  );
}

export async function scheduler(fireDate: Date) {
  console.log(`Job started at ${fireDate}`);

  const jobs = instance.getAll();
  for (const job of jobs) {
    await attendance_job(job);
  }

  console.log(`Job done at ${fireDate}`);
}

export default instance;
