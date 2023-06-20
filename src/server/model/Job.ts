interface Job {
  /** db idx */
  id: number;

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

  faculty?: string;

  department?: string;

  lastRun?: number;
}

export default Job;
