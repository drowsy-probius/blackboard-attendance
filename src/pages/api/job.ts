import next, { NextApiRequest, NextApiResponse } from "next";
import { NestedMiddlewareError } from "next/dist/build/utils";
import JobScheduler from "../../../server/JobScheduler";
import Repository from '../../../server/database';

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
      const body = req.body;
      if (!body || Object.keys(body).length === 0) {
        res.status(400).send('Body is emtpy');
      }
      
      return; 
    }
  }
}
