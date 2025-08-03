import { defineConfig } from "kysely-ctl";
import { config } from "./src/db/db.ts";

// Kysely ctl currentlly does not support configs at custom path https://github.com/kysely-org/kysely-ctl?tab=readme-ov-file#configuration
export default defineConfig(config);
