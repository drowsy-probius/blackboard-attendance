import * as schedule from "node-schedule";

class JobScheduler {
  static instance: JobScheduler;

  constructor() {
    if (JobScheduler.instance) return JobScheduler.instance;
    JobScheduler.instance = this;
  }

  add(
    rule: string,
    cb: (fireDate: Date) => void | Promise<any>,
    name = Date.now().toString()
  ) {
    const job = schedule.scheduleJob(name, rule, cb);
    return job;
  }

  cancel(job: schedule.Job) {
    const res = schedule.cancelJob(job);
    return res;
  }

  list() {
    return schedule.scheduledJobs;
  }
}

const instance = new JobScheduler();

export default instance;
