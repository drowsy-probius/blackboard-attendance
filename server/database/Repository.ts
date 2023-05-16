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
        id INT PRIMARY KEY, 
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

        jobId TEXT
      );
    `);
  }

  getAll(): Job[] {
    return this.database.prepare(`SELECT * FROM jobs`).all() as Job[];
  }

  insert(data: Job) {
    console.log(data);
  }
}

export default Repository;
