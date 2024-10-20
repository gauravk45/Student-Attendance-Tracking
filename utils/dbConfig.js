import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon(
  "postgresql://accounts:o1BGKu9iStzj@ep-misty-grass-a8go7rmj-pooler.eastus2.azure.neon.tech/Attendance-tracker?sslmode=require"
);
const db = drizzle({ client: sql });
