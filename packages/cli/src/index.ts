import { add } from "@/src/commands/add";
import { sub } from "@/src/commands/sub";
import { getPackageInfo } from "@/src/utils/get-package-info";
import { Command } from "commander";

async function main() {
  const packageInfo = getPackageInfo();

  const program = new Command()
    .name("tsup-example")
    .description("tsup example CLI")
    .version(
      packageInfo.version || "1.0.0",
      "-v, --version",
      "display the version number",
    );

  program.addCommand(add).addCommand(sub);
  program.parse();
}

main();
