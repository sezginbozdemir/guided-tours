import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BACKUP_DIR = path.resolve(__dirname, "../../backups");
const DB_URL = process.env.DATABASE_URL;

// Load env variables
dotenv.config({ path: path.resolve(__dirname, "../../apps/server/.env") });

//Check if DB URL exists in env
if (!DB_URL) {
  console.error("Database url not found in env variables");
  console.error("Make sure it is set in ./apps/server/.env");
  process.exit(1);
}

console.log("Cloning database data...");

const backupFiles = fs
  .readdirSync(BACKUP_DIR)
  .filter((f) => f.endsWith(".sql"))
  .map((f) => ({
    file: f,
    time: fs.statSync(path.join(BACKUP_DIR, f)).mtime.getTime(),
  }))
  .sort((a, b) => b.time - a.time);

if (backupFiles.length === 0) {
  console.error("No SQL backups found in:", BACKUP_DIR);
  process.exit(1);
}

const latestBackupFile = backupFiles[0]!.file;

console.log(`Using latest backup file: ${latestBackupFile}`);

const backupPath = path.join(BACKUP_DIR, latestBackupFile);

const dbUrl = new URL(DB_URL);
const host = dbUrl.hostname;
const port = dbUrl.port || "5432";
const database = dbUrl.pathname.slice(1);
const user = dbUrl.username;
const pass = dbUrl.password;
const env = { ...process.env, PGPASSWORD: pass };
const command = [
  "psql",
  `-h ${host}`,
  `-p ${port}`,
  `-U ${user}`,
  `-d ${database}`,
  `< ${backupPath}`,
].join(" ");

try {
  console.log("Executing restore command...");
  console.log(`Database: ${database} on ${host}:${port}`);

  execSync(command, {
    stdio: "inherit",
    env: env,
  });

  console.log("Database cloned succesfully.");
} catch (error: any) {
  console.error("Failed cloning database.", error.message);
  console.error("===========================================================");
  console.error("Troubleshooting:");
  console.error("1. Check that PostgreSQL client tools are installed");
  console.error("2. Verify DATABASE_URL in apps/server/.env");
}
