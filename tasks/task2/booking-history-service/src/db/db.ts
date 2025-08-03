import { CamelCasePlugin } from "kysely";
import { getKnexTimestampPrefix } from "kysely-ctl";
import { PostgresJSDialect } from "kysely-postgres-js";
import postgres from "postgres";
import { ENV } from "../env.ts";

export const config = {
	dialect: new PostgresJSDialect({
		postgres: postgres(ENV.POSTGRES_URL),
	}),
	plugins: [new CamelCasePlugin()],
	migrations: {
		migrationFolder: "src/db/migrations",
		getMigrationPrefix: getKnexTimestampPrefix,
	},
};
