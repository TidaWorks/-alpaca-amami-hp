import { removeBackground } from "@imgly/background-removal-node";
import { readFile, writeFile, readdir } from "node:fs/promises";
import path from "node:path";

const INPUT_DIR = "./public/images/alpaca";
const OUTPUT_DIR = "./public/images/alpaca";

const files = (await readdir(INPUT_DIR)).filter((f) => f.endsWith(".jpg"));

for (const file of files) {
  const inPath = path.join(INPUT_DIR, file);
  const outPath = path.join(OUTPUT_DIR, file.replace(/\.jpg$/, ".png"));
  console.log(`Processing ${file}...`);
  try {
    const blob = await removeBackground(inPath);
    const buf = Buffer.from(await blob.arrayBuffer());
    await writeFile(outPath, buf);
    console.log(`  -> ${outPath}`);
  } catch (e) {
    console.error(`  ERROR: ${e.message}`);
  }
}
console.log("Done!");
