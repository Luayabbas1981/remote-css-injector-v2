#!/usr/bin/env node

import { program } from "commander";
import { spawn } from "child_process";
import open from "open";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

program
  .command("start <url>")
  .description("Start the CSS Inspector")
  .action(async (url) => {
    const server = spawn("node", [path.join(rootDir, "server.js")], {
      stdio: "inherit",
    });

    // Wait a bit to ensure server is up
    setTimeout(() => {
      open(url);
      console.log("\nNow manually inject this code in the browser console:");
      console.log(
        `\n  var s = document.createElement("script");\n  s.src = "http://localhost:3011/injector.js";\n  document.head.appendChild(s);\n`
      );
    }, 1500);
  });

program.parse(process.argv);
