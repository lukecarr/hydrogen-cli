import { program } from "@caporal/core";
import "./commands";

program.version(String(process.env.npm_package_version)).run();
