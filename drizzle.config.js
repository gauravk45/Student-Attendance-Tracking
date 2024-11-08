require("dotenv").config();

export const schema = "./utils/schema.js";
export const out = "./migrations";

export const dbCredentials = {
  url: `postgresql://Attendance-tracker_owner:x6dYsDC3ztQJ@ep-nameless-voice-a5rw992i.us-east-2.aws.neon.tech/Attendance-tracker?sslmode=require`, // Use environment variable for DB connection
};

export const dialect = "postgresql";
