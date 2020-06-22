import { program } from "@caporal/core";
import Postgrator from "postgrator";
import path from "path";

program.command("migrate", "Runs SQL migrations for Hydrogen.")
  .argument("<dsn>", "The PostgreSQL connection string to use.")
  .action(async ({ args, logger }) => {
    const pg = new Postgrator({
      migrationDirectory: path.join(__dirname, "../../node_modules/@hydrogen-lms/core/migrations"),
      driver: "pg",
      connectionString: String(args.dsn)
    });

    pg.on("migration-started", (migration) => {
      logger.info(`Started ${migration.filename} migration...`);
    });
    pg.on("migration-finished", (migration) => {
      logger.info(`Finished ${migration.filename} migration.`);
    });

    try {
      const migrations = await pg.migrate();
      logger.info(`Completed ${migrations.length} migrations!`);
    }
    catch (error) {
      logger.error(error);
    }
  });
