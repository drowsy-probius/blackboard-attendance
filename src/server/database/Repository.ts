import BetterSqlite3, { Database } from "better-sqlite3";
import Job from "../model/Job";

const databaseName = process.env.DATABASE ?? "database.sqlite3";

class Repository {
  static instance: Repository;
  database!: Database;

  constructor() {
    if (Repository.instance) return Repository.instance;
    Repository.instance = this;

    this.database = new BetterSqlite3(databaseName);

    this.database.pragma("cache_size = 10240");

    this.database.exec(`
      CREATE TABLE IF NOT EXISTS jobs (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        weekdays TEXT NOT NULL,
        start_time TEXT NOT NULL,
        end_time TEXT NOT NULL,
        end_date TEXT NOT NULL,

        course_id TEXT NOT NULL,
        user_id TEXT NOT NULL, 

        webhook_url TEXT NOT NULL,

        course_pk TEXT,
        firstname TEXT,
        course_name TEXT,
        campus_nm TEXT, 
        faculty TEXT, 
        department TEXT,

        lastRun INT
      );
    `);
  }

  getAll(): Job[] {
    return this.database.prepare(`SELECT * FROM jobs`).all() as Job[];
  }

  getOne(id: number): Job {
    const select = this.database.prepare(`
    SELECT * FROM jobs WHERE id = ?
    `);

    const result = select.get(id);
    return result as Job;
  }

  touch(id: number) {
    const update = this.database.prepare(`
      UPDATE jobs SET lastRun = ? WHERE id = ?
    `);

    update.run(Date.now(), id);
  }

  insert(data: Job) {
    const insert = this.database.prepare(`
    INSERT INTO jobs (
      weekdays, start_time, end_time, end_date,
      course_id, user_id, webhook_url, course_pk, firstname, 
      course_name, campus_nm, faculty, department
    ) VALUES (
      @weekdays, @start_time, @end_time, @end_date, 
      @course_id, @user_id, @webhook_url, @course_pk, @firstname, 
      @course_name, @campus_nm, @faculty, @department
    )
    `);

    insert.run({
      ...data,
      course_pk: data.course_pk ?? null,
      firstname: data.firstname ?? null,
      course_name: data.course_name ?? null,
      campus_nm: data.campus_nm ?? null,
      faculty: data.faculty ?? null,
      department: data.department ?? null,
    });
  }

  delete(id: number) {
    const remove = this.database.prepare(`
    DELETE FROM jobs WHERE id=@id
    `);

    remove.run({ id: id });
  }
}

export default Repository;
