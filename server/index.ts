import { createServer } from "http";
import { parse } from "url";
import next from "next";

import JobScheduler from "./JobScheduler";
import { scheduler } from './database';

const isDev = process.env.NODE_ENV !== "production";
const hostname = process.env.NEXT_HOST || "0.0.0.0";
const port = Number(process.env.NEXT_PORT || 3000);
const app = next({
  dev: isDev,
  hostname: hostname,
  port: port,
  customServer: true,
});
const handle = app.getRequestHandler();

app.prepare().then(() => {
  JobScheduler.add("12 */5 * * * *", scheduler);

  createServer(async (req, res) => {
    try {
      // // Be sure to pass `true` as the second argument to `url.parse`.
      // // This tells it to parse the query portion of the URL.
      // const parsedUrl = parse(req.url!, true);
      // const { pathname, query } = parsedUrl;

      // if (pathname === "/a") {
      //   await app.render(req, res, "/a", query);
      // } else if (pathname === "/b") {
      //   await app.render(req, res, "/b", query);
      // } else {
      //   await handle(req, res, parsedUrl);
      // }

      await handle(req, res);
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  })
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
