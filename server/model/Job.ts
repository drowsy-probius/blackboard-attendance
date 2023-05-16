interface Job {
  /** db idx */
  id: number;

  /** cronjob id */
  jobId: string;

  weekdays: string;

  start_time: string;

  end_time: string;

  end_date: string;

  course_id: string;

  user_id: string;

  webhook_url: string;

  course_pk?: string;

  firstname?: string;

  course_name?: string;

  campus_nm?: string;

  department?: string;

}

export default Job;
