import next, { NextApiRequest, NextApiResponse } from "next";
import { NestedMiddlewareError } from "next/dist/build/utils";
import JobScheduler from "../../server/JobScheduler";
import Repository from "../../server/database";
import Job from "../../server/model/Job";
import { sendDiscordWebhook } from "@/utils";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  switch (req.method) {
    case "GET": {
      const { id } = req.query;
      const item = Repository.getOne(Number(id));

      const webhook = item.webhook_url;
      if (webhook && webhook.length > 0) {
        sendDiscordWebhook(
          webhook,
          `[테스트] 디스코드 웹훅 테스트 메시지입니다.`
        );
      }

      res.status(200).json({});
      return;
    }
  }
}
