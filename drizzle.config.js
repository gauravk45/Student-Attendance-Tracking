import { defineConfig } from "drizzle-kit";
import { Pool } from 'pg';  // Import pg to manage SSL settings

export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  out: "./drizzle",
  connection: {
    host: "ep-misty-grass-a8go7rmj.eastus2.azure.neon.tech",
    database: "Attendance-tracker",
    user: "accounts",
    password: "o1BGKu9iStzj",
    ssl: {
      rejectUnauthorized: false // This bypasses SSL certificate validation, required for some cloud services
    }
  },
});
