import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

// __filename: absolute path to the current file
const __filename = fileURLToPath(import.meta.url);

// __dirname: absolute directory path of the current file
const __dirname = path.dirname(__filename);

// Load env variables

dotenv.config({ path: path.resolve(__dirname, "../../apps/server/.env") });

// BACKUP_DIR: absolute path to "../../backups" relative to this script's folder
const BACKUP_DIR = path.resolve(__dirname, "../../backups");
const DB_URL = process.env.DATABASE_URL;

//Check if DB URL exists in env

if (!DB_URL) {
  console.error("Database url not found in env variables");
  console.error("Make sure it is set in ./apps/server/.env");
  process.exit(1);
}

// Create backup directory if it doesnt exist

if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
  console.log("Created backups directory");
}

// Timestamp for the filename

const timestamp = new Date().toISOString().slice(0, 19).replace(/[T:]/g, "-");
const filename = `db_backup_${timestamp}.sql`;
const backupPath = path.join(BACKUP_DIR, filename);

console.log("Starting database backup...");
console.log(`Backup will be created in ${backupPath}`);

try {
  const dbUrl = new URL(DB_URL);
  const host = dbUrl.hostname;
  const port = dbUrl.port || "5432";
  const database = dbUrl.pathname.slice(1);
  const user = dbUrl.username;
  const pass = dbUrl.password;
  const env = { ...process.env, PGPASSWORD: pass };

  const command = [
    "pg_dump",
    `-h ${host}`,
    `-p ${port}`,
    `-U ${user}`,
    `-d ${database}`,
    `--file ${backupPath}`,
    "--verbose",
    "--clean",
    "--if-exists",
    "--inserts",
    "--column-inserts",
  ].join(" ");

  console.log("Executing pg_dump command...");
  console.log(`Database: ${database} on ${host}:${port}`);

  execSync(command, {
    stdio: "inherit",
    env: env,
  });

  console.log("Backup created succesfully");
  console.log(`Backup path: ${backupPath}`);

  const backupStats = fs.statSync(backupPath);
  const fileSize = (backupStats.size / (1024 * 1024)).toFixed(2);

  console.log(`Backup size: ${fileSize} MB`);
} catch (error: any) {
  console.error("Backup failed", error.message);
  console.error("===========================================================");
  console.error("Troubleshooting:");
  console.error("1. Check that PostgreSQL client tools are installed");
  console.error("2. Verify DATABASE_URL in apps/server/.env");
  console.error("3. Ensure pg_dump is in your PATH");
}
