import next, { NextApiRequest, NextApiResponse } from "next";
import { NestedMiddlewareError } from "next/dist/build/utils";
import JobScheduler from "../../server/JobScheduler";
import Repository from "../../server/database";
import Job from "../../server/model/Job";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  switch (req.method) {
    case "GET": {
      const items = Repository.getAll();
      res.status(200).json({
        result: items,
      });
      return;
    }
    case "POST": {
      const body: Job = req.body;
      if (!body || Object.keys(body).length === 0) {
        return res.status(400).send("Body is emtpy");
      }

      if (
        body.weekdays.length === 0 ||
        body.start_time.length === 0 ||
        body.end_time.length === 0 ||
        body.end_date.length === 0 ||
        body.course_id.length === 0 ||
        body.user_id.length === 0 ||
        body.webhook_url.length === 0
      ) {
        return res.status(400).send("Some fields are empty.");
      }

      try {
        Repository.insert(body);
      } catch (err) {
        console.error(err);
        return res.status(400).send(err);
      }

      return res.status(200).json({});
    }

    case "DELETE": {
      const { id } = req.query;
      try {
        Repository.delete(Number(id));
      } catch (err) {
        console.error(err);
        return res.status(400).send(err);
      }
      return res.status(200).json({});
    }
  }
}
