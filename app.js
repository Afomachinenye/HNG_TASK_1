const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const { PORT } = process.env;
const moment = require("moment-timezone");

app.use(express.json());

app.get("/", (req, res) => {
  try {
    const { slack_name, track } = req.query;
    const current_day = moment().tz("UTC").format("dddd");

    // Get the current UTC time with validation of +/-2 minutes
    const current_utc_time = moment().tz("UTC");
    const allowedTimeDifferenceInMinutes = 2;
    const utc_time = moment()
      .tz("UTC")
      .subtract(allowedTimeDifferenceInMinutes, "minutes")
      .format();

    const github_file_url =
      "https://github.com/username/repo/blob/main/file_name.ext";
    const github_repo_url = "https://github.com/username/repo";

    const status_code = 200;

    const response_data = {
      slack_name: slack_name,
      current_day: current_day,
      utc_time: utc_time,
      track: track,
      github_file_url: github_file_url,
      github_repo_url: github_repo_url,
      status_code: status_code,
    };
    res.status(200).json(response_data);
  } catch (error) {
    // If an error occurs, send a 500 Internal Server Error response
    res.status(500).json({ error: "Server failed" });
  }
});

app.listen(PORT || 4000, () => {
  console.log(`Listening to requests on ${PORT}`);
});
