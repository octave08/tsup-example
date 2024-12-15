import { logger } from "@/src/utils/logger";
import { wait } from "@/src/utils/wait";
import { isNumber } from "@fxts/core";
import chalk from "chalk";
import { Command } from "commander";
import ora from "ora";
import { z } from "zod";

const addOptionsSchema = z.object({
  numbers: z
    .array(
      z
        .string()
        .refine((val) => isNumber(Number(val)), {
          message: "Must be a numeric string",
        })
        .transform((val) => Number(val)),
    )
    .length(2),
});

export const add = new Command()
  .name("add")
  .description("a + b")
  .argument("[numbers...]", "numbers to add")
  .action(async (numbers: number[], opts) => {
    const spinner = ora("Adding numbers...").start();

    await wait(5000);
    const options = addOptionsSchema.parse({
      numbers,
      ...opts,
    });

    const [a, b] = options.numbers;
    const result = a + b;

    spinner.stop();
    logger.info(`result is: ${chalk.green(result)}`);
  });
