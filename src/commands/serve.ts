import { program } from "@caporal/core";
import start from "@hydrogen-lms/core";

program.command("serve", "Starts the Hydrogen server.")
  .option("-c, --config <path>", "The path to Hydrogen's configuration file.", {
    default: process.env.HYDROGEN_CONFIG
  })
  .action(async ({ options, logger }) => {
    if (options.config === undefined) {
      logger.error("You didn't provide a Hydrogen configuration file!");
    } else {
      start(String(options.config));
    }
  });
